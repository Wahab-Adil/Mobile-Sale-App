const asyncHandler = require("express-async-handler");
const trashModel = require("../models/ProductTrashModel");

// Create Prouct
const getTrashList = asyncHandler(async (req, res) => {
  const trashList = await trashModel
    .findOne({ user: req.user.id })
    .populate("productTrash")
    .sort("-createdAt");
  res.status(200).json(trashList);
});

// Get single product
const getSingleTrashItem = asyncHandler(async (req, res) => {
  const trashList = await trashModel.findOne({ user: req.user.id });
  const trashItem = trashList.productTrash.filter((trashItem) => {
    return trashItem._id.toString() === req.params.id;
  });
  // if product doesnt exist
  if (!trashList) {
    res.status(404);
    throw new Error("Sale not found");
  }
  // Match product to its user
  if (trashList.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(trashItem);
});

// Empty Trash
const EmptyTrash = asyncHandler(async (req, res) => {
  const trashList = await trashModel.findOne({ user: req.user.id });
  // if product doesnt exist
  if (!trashList) {
    res.status(404);
    throw new Error("trash not found");
  }
  // Match product to its user
  if (trashList.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await trashModel.findOneAndUpdate(
    { user: req.user.id },
    { $set: { productTrash: [] } }
  );

  res.status(200).json({ message: "Trash Empty !" });
});

// Delete Product
const deleteTrashItem = asyncHandler(async (req, res) => {
  const { isAllSaleDelete } = req.body;
  if (isAllSaleDelete) {
    console.log("status", isAllSaleDelete);
  }
  const trashList = await trashModel.findOne({ user: req.user.id });
  const trashItem = trashList.productTrash.filter((trashItem) => {
    return trashItem._id.toString() !== req.params.id;
  });
  // if product doesnt exist
  if (!trashList) {
    res.status(404);
    throw new Error("Trash not found");
  }
  // Match product to its user
  if (trashList.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await trashModel.findOneAndUpdate(
    { user: req.user.id },
    { $set: { productTrash: trashItem } },
    { safe: true }
  );

  res.status(200).json({ message: "Successfully Deleted" });
});

// Delete Product
const deleteTrashItemWithBelongedSales = asyncHandler(async (req, res) => {
  const { isAllSaleDelete } = req.body;
  if (isAllSaleDelete) {
    console.log("status", isAllSaleDelete);
  }
  const trashList = await trashModel.findOne({ user: req.user.id });
  const trashItem = trashList.productTrash.filter((trashItem) => {
    return trashItem._id.toString() !== req.params.id;
  });
  // if product doesnt exist
  if (!trashList) {
    res.status(404);
    throw new Error("Trash not found");
  }
  // Match product to its user
  if (trashList.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await trashModel.findOneAndUpdate(
    { user: req.user.id },
    { $set: { productTrash: trashItem } },
    { safe: true }
  );

  res.status(200).json({ message: "Successfully Deleted" });
});
module.exports = {
  getSingleTrashItem,
  getTrashList,
  EmptyTrash,
  deleteTrashItem,
};
