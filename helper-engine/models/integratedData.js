const mongoose = require("mongoose");

const grainMarketSchema = new mongoose.Schema({
  //comman fields
  startDate: {
    type: Date,
    default: new Date(),
  },
  rate: {
    type: Number,
    default: 0,
  },
  // Grain market fields
  loan: {
    amount: {
      type: Number,
      default: 0,
    },
    amountType: String,
    handOver: String,
    days: Number,
    months: Number,
    interest: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
  indBuy: {
    billAmount: {
      type: Number,
      default: 0,
    },
    bill: String,
    brief: String,
    handOver: String,
    days: Number,
    months: Number,
    interest: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
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
    days: Number,
    months: Number,
    interest: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
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
    days: Number,
    months: Number,
    interest: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
});

const generalMarketSchema = new mongoose.Schema({
  startDate: { type: Date, default: new Date() },
  rate: { type: Number, default: 0 },
  buyItems: {
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
  pay: {
    payment: { type: Number },
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
});

const indShopeSchema = new mongoose.Schema({
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
  nameInd: {
    type: String,
  },
  marketType: {
    type: String,
    required: true,
    enum: ["grain", "general"],
  },
  shopeNumber: {
    type: String,
    uppercase: true,
  },
  shopeAccount: {
    type: [grainMarketSchema],
    default: [],
    validate: {
      validator: function (value) {
        if (this.marketType === "grain") {
          return true;
        }
        return value.length === 0;
      },
      message: "shopeAccount allowed only for grain market.",
    },
  },
  generalShopeAccount: {
    type: [generalMarketSchema],
    default: [],
    validate: {
      validator: function (value) {
        if (this.marketTyp === "general") {
          return true;
        }
        return value.length === 0;
      },
      message: "generalShopeAccount allowed only for genral market.",
    },
  },
});

const Industries = mongoose.model("inddata", indShopeSchema);

module.exports = Industries;
