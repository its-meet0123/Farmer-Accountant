const express = require("express");
const {
  handlePostEntData,
  handleGetAllEntData,
  handleGetEntDataById,
  handleUpdateEntDataById,
  handleDeleteEntDataById,
} = require("../controllers/integrated");
const authMiddleware = require("../middleware/checkAuth");

const router = express.Router();

router.post("/", handlePostEntData);
router.get("/:sessionId", authMiddleware, handleGetAllEntData);
router
  .route("/:id")
  .get(authMiddleware, handleGetEntDataById)
  .patch(authMiddleware, handleUpdateEntDataById)
  .delete(authMiddleware, handleDeleteEntDataById);

module.exports = router;
