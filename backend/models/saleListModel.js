const mongoose = require("mongoose");

const saleListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    saleProductsList: [
      { type: mongoose.mongoose.Schema.Types.ObjectId, ref: "sale" },
    ],
    saleTrash: [{ type: mongoose.mongoose.Schema.Types.ObjectId, ref: "sale" }],
  },
  {
    timestamps: true,
  }
);

const SaleListModel = mongoose.model("SaleList", saleListSchema);
module.exports = SaleListModel;
