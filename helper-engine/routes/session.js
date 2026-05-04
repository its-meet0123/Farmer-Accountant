const express = require("express");
const {
  handlePostSession,
  handleGetAllSessions,
  handleGetSessionById,
  handleDeleteSession,
  handleUpdateSession,
  handleGetActiveSession,
} = require("../controllers/session");
const authMiddleware = require("../middleware/checkAuth");

const router = express.Router();

router
  .route("/")
  .post(handlePostSession)
  .get(authMiddleware, handleGetAllSessions);

router.get("/active-session", authMiddleware, handleGetActiveSession);

router
  .route("/:sessionId")
  .get(authMiddleware, handleGetSessionById)
  .delete(authMiddleware, handleDeleteSession)
  .patch(authMiddleware, handleUpdateSession);

module.exports = router;
