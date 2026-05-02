const mongoose = require("mongoose");

const workerAccountSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  give: {
    crop: [
      {
        name: String,
        qty: Number,
        rate: Number,
        amount: Number,
      },
    ],
    amount: { type: Number, default: 0 },
    brief: String,
    amountType: String,
    rate: Number,
    handOver: String,
    days: Number,
    months: Number,
    interest: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
  take: {
    crop: [
      {
        name: String,
        qty: Number,
        rate: Number,
        amount: Number,
      },
    ],
    payment: { type: Number, default: 0 },
    paymentType: String,
    rate: Number,
    handOver: String,
    days: Number,
    months: Number,
    interest: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
  rate: { type: Number, default: 0 },
});

const workerSchema = new mongoose.Schema({
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
  workerDetail: {
    workerName: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
      nickName: {
        type: String,
      },
    },
    contect: { type: String },
    date: { type: Date, default: new Date() },
    idProof: { type: String },
  },
  account: [workerAccountSchema],
});

const WorkerData = mongoose.model("workerData", workerSchema);

module.exports = WorkerData;
