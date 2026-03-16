require("dotenv").config();
const { FieldWorker, Harvest } = require("../models/otherexpense");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;

async function handleGetAllAdditionalWorkers(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const allAdditionalWorker = await FieldWorker.find({ userId: currentUserId });
  if (!allAdditionalWorker) {
    return res.status(404).json({
      status: "Error",
      Code: "OE.FW.WNF",
      check: {
        worker: "Satname",
        duration: 5,
        salary: 500,
        total: 2500,
        pay: 1000,
      },
    });
  }
  return res.status(200).json({
    status: "Success",
    data: allAdditionalWorker,
    Code: "OE.FW.WF",
  });
}

module.exports = {
  handleGetAllAdditionalWorkers,
};
