require("dotenv").config();
const InterestDate = require("../models/endDate");

async function handleGetInterestDate(req, res) {
  //const token = req.cookies.token;
  try {
    const { dataId } = req.params;
    const decoded = req.user;
    const currentUserId = decoded.id;
    const interestDate = await InterestDate.findOne({
      userId: currentUserId,
      dataId: dataId,
    });

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
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function handlePostInterestDate(req, res) {
  try {
    const { userId, dataId, endDate } = req.body;

    if (!userId || !dataId || !endDate) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    const findDate = await InterestDate.findOne({
      userId,
      dataId,
    });

    if (findDate) {
      return res.status(200).json({
        status: "success",
        message: "endDate already exist",
        data: findDate,
      });
    }

    const result = await InterestDate.create({
      userId,
      dataId,
      endDate,
    });

    return res.status(201).json({
      status: "success",
      message: "Interest Date created successfully",
      data: result,
    });
  } catch (error) {
    console.log("Interest Date Error:", error);

    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function handleUpdateInterestDate(req, res) {
  //const token = req.cookies.token;

  try {
    const { dataId } = req.params;
    const decoded = req.user;
    const currentUserId = decoded.id;

    const { id } = req.params;
    const body = req.body;
    if (!id || !body) {
      return res.json({ status: "error", message: "Id and body are required" });
    }

    const updateInterestDate = await InterestDate.findByIdAndUpdate(
      { _id: id, userId: currentUserId, dataId: dataId },
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
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function handleDeleteInterestDate(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;
    const { dataId, id } = req.params;

    const interestDate = await InterestDate.findByIdAndDelete({
      _id: id,
      userId: currentUserId,
      dataId: dataId,
    });

    if (!interestDate) {
      return res
        .status(404)
        .json({ status: "error", message: "Interest Date not deleted" });
    }

    return res.status(200).json({
      status: "success",
      message: "Interest Date deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
}

module.exports = {
  handlePostInterestDate,
  handleUpdateInterestDate,
  handleDeleteInterestDate,
  handleGetInterestDate,
};
