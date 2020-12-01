const mongoose = require("mongoose");
var userSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    email: String,
    address: {
      street: String,
      locality: String,
      city: String,
      state: String,
      pincode: String,
      coordinatesType: String,
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
