const e = require("express");
var express = require("express");
var router = express.Router();
const User = require("../models/user");

//get all the users sorted by there timestamp(newest to oldest)
router.get("/", async (req, res) => {
  //sortBy user createdAt or by distance with specified latlng
  const sortBy = req.query.sortBy;
  //pagination assuming the server decides the page size.
  const pageNumber = parseInt(req.query.pageNumber);
  const PAGE_SIZE = 5; // Similar to 'limit'
  const skip = (pageNumber - 1) * PAGE_SIZE;
  let users = [];
  if (sortBy.toLowerCase() === "created") {
    users = await User.find({}).sort("-createdAt").skip(skip).limit(PAGE_SIZE);
  } else {
    //get the lat and lng from query string
    //convert from string to float
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    users = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng, lat],
          },
          distanceField: "distance",
          spherical: true,
          distanceMultiplier: 0.001, // convert from meters to kilometers
        },
      },
    ])
      .skip(skip)
      .limit(PAGE_SIZE);
  }

  res.json({ success: true, users: users });
});

//create user
router.post("/", async (req, res) => {
  //check if mobile number is associated with another user
  const mobile_exists = await User.findOne({ mobile: req.body.mobile });
  if (mobile_exists) {
    res.json({ success: false, message: "Mobile number already exists" });
    return;
  }

  //check if email id is associated with another user
  const email_exists = await User.findOne({ email: req.body.email });
  if (email_exists) {
    res.json({ success: false, message: "Email ID already exists" });
    return;
  }
  //create new user
  const user = new User({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    address: {
      street: req.body.street,
      locality: req.body.locality,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      coordinatesType: req.body.coordinatesType,
      coordinates: req.body.coordinates.split(",").map(Number),
    },
  });
  try {
    //save the user
    let response = await user.save();
    res.json({ success: true, user: response });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to add user,Error occured try again!",
    });
  }
});
//update user
router.put("/update", async (req, res) => {
  //check if user exists using there mobile number
  const user_exists = await User.findOne({ mobile: req.body.mobile });
  if (user_exists == null) {
    res.json({ success: false, message: "User Does not exist" });
    return;
  }
  //build the updated user object
  const updatedUser = {
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    address: {
      street: req.body.street,
      locality: req.body.locality,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      coordinatesType: req.body.coordinatesType,
      coordinates: req.body.coordinates.split(",").map(Number),
    },
  };
  try {
    const response = await User.findOneAndUpdate(
      { mobile: req.body.mobile },
      updatedUser,
      { new: true }
    );
    res.json({ success: true, user: response });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to update user,Error occured try again!",
    });
  }
});
//delete the user form the db
router.delete("/delete", async (req, res) => {
  try {
    //find the user in db using mobile number
    await User.findOneAndDelete({ mobile: req.body.mobile });
    res.json({ success: true, message: "User Deleted Successfully!" });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to delete user, Error occured try again!",
    });
  }
});

module.exports = router;
