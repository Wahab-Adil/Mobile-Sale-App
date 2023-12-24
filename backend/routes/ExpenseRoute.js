const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createExpense,
  SingleExpense,
  AllExpense,
  UpdateExpense,
  DeleteExpense,
} = require("../controllers/ExpenseCtr");

router.post("/create", protect, createExpense);
router.get("/", protect, AllExpense);
router.get("/:id", protect, SingleExpense);
router.patch("/:id", protect, UpdateExpense);
router.delete("/:id", protect, DeleteExpense);

module.exports = router;
