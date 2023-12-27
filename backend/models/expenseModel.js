const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User"],
    },
    to: {
      type: String,
      required: [true, "Please Mention a Person"],
    },
    narration: {
      type: String,
    },
    paid: {
      type: Number,
      required: [true, "Please Mention paid price "],
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);
module.exports = ExpenseModel;
