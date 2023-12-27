const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createLoan,
  SingleLoan,
  AllLoans,
  UpdateLoan,
  DeleteLoan,
} = require("../controllers/LoanCtr");
const { upload } = require("../utils/fileUpload");

router.post("/create", protect, createLoan);
router.get("/", protect, AllLoans);
router.get("/:id", protect, SingleLoan);
router.patch("/:id", protect, UpdateLoan);
router.delete("/:id", protect, DeleteLoan);

module.exports = router;
