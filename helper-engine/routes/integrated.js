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

router
  .route("/")
  .post(handlePostEntData)
  .get(authMiddleware, handleGetAllEntData);
router
  .route("/:id")
  .get(authMiddleware, handleGetEntDataById)
  .patch(authMiddleware, handleUpdateEntDataById)
  .delete(authMiddleware, handleDeleteEntDataById);

module.exports = router;
