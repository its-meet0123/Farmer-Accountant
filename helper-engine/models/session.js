const { default: mongoose } = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    required: true,
    enum: ["Rabi", "Kharif", "Perennial"],
  },
  year: {
    type: String,
    required: true,
  },
  startDate: Date,
  endDate: Date,
  isActive: {
    type: Boolean,
    default: false,
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
