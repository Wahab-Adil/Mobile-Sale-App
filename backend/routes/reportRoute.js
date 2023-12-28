const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  purchaseReport,
  purchaseAvaliableStackReport,
  purchaseOutOfStackReport,
  saleReport,
  maximumSoldProductsReport,
  minimumSoldProductsReport,
  expenseReport,
  loanReport,
} = require("../controllers/reportCtr");

router.post("/purchase", purchaseReport);
router.post("/avlstack/purchase", purchaseAvaliableStackReport);
router.post("/outstack/purchase", purchaseOutOfStackReport);
router.post("/sale", saleReport);
router.post("/max/sale", maximumSoldProductsReport);
router.post("/min/sale", minimumSoldProductsReport);
router.post("/expense", expenseReport);
router.post("/loan", loanReport);

module.exports = router;
