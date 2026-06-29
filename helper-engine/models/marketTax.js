const { default: mongoose } = require("mongoose");

const marketTaxs = new mongoose.Schema({
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
  shopeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inddata",
    required: true,
  },
  rateForEightMiti: {
    type: Number,
    default: 0,
  },
  rateForCommission: {
    type: Number,
    default: 0,
  },
  totalOfSellCrop: {
    type: Number,
    required: true,
  },
  eightMiti: {
    type: Number,
    default: 0,
  },
  commission: {
    type: Number,
    default: 0,
  },
});

const MarketTaxs = mongoose.model("markettax", marketTaxs);

module.exports = MarketTaxs;
