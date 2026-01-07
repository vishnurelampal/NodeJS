const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  dateOfBirth: String,
  password: {
    type: String,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password is not strong enough");
      }
    },
  },
  emailId: {
    type: String,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: `{VALUE} is not supported gender`,
    },
    // validate(value) {
    //   if (!["male", "female", "other"].includes(value)) {
    //     console.log(value);
    //     throw new Error("Gender must be male, female or other");
    //   }
    // },
  },
  skills: {
    type: [String],
    default: [],
  },
  photoUrl: { type: String },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
