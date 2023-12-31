const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

const sampleCtr = (req, res) => {
  process.exit(0);
};

router.get("/", protect, sampleCtr);

module.exports = router;
