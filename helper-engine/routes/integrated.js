const express = require("express");
const {
  handlePostEntData,
  handleGetAllEntData,
  handleGetEntDataById,
  handleUpdateEntDataById,
  handleDeleteEntDataById,
} = require("../controllers/integrated");

const router = express.Router();

router.route("/").post(handlePostEntData).get(handleGetAllEntData);
router
  .route("/:id")
  .get(handleGetEntDataById)
  .patch(handleUpdateEntDataById)
  .delete(handleDeleteEntDataById);

module.exports = router;
