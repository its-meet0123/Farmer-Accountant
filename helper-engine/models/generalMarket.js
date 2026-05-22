const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  startDate: {
    type: Date,
  },
  rate: { type: Number, default: 0 },
  buyItems: {
    billAmoutn: { type: Number },
    bill: String,
    items: [
      {
        name: String,
        qty: Number,
        rate: Number,
        total: Number,
      },
    ],
    handOver: String,
  },
  pay: {
    payment: Number,
    method: String,
    handOver: String,
  },
  returnItems: {
    billAmount: { type: Number },
    bill: String,
    items: [
      {
        name: String,
        qty: Number,
        rate: Number,
        total: Number,
      },
    ],
    handOver: String,
  },
  shopeName: String,
});

const dailyEssentials = new mongoose.Schema({
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
  contact: {
    type: String,
  },
  marketLocation: {
    type: String,
    uppercase: true,
  },
  records: [recordSchema],
});

const DailyEssentials = mongoose.model("dailyEssential", dailyEssentials);

module.exports = { DailyEssentials };
