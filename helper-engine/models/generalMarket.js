const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  startDate: {
    type: Date,
  },
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
  marketName: {
    type: String,
  },
  marketLocation: {
    type: String,
    uppercase: true,
  },
  records: [recordSchema],
});

const creditSchema = new mongoose.Schema({
  startDate: {
    type: Date,
  },
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
  },
});

const creditDailyEssentials = new mongoose.Schema({
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
  date: { type: Date, required: true },
  shopeName: { type: String, required: true },
  records: [creditSchema],
});

const DailyEssentials = mongoose.model("dailyEssential", dailyEssentials);
const CreditDailyEssentials = mongoose.model(
  "creditDailyEssential",
  creditDailyEssentials,
);

module.exports = { DailyEssentials, CreditDailyEssentials };
