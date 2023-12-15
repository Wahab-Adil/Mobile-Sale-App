const mongoose = require("mongoose");

const ProductTrashSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productTrash: [],
  },

  {
    timestamps: true,
  }
);

const ProductTrash = mongoose.model("ProductTrash", ProductTrashSchema);
module.exports = ProductTrash;
