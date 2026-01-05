const mongoose = require("mongoose");
const connectionRequestSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["interested", "ignored", "accepted", "rejected"],
      message: `{VALUES} is not supported`,
    },
  },
});

connectionRequestSchema.pre("save", function (next) {
  const connectionReq = this;
  if (connectionReq.toUserId.equals(connectionReq.fromUserId)) {
    throw new Error(
      "You are sneding to yourself please check the id you idiot"
    );
  }
});
const connectionRequestModal = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = connectionRequestModal;
