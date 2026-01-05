const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "poda@1999";
const User = require("../../modals/UserModal");
const signUpValidator = require("../../Utils/signUpValidator");
authRouter.post("/signup", async (req, res) => {
  try {
    console.log("called");
    signUpValidator(req);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      dateOfBirth: req.body.dateOfBirth,
      emailId: req.body.emailId,
      gender: req.body.gender,
      password: hashedPassword,
    });
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  const userEmail = req.body.emailId;
  const password = req.body.password;

  try {
    const userFind = await User.findOne({ emailId: userEmail });
    if (!userFind) throw new Error("User not found");
    const isPaswrdMatch = await bcrypt.compare(password, userFind.password);
    if (!isPaswrdMatch) {
      throw new Error("Wrong Credentials");
    } else {
      const token = jwt.sign({ _id: userFind._id }, secretKey);
      res.cookie("token", token);
      res.send(userFind);
    }
  } catch (err) {
    res.status(400).send("Login Failed " + err.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("Succesfull Logged Out");
});
module.exports = authRouter;
