const express = require("express");
const userAuth = require("../../middleware/userAuth");
const connectionRouter = express.Router();
const ConnectionRequestModal = require("../../modals/ConnectionRequestModel");
const User = require("../../modals/UserModal");

connectionRouter.post(
  "/request/review/:status/:reqId",
  userAuth,
  async (req, res) => {
    try {
      const allowed = ["accepted", "rejected"];

      const reqId = req.params.reqId;
      const status = req.params.status;
      const toUserId = req.user._id;
      if (!allowed.includes(status)) {
        throw new Error("Invalid operation ");
      }
      const finObj = {
        _id: reqId,
        toUserId: toUserId,
        status: "interested",
      };
      console.log(finObj);
      const connectionReq = await ConnectionRequestModal.findOne(finObj);

      res.send("Here is the data" + connectionReq);
    } catch (err) {
      res.status(500).json({ error: "404", message: err.message });
    }
  }
);
connectionRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res, next) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;
      const allowed = ["interested", "ignored"];
      if (!allowed.includes(status)) {
        throw new Error("Not allowed action");
      }

      // if (fromUserId.toString() === toUserId.toString()) {
      //   throw new Error("You cannot send to u r self");
      // }

      const UserDataSend = await User.findOne({ _id: toUserId });
      if (!UserDataSend) {
        throw new Error("Oops something went wron");
      }
      const checkExist = await ConnectionRequestModal.findOne({
        $or: [
          { fromUserId, toUserId },
          // { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (checkExist) {
        console.log(checkExist.fromUserId);
        throw new Error("Connection Alreasy send have some patience");
      }
      const connectionReq = new ConnectionRequestModal({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionReq.save();
      res.json({
        status: status,
        message: `Your ${
          status === "interested" ? "Interest" : "Rejection"
        } has been send to  ${UserDataSend.firstName} succesfully`,
        data: data,
      });
    } catch (err) {
      res.send("Error " + err.message);
    }
  }
);
connectionRouter.get("/getConnections/:type", userAuth, async (req, res) => {
  try {
    const allowed = ["interested", "ignored"];
    const typeOfReq = req.params.type;
    if (!allowed.includes(typeOfReq)) {
      throw new Error("Dont try improper req here...");
    }
    const toUserId = req.user._id;
    const getConnectionReq = await ConnectionRequestModal.find({
      toUserId,
      status: typeOfReq,
    }).populate("fromUserId", ["firstName", "lastName"]);
    if (!getConnectionReq) {
      throw new Error("Oops not request at the moment try again");
    }
    res.json({ status: "succ", data: getConnectionReq });
  } catch (err) {
    res.status(500).send(`Error ${err.message}`);
  }
});
module.exports = connectionRouter;
