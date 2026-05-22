const {
  DailyEssentials,
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



async function handleUpdateDailyEssential(req, res) {
  try {
    const {sessionId, shopeId } = req.params;
    const body = req.body;
    const decoded = req.user;
    const currentUserId = decoded.id;
    if (!sessionId || !shopeId || Object.keys(body).length === 0) {
      return res.status(400).json({
        status: "error",
        message: `${!sessionId && "Session Id" || !shopeId && "Shope Id" || Object.keys(body).length === 0 && "Body"} is required}`,
      });
    }

    const dailyEssential = DailyEssentials.findOneAndUpdate(
      {
        userId: currentUserId,
        sessionId: sessionId,
        _id: shopeId,
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

async function handleDeleteDailyEssential(req, res){
  
    const {sessionId, shopeId} = req.params;
    if(!sessionId || !shopeId){
      return res.status(400).json({
        status: "error",
        message: `${!sessionId ? "Season Id" : "Shope Id"} is required`,
      });
    }
    try {
      const decoded = req.user;
    const currentUserId = decoded.id;
      const deletedRecord = await DailyEssentials.findOneAndDelete({_id: shopeId, userId: currentUserId, sessionId: sessionId });

      return res.status(200).json({
        status: "success",
        record: deletedRecord,
        message: "Record deleted successfully.",
      });

  }catch(err) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      })
    }
  }

