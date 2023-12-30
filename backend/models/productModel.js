const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    salePrice: {
      type: Number,
      required: [true, "Please add sale price"],
      trim: true,
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

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
