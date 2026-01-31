const InterestDate = require("../models/endDate");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "#96%meet$kaur@2026";

async function handleGetInterestDate(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const interestDate = await InterestDate.find({ userId: currentUserId });

  if (!interestDate) {
    return res.status(404).json({
      status: "Error",
      Message: "Interest Date not found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: interestDate,
  });
}

async function handlePostInterestDate(req, res) {
  const data = req.body;

  if (!data) {
    return res.json({ status: "error", message: "All fields are required" });
  }

  const result = await InterestDate.create({
    userId: data.userId,
    endDate: data.endDate,
    dateType: data.dateType,
  });

  res.status(201).json({
    status: "success",
    message: "Interest Date created successfully",
    data: result,
  });
}

async function handleUpdateInterestDate(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;

  const { id } = req.params;
  const body = req.body;
  if (!id || !body) {
    return res.json({ status: "error", message: "Id and body are required" });
  }

  const updateInterestDate = await InterestDate.findByIdAndUpdate(
    { _id: id, userId: currentUserId },
    body,
    {
      new: true,
    },
  );
  if (!updateInterestDate) {
    return res
      .status(404)
      .json({ status: "error", message: "Interest Date not found" });
  }
  return res.status(200).json({
    status: "success",
    message: "Interest Date update successfully",
    data: updateInterestDate,
  });
}

async function handleDeleteInterestDate(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const { id } = req.params;

  const interestDate = await InterestDate.findByIdAndDelete({
    _id: id,
    userId: currentUserId,
  });
  if (!interestDate) {
    return res
      .status(404)
      .json({ status: "error", message: "Interest Date not deleted" });
  }

  return res
    .status(200)
    .json({ status: "success", message: "Interest Date deleted successfully" });
}

module.exports = {
  handlePostInterestDate,
  handleUpdateInterestDate,
  handleDeleteInterestDate,
  handleGetInterestDate,
};
