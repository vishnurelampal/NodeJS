const express = require("express");
const userAuth = require("../../middleware/userAuth");
const userRouter = express.Router();
const ConnectionRequestModal = require("../../modals/ConnectionRequestModel");
const User = require("../../modals/UserModal");
//  dont show from userd logged in and status interested,ignored

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    let page = req.query.page || 1;
    let limit = req.query.limit || 2;
    limit = limit > 20 ? 20 : limit;
    const skip = (page - 1) * limit;
    const loggedInUser = req.user;
    const connecTionReqUser = await ConnectionRequestModal.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
          status: "interested",
        },
        {
          fromUserId: loggedInUser._id,
          status: "ignored",
        },
      ],
    });
    let ommittedUsers = new Set();
    connecTionReqUser.forEach((item) =>
      ommittedUsers.add(item.toUserId.toString())
    );

    const userFeedData = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(ommittedUsers), $ne: loggedInUser._id },
        },
      ],
    })
      .select("firstName lastName age gender emailId")
      .skip(skip)
      .limit(limit);
    res.send(userFeedData);
  } catch (err) {
    res.status(500).send("Error " + err.message);
  }
});
module.exports = userRouter;
