const mongoose = require("mongoose");

const accountSchemaFW = new mongoose.Schema({
  startDate: {
    type: Date,
  },
  duration: { type: Number, default: 0 },
  salary: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  pay: { type: Number, default: 0 },
  payFor: String,
  transType: String,
  remaining: Number,
  handOver: String,
  transactionNumber: Number,
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
  typeOfWork: String,
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
  salary: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  pay: { type: Number, default: 0 },
  transType: String,
  vehical: String,
  remaining: { type: Number, default: 0 },
  brief: String,
  handOver: String,
  transactionNumber: Number,
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
    address: { type: String },
    contact: { type: String },
    idProof: { type: String },
  },
  vehicalDetails: [
    {
      vehicalID: String,
      vehicalType: String,
      vehicalNumber: String,
      typeOfWork: String,
    },
  ],
  date: {
    type: Date,
    default: new Date(),
  },
  transactions: [accountSchemaHF],
});

const FieldWorker = mongoose.model("fieldWorker", fieldWorkerModel);
const Harvest = mongoose.model("harvest", harvestModel);

module.exports = { FieldWorker, Harvest };
