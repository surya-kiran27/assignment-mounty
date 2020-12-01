const e = require("express");
var express = require("express");
var router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  //check if mobile number is associated with another user
  const mobile_exists = await User.findOne({ mobile: req.body.mobile });
  if (mobile_exists) {
    res.json({ success: false, message: "Mobile already exists" });
    return;
  }

  //check if email id is associated with another user
  const email_exists = await User.findOne({ email: req.body.email });
  if (email_exists) {
    res.json({ success: false, message: "Email already exists" });
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
    res.json({ success: false, message: "Error occured try again!" });
  }
});

module.exports = router;
