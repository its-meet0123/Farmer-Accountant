const mongoose = require("mongoose");

const accountSchemaFW = new mongoose.Schema({
  startDate: {
    type: Date,
  },
  duration: { type: Number, default: 0 },
  salary: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  pay: { type: Number, default: 0 },
  transType: String,
  remaining: Number,
  handOver: String,
});

accountSchemaFW.pre("save", function (next) {
  if (this.duration && this.salary) {
    this.total = this.duration * this.salary;
  }
  next();
});

accountSchemaFW.pre("save", function (next) {
  if (this.pay > 0) {
    this.total = this.total - this.pay;
  }
});

const fieldWorkerModel = new mongoose.Schema({
  userId: {
    type: String,
    ref: "users",
    required: true,
  },
  serviceProvider: {
    firstName: { type: String, required: true },
    lastName: { type: String },
    nickName: { type: String },
    address: { type: String },
    contact: { type: String },
    idProof: { type: String },
  },
  brief: String,
  date: {
    type: Date,
    default: new Date(),
  },
  transactions: [accountSchemaFW],
});

const accountSchemaHF = new mongoose.Schema({
  startDate: {
    type: Date,
  },
  duration: { type: Number, default: 0 },
  measurment: { type: Number, default: 0 },
  opratorCharge: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  pay: { type: Number, default: 0 },
  transType: String,
  remaining: { type: Number, default: 0 },
  brief: String,
  handOver: String,
});

accountSchemaHF.pre("save", function (next) {
  if (this.duration > 0 || (this.measurment > 0 && this.opratorCharge)) {
    this.total =
      this.duration * this.opratorCharge ||
      this.measurment * this.opratorCharge;
  }
  next();
});

accountSchemaHF.pre("save", function (next) {
  if (this.pay > 0) {
    this.total = this.total - this.pay;
  }
});

const harvestModel = new mongoose.Schema({
  userId: {
    type: String,
    ref: "users",
    required: true,
  },
  serviceProvider: {
    firstName: { type: String, required: true },
    lastName: { type: String },
    nickName: { type: String },
    Address: { type: String },
    contact: { type: String },
    idProof: { type: String },
  },
  vehicalDetails: {
    vehicalID: String,
    vehicalType: String,
    vehicalNumber: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  transactions: [accountSchemaHF],
});

const FieldWorker = mongoose.model("fieldWorker", fieldWorkerModel);
const Harvest = mongoose.model("harvest", harvestModel);

module.exports = { FieldWorker, Harvest };
