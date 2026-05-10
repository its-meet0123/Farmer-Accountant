const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    default: new Date(),
  },
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

const DailyEssential = mongoose.model("inddata", dailyEssentials);

module.exports = DailyEssential;
