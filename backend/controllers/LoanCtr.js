const asyncHandler = require("express-async-handler");
const LoanModel = require("../models/LoanModel");
// Create Prouct
const createLoan = asyncHandler(async (req, res) => {
  const { to, narration, paid, recieved, description, date } = req.body;

  // Validation;
  if (!to || !narration || !paid || !recieved || !description || !date) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Product
  await LoanModel.create({
    user: req.user.id,
    to,
    narration,
    paid,
    recieved,
    description,
    date,
  });

  res.status(201).json("Successfull !");
});

// All Expenses
const AllLoans = asyncHandler(async (req, res) => {
  const AllLoans = await LoanModel.find();
  if (AllLoans.length === 0) {
    res.status(401);
    throw new Error("Expense List is Empty !");
  }

  res.status(201).json({ success: true, AllLoans });
});

// Single Expense
const SingleLoan = asyncHandler(async (req, res) => {
  const Loan = await LoanModel.findById(req.params.id);

  if (!Loan) {
    res.status(401);
    throw new Error("Loan Not Found !");
  }
  // Match Expense to its user
  if (Loan?.user?.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(201).json({ success: true, Loan });
});

// Update Expense
const UpdateLoan = asyncHandler(async (req, res) => {
  const { to, narration, paid, recieved, description, date } = req.body;

  // Validation;
  if (!to || !narration || !paid || !recieved || !description || !date) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  // Match product to its user
  if (Expense?.user?.toString() !== req?.user?.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await LoanModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      to,
      narration,
      paid,
      recieved,
      description,
      date,
    },
    {
      new: true,
    }
  );

  res
    .status(201)
    .json({ success: true, message: "Loan Updated Successfully !" });
});

// Single Expense
const DeleteLoan = asyncHandler(async (req, res) => {
  await LoanModel.findByIdAndDelete(req.params.id);
  res
    .status(201)
    .json({ success: true, message: "Expense Successfully Deleted!" });
});

module.exports = {
  createLoan,
  SingleLoan,
  AllLoans,
  UpdateLoan,
  DeleteLoan,
};
