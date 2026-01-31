const mongoose = require("mongoose");

const shopeSchema = new mongoose.Schema({
  shopeNumber: {
    type: String,
    required: true,
  },
  shopeAddress: String,
});

const entrepreneurSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "users",
    required: true,
  },
  nameInd: {
    type: String,
    required: true,
  },
  indFounder: {
    firstName: String,
    lastName: String,
  },
  indContact: String,
  shopes: [shopeSchema],
  startDate: {
    type: Date,
    default: new Date(),
  },
});

const EntData = mongoose.model("accounts", entrepreneurSchema);

module.exports = EntData;
