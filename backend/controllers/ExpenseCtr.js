const asyncHandler = require("express-async-handler");
const ExpenseModel = require("../models/expenseModel");
// Create Prouct
const createExpense = asyncHandler(async (req, res) => {
  const { user, to, narration, paid, description, date } = req.body;

  // Validation;
  if (!user || !to || !narration || !paid || !description || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Product
  const Expense = await ExpenseModel.create({
    user,
    to,
    narration,
    paid,
    description,
    date,
  });

  res.status(201).json(Expense);
});

// All Expenses
const AllExpense = asyncHandler(async (req, res) => {
  const AllExpenses = await ExpenseModel.find();
  if (AllExpenses.length === 0) {
    res.status(401);
    throw new Error("Expense List is Empty !");
  }

  res.status(201).json({ success: true, AllExpenses });
});

// Single Expense
const SingleExpense = asyncHandler(async (req, res) => {
  const Expense = await ExpenseModel.findById(req.params.id);

  if (!Expense) {
    res.status(401);
    throw new Error("Expense Not Found !");
  }
  // // Match Expense to its user
  // if (Expense?.user?.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

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
