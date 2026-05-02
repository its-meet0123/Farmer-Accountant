require("dotenv").config();
const Sessions = require("../models/session");

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

  if (!sessionInfo) {
    return res.json({ status: "error", message: "All fields are required" });
  }

  const result = await Sessions.create(sessionInfo);

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
        status: "Errror",
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
    if (!sessionId || !body) {
      return res.json({ status: "error", message: "Id and body are required" });
    }

    const updateSession = await Sessions.findByIdAndUpdate(
      { _id: sessionId, userId: currentUserId },
      body,
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
