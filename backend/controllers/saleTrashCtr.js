const asyncHandler = require("express-async-handler");
const saleListModel = require("../models/saleListModel");

// Create Prouct
const getTrashList = asyncHandler(async (req, res) => {
  console.log("console added");
  const saleList = await saleListModel
    .findOne({ user: req.user.id })
    .sort("-createdAt");
  res.status(200).json(saleList);
});

// Get single product
const getSingleTrashItem = asyncHandler(async (req, res) => {
  const trashList = await saleListModel.findOne({ user: req.user.id });
  const trashItem = trashList?.saleTrash?.filter((trashItem) => {
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
  const saleLIst = await saleListModel.findOne({ user: req.user.id });
  // if product doesnt exist
  if (!saleLIst) {
    res.status(404);
    throw new Error("trash not found");
  }
  // Match product to its user
  if (saleLIst.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const fill = await saleListModel.findOneAndUpdate(
    { user: req.user.id },
    { $set: { saleTrash: [] } }
  );

  res.status(200).json({ message: "Trash Empty !" });
});

// Delete Product
const deleteTrashItem = asyncHandler(async (req, res) => {
  const saleList = await saleListModel.findOne({ user: req.user.id });
  const trashItem = saleList.saleTrash.filter((trashItem) => {
    return trashItem._id.toString() !== req.params.id;
  });
  console.log("exact", trashItem);
  // if product doesnt exist
  if (!saleList) {
    res.status(404);
    throw new Error("Trash not found");
  }
  // Match product to its user
  if (saleList.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await saleListModel.findOneAndUpdate(
    { user: req.user.id },
    { $set: { saleTrash: trashItem } },
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
