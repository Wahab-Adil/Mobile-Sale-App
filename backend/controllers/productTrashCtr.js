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
    trashItem._id === req.params.id;
  });
  console.log("trash Item", trashItem);
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
  res.status(200).json(trashList);
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
    { _id: req.params.id },
    { $addToSet: { productTrash: [] } }
  );

  res.status(200).json({ message: "Trash Empty !" });
});

// Delete Product
const deleteTrashItem = asyncHandler(async (req, res) => {
  const trashList = await trashModel.findOne({ user: req.user.id });
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

  await trashModel.updateOne(
    { user: req.user.id },
    { $pullAll: { saleProductsList: [{ _id: req.params.id }] } },
    { safe: false }
  );
  res.status(200).json({ message: "Successfully Deleted" });
});
module.exports = {
  getSingleTrashItem,
  getTrashList,
  EmptyTrash,
  deleteTrashItem,
};
