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
router
  .route("/:sessionId")
  .get(authMiddleware, handleGetSessionById)
  .delete(authMiddleware, handleDeleteSession)
  .put(authMiddleware, handleUpdateSession);
router.get("/active-session", authMiddleware, handleGetActiveSession);

module.exports = router;
