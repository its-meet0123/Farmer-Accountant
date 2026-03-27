const express = require("express");
const { dashBordData } = require("../controllers/dashbord/dashbord");

const router = express.Router();

router.get("/", dashBordData);

module.exports = router;
