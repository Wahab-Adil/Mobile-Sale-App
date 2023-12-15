const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    purchasePrice: {
      type: Number,
      required: [true, "Please add purchase price"],
      trim: true,
    },
    unitPrice: {
      type: Number,
      required: [true, "Please add sale price"],
      trim: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
    color: {
      type: String,
      required: [true, "Please Add color"],
    },
    type: {
      type: String,
      required: [true, "Please mention type"],
    },
  },
  {
    timestamps: true,
  }
);

const saleModel = mongoose.model("sale", saleSchema);
module.exports = saleModel;
