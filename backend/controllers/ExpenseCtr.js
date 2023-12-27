const asyncHandler = require("express-async-handler");
const ExpenseModel = require("../models/expenseModel");
const moment = require("moment");
// Create Prouct
const createExpense = asyncHandler(async (req, res) => {
  const { to, narration, paid, description, date } = req.body;

  var d = new Date();
  var temp = d.toISOString();
  var subStr = temp.substr(10, temp.length - 1);
  var curDate = temp.replace(subStr, "T00:00:00.000Z");
  console.log(curDate);

  // Validation;
  if (!to || !narration || !paid || !description || !date) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Product
  await ExpenseModel.create({
    user: req.user.id,
    to,
    narration,
    paid,
    description,
    date: curDate,
  });

  res.status(201).json({ message: "Expense Created Successfully !" });
});

// All Expenses
const AllExpense = asyncHandler(async (req, res) => {
  const AllExpenses = await ExpenseModel.find();

  res.status(200).json({ success: true, AllExpenses });
});

// Single Expense
const SingleExpense = asyncHandler(async (req, res) => {
  const Expense = await ExpenseModel.findById(req.params.id);

  if (!Expense) {
    res.status(401);
    throw new Error("Expense Not Found !");
  }
  // Match Expense to its user
  if (Expense?.user?.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json({ success: true, Expense });
});

// Update Expense
const UpdateExpense = asyncHandler(async (req, res) => {
  const { to, narration, paid, description } = req.body;

  // Validation;
  if (!to || !narration || !paid || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  const Expense = await ExpenseModel.findById(req.params.id);
  // Match product to its user
  if (Expense?.user?.toString() !== req?.user?.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const fil = await ExpenseModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      user: req.user.id,
      to,
      narration,
      paid,
      description,
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json({ success: true, message: "Expense Updated Successfully !" });
});

// Single Expense
const DeleteExpense = asyncHandler(async (req, res) => {
  await ExpenseModel.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({ success: true, message: "Expense Successfully Deleted!" });
});

module.exports = {
  createExpense,
  SingleExpense,
  AllExpense,
  UpdateExpense,
  DeleteExpense,
};
