const express = require("express");
const profileRouter = express.Router();
const User = require("../../modals/UserModal");
const userAuth = require("../../middleware/userAuth");
profileRouter.get("/fetchuser", userAuth, async (req, res) => {
  try {
    // const email = req.emailId;
    // const loggedInUser = await User.findOne({ emailId: req.body.emailId });
    console.log("Called");
    const loggedInUser = req.user;
    res.send(loggedInUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
profileRouter.patch("/profile/updateDetails", userAuth, async (req, res) => {
  try {
    const notAllowed = ["password", "age"];
    const flagObj = Object.keys(req.body).every(
      (item) => !notAllowed.includes(item)
    );
    if (!flagObj) {
      throw new Error("Edit not allowed");
    }
    const loggedUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));
    await loggedUser.save();
    res.json({
      message: `${loggedUser.firstName} your details are updated`,
      data: loggedUser,
    });
  } catch (err) {
    res.status(500).send("Err " + err.message);
  }
});
profileRouter.delete("/deletUserById", async (req, res) => {
  const userId = req.body.userId;
  try {
    const userIdRes = await User.findByIdAndDelete(userId);
    res.send(userIdRes);
  } catch (err) {
    res.status(400).send("Error in deleting the data");
  }
});
profileRouter.delete("/deletByName/:firstName", async (req, res) => {
  const Fname = req.params.firstName;
  try {
    const nameDeleted = await User.deleteMany({ firstName: Fname });
    res.send(nameDeleted);
  } catch (err) {
    res.status(400).send("Error in deleting the data" + err.message);
  }
});

profileRouter.patch("/update/:userId", async (req, res) => {
  const userDetails = req.body;
  try {
    const userId = req.params.userId;
    const AllowedUpdates = ["firstName", "lastName"];
    const allowedFlag = Object.keys(req.body).every((key) =>
      AllowedUpdates.includes(key)
    );
    if (!allowedFlag) {
      throw new Error("Invalid updates!");
    }
    const updated = await User.updateOne(
      { _id: userId },
      { firstName: userDetails.firstName },
      { runValidators: true }
    );
    res.send(updated);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
