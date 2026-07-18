const mongoose = require("mongoose");

const newTransaction = new mongoose.Schema({});

const spotTransaction = new mongoose.Schema({
  userId: {
    type: String,
    ref: "users",
    required: true,
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "session",
    required: true,
  },
  shopeName: {
    type: String,
  },
  billAmount: { type: Number, default: 0 },
  bill: String,
  brief: String,
  handOver: String,
  payment: { type: Number, default: 0 },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Phone pay", "Gpay", "Check", "Other"],
  },
  payBy: String,
  pendingAmount: { type: Number, default: 0 },
});

const SpotTransactions = mongoose.model("soptTransaction", spotTransaction);

module.exports = { SpotTransactions };
