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
  },
  rate: { type: Number, default: 24 },
});

const workerSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "users",
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
