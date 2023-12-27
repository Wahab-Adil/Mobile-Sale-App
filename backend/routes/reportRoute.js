const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { saleReport, purchaseReport } = require("../controllers/reportCtr");

router.get("/purchase", purchaseReport);
router.get("/sale", saleReport);

module.exports = router;
