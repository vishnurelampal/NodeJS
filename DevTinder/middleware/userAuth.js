const express = require("express");
const app = express();
const User = require("../modals/UserModal");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const secretKey = "poda@1999";
app.use(express.json());
app.use(cookieParser());

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Please Login and try");
    }
    const decodedItems = jwt.verify(token, secretKey);
    const { _id } = decodedItems;
    const userLogged = await User.findById({ _id });
    if (!userLogged) {
      throw new Error("No user found");
    }
    // const tokenUser = userLogged._id.toString();
    // const userWithEmail = await User.findOne({ emailId: req.body.emailId });
    // if (!userWithEmail) {
    //   throw new Error("Wrong Credentials");
    // }
    // const userWithEmailId = userWithEmail._id.toString();
    // console.log(userWithEmail._id, userLogged._id);
    // if (tokenUser !== userWithEmailId) {
    //   throw new Error("Wrong Credentials");
    // }
    req.user = userLogged;
    console.log("userAuthenticated");
    next();
  } catch (err) {
    res.status(500).send("Error " + err.message);
  }
};
module.exports = userAuth;
