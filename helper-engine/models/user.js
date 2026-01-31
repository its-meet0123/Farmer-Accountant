const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: { type: String },
    },
    userId: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 5,
      maxlength: 15,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 6,
    },
  },
  { timestamps: true },
);

const Users = mongoose.model("users", userSchema);

module.exports = Users;
