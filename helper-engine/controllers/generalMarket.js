const {
  DailyEssentials,
  CreditDailyEssentials,
} = require("../models/generalMarket");

// get list

async function getDailyEssentialsRecords(req, res) {
  try {
    const { sessionId } = req.params;
    const decoded = req.user;
    const currentUserId = decoded.id;

    const DailyEssentialsRecords = DailyEssentials.find({
      userId: currentUserId,
      sessionId: sessionId,
    });

    if (!DailyEssentialsRecords) {
      return res.status(400).json({
        status: "error",
        message: "Records not found",
      });
    }

    return res.status(200).json({
      status: "success",
      records: DailyEssentialsRecords,
      message: "Records founds successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

async function getCreditDailyEssentialsRecords(req, res) {
  try {
    const { sessionId } = req.params;
    const decoded = req.user;
    const currentUserId = decoded.id;

    const CrediteRecords = CreditDailyEssentials.find({
      userId: currentUserId,
      sessionId: sessionId,
    });

    if (!CrediteRecords) {
      return res.status(400).json({
        status: "error",
        message: "Credite records not founded.",
      });
    }

    return res.status(200).json({
      status: "success",
      records: CrediteRecords,
      message: "Records founded successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

async function handleUpdateDailyEssential(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;
    const decoded = req.user;
    const currentUserId = decoded.id;
    if (!id || !body) {
      return res.status(400).json({
        status: "error",
        message: "Body or Id is required",
      });
    }

    const dailyEssential = DailyEssentials.findOneAndUpdate(
      {
        userId: currentUserId,
        _id: id,
      },
      { $set: body },
      { new: true },
    );

    if (!dailyEssential) {
      return res.status(400).json({
        status: "error",
        message: "Daily Essential record not found and update",
      });
    }

    return res.status(200).json({
      status: "success",
      record: dailyEssential,
      message: "Record update successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

async function handleUpdateCreditEssential(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;
    const decoded = req.user;
    const currentUserId = decoded.id;

    if (!id || !body) {
      return res.status(400).json({
        status: "error",
        message: "Id and body required",
      });
    }

    const updateCreditEssential = CreditDailyEssentials.findOneAndUpdate(
      {
        userId: currentUserId,
        _id: id,
      },
      {
        $set: body,
      },
      { new: true },
    );

    if (!updateCreditEssential) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Credit record not founded and updated",
        });
    }

    return res.status(200).json({
      status: "success",
      record: updateCreditEssential,
      message: "record update successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}
