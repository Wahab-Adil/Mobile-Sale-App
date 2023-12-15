const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  getSaleList,
  getSingleSale,
  deleteSale,
  updateSale,
} = require("../controllers/saleController");
const { upload } = require("../utils/fileUpload");

router.get("/", protect, getSaleList);
router.get("/:id", protect, getSingleSale);
router.delete("/:id", protect, deleteSale);
router.put("/update/:id", protect, updateSale);

module.exports = router;
