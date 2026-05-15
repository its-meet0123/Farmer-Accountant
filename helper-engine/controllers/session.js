require("dotenv").config();
const Sessions = require("../models/session");
const Shopes = require("../models/integratedData");
const Industries = require("../models/integrated");
const Workers = require("../models/worker");
const InterestDate = require("../models/endDate");
const { FieldWorker, Harvest } = require("../models/otherexpense");
const Session = require("../models/session");

async function handleGetAllSessions(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;
    const sessions = await Sessions.find({ userId: currentUserId });

    if (!sessions) {
      return res.status(404).json({
        status: "Error",
        Message: "Sessions not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: sessions,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function handlePostSession(req, res) {
  const sessionInfo = req.body;

  if (Object.keys(sessionInfo).length === 0) {
    return res.json({ status: "error", message: "All fields are required" });
  }

  const { userId } = sessionInfo;
  let { startDate, endDate } = sessionInfo;
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  if (isNaN(startDate) || isNaN(endDate)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid date format",
    });
  }

  if (startDate > endDate) {
    return res.status(400).json({
      status: "error",
      message: "Start date cannot be greater than end date",
    });
  }

  const monthDiff =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  if (monthDiff < 3) {
    return res.status(400).json({
      status: "error",
      message: "Session duration should be at least 3 months",
    });
  }

  const sessions = await Sessions.find({ userId: userId });
  const previousSession = sessions.at(-1);
  const previousSessionEnd = previousSession?.endDate
    ? new Date(previousSession.endDate)
    : null;

  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const allowedOverLapPoint = new Date(
    previousSessionEnd.getTime() - thirtyDaysInMs,
  );

  if (previousSessionEnd && startDate < allowedOverLapPoint) {
    return res.status(409).json({
      status: "conflict",
      message: "CONFLICT_MSG",
    });
  }

  const today = new Date();

  let isActive = false;

  if (startDate <= today && endDate >= today) {
    isActive = true;
  }

  const result = await Sessions.create({
    ...sessionInfo,
    startDate,
    endDate,
    isActive,
  });

  res.status(201).json({
    status: "success",
    message: "Session created successfully",
    data: result,
  });
}

async function handleGetActiveSession(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;

    const session = await Sessions.findOne({
      userId: currentUserId,
      isActive: true,
    });

    if (!session) {
      return res.status(404).json({
        status: "Error",
        hasSession: false,
        message: "No active session found",
      });
    }

    return res.status(200).json({
      status: "Success",
      hasSession: true,
      data: session,
      message: "Session fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function handleGetSessionById(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;

    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        status: "Error",
        message: "Id is required",
      });
    }

    const session = await Sessions.findOne({
      userId: currentUserId,
      _id: sessionId,
    });

    if (!session) {
      return res.status(500).json({
        status: "Error",
        hasSession: false,
        message: "No session found with id",
      });
    }

    return res.status(200).json({
      status: "Success",
      hasSession: true,
      data: session,
      message: "Session fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function handleUpdateSession(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;

    const { sessionId } = req.params;
    const body = req.body;
    if (!sessionId || Object.keys(body).length === 0) {
      return res.json({ status: "error", message: "Id and body are required" });
    }

    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

    const session = await Sessions.findOne({
      _id: sessionId,
      userId: currentUserId,
    });

    const sessionStart = session?.startDate;
    const allowPriousStart = new Date(sessionStart.getTime() + thirtyDaysInMs);
    const sessionEnd = session?.endDate;
    const allowedNextEnd = new Date(sessionEnd.getTime() - thirtyDaysInMs);

    const previousSession = await Sessions.findOne({
      userId: currentUserId,
      _id: { $ne: sessionId },
      endDate: { $lte: allowPriousStart },
    });
    // .sort({ endDate: -1 })
    // .limit(1);

    const nextSession = await Sessions.findOne({
      userId: currentUserId,
      _id: { $ne: sessionId },
      startDate: { $gte: allowedNextEnd },
    });
    // .sort({ startDate: 1 })
    // .limit(1);

    console.log(
      "Edit session opration mai previousSession :",
      previousSession,
      "and nextSession :",
      nextSession,
    );

    let { startDate, endDate } = body;

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (startDate > endDate) {
      return res.status(400).json({
        status: "error",
        message: "Start date cannot be greater than end date",
      });
    }

    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid date format",
      });
    }

    const allowedOverLapPoint = new Date(startDate.getTime() + thirtyDaysInMs);

    const overlappingSeason = await Sessions.findOne({
      $and: [
        { userId: currentUserId },
        { _id: { $ne: sessionId } },
        { endDate: { $gt: allowedOverLapPoint } },
        { startDate: { $lt: endDate } },
      ],
    });

    if (overlappingSeason) {
      return res.status(409).json({
        status: "conflict",
        message: "CONFLICT_MSG",
      });
    }

    const today = new Date();
    let isActive = false;
    if (startDate <= today && endDate >= today) {
      isActive = true;
    }

    const updateSessionInfo = {
      ...body,
      startDate,
      endDate,
      isActive,
    };

    const updateSession = await Sessions.findOneAndUpdate(
      { _id: sessionId, userId: currentUserId },
      updateSessionInfo,
      {
        new: true,
      },
    );
    if (!updateSession) {
      return res
        .status(404)
        .json({ status: "error", message: "Session not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Session updated successfully",
      data: updateSession,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function handleDeleteSession(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;
    const { sessionId } = req.params;

    await Promise.all([
      Industries.deleteMany({ userId: currentUserId, sessionId: sessionId }),
      Shopes.deleteMany({ userId: currentUserId, sessionId: sessionId }),
      Workers.deleteMany({ userId: currentUserId, sessionId: sessionId }),
      FieldWorker.deleteMany({ userId: currentUserId, sessionId: sessionId }),
      Harvest.deleteMany({ userId: currentUserId, sessionId: sessionId }),
      InterestDate.deleteMany({ userId: currentUserId, sessionId: sessionId }),
    ]);

    const session = await Sessions.findByIdAndDelete({
      _id: sessionId,
      userId: currentUserId,
    });
    if (!session) {
      return res
        .status(404)
        .json({ status: "error", message: "Session not deleted" });
    }

    return res.status(200).json({
      status: "success",
      message: "Session deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
}

module.exports = {
  handleGetAllSessions,
  handlePostSession,
  handleUpdateSession,
  handleDeleteSession,
  handleGetActiveSession,
  handleGetSessionById,
};
