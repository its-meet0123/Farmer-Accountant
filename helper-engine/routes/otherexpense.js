const express = require("express");
const {
  handleGetAllAdditionalWorkers,
} = require("../controllers/otherexpense");

const router = express.Router();

router.get("/", handleGetAllAdditionalWorkers);

module.exports = router;
