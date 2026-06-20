const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
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
  dataId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  endDate: { type: Date, default: new Date() },
});

const InterestDate = mongoose.model("interst", dateSchema);

module.exports = InterestDate;
