const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema(
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
    },
    recieved: {
      type: Number,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const LoanModel = mongoose.model("Loan", LoanSchema);
module.exports = LoanModel;
