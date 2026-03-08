const mongoose = require("mongoose");

shopeAccountSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    default: new Date(),
  },
  loan: {
    amount: {
      type: Number,
      default: 0,
    },
    amountType: String,
    handOver: String,
  },
  indBuy: {
    billAmount: {
      type: Number,
      default: 0,
    },
    bill: String,
    brief: String,
    handOver: String,
  },
  indSell: {
    crop: [
      {
        name: String,
        qty: Number,
        rate: Number,
        total: Number,
      },
    ],
    brief: String,
    handOver: String,
    billAmount: {
      type: Number,
      default: 0,
    },
    bill: String,
  },
  diesel: {
    qty: Number,
    billAmount: {
      type: Number,
      default: 0,
    },
    rate: Number,
    handOver: String,
  },
  rate: {
    type: Number,
    default: 24,
  },
});

const indShopeSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "users",
    required: true,
  },
  nameInd: {
    type: String,
  },
  shopeNumber: {
    type: String,
    unique: true,
    uppercase: true,
  },
  shopeAccount: [shopeAccountSchema],
});

const Industries = mongoose.model("inddata", indShopeSchema);

module.exports = Industries;
