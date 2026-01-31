const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "users",
    required: true,
  },
  endDate: { type: Date, default: new Date() },
  dateType: { type: String },
});

const InterestDate = mongoose.model("interst", dateSchema);

module.exports = InterestDate;
