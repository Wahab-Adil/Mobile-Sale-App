const asyncHandler = require("express-async-handler");
const saleListModel = require("../models/saleListModel");
const saleModel = require("../models/saleModel");
const Product = require("../models/productModel");

// Create Prouct
const getSaleList = asyncHandler(async (req, res) => {
  const saleList = await saleListModel
    .findOne({ user: req.user.id })
    .populate("saleProductsList")
    .sort("-createdAt");
  res.status(200).json(saleList);
});

// Get single product
const getSingleSale = asyncHandler(async (req, res) => {
  const FoundedSale = await saleModel.findById(req.params.id);
  // if product doesnt exist
  if (!FoundedSale) {
    res.status(404);
    throw new Error("Sale not found");
  }
  // Match product to its user
  if (FoundedSale.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(FoundedSale);
});

// Delete Product
const deleteSale = asyncHandler(async (req, res) => {
  const saleList = await saleListModel.findOne({ user: req.user.id });
  // if product doesnt exist
  if (!saleList) {
    res.status(404);
    throw new Error("Sale not found");
  }
  // Match product to its user
  if (saleList.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const foundedSale = await saleModel.findById(req.params.id);

  const TrashedSale = await saleListModel.findOne({ user: req.user.id });
  if (TrashedSale) {
    const trashedUser = await saleListModel.findOne({ user: req.user.id });
    trashedUser.saleTrash.push(foundedSale);
    await trashedUser.save();
    await foundedSale.remove();
  } else {
    await saleListModel.create({ user: req.user.id });
    const trashedUser = await saleListModel.findOne({ user: req.user.id });
    trashedUser.saleTrash.push(foundedSale);
    await trashedUser.save();
    await foundedSale.remove();
  }

  await saleListModel.updateOne(
    { user: req.user.id },
    { $pullAll: { saleProductsList: [{ _id: req.params.id }] } },
    { safe: false }
  );
  res.status(200).json({ message: "Successfully Deleted" });
});

// Update Product
const updateSale = asyncHandler(async (req, res) => {
  const { quantity, unitPrice, totalPrice } = req.body;
  // Validation;
  if (!quantity || !unitPrice || !totalPrice) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  if (quantity <= 0 || unitPrice <= 0) {
    res.status(400);
    throw new Error("quantity or price can't be negitive");
  }

  const avaliableSale = await saleModel.findById(req.params.id);
  const avaliableProduct = await Product.findById(avaliableSale.purchaseId);

  // let exactSaleQuantity;
  // let totalQunatity;
  // totalQunatity = avaliableSale.quantity + avaliableProduct.quantity;
  // const AllSaleOfSpecificProduct = await saleModel.find({
  //   purchaseId: avaliableSale.purchaseId,
  // });
  // finding total quantity
  // const totalSaleQuantity = AllSaleOfSpecificProduct?.map((product) => {
  //   return product.quantity;
  // }).reduce((a, b) => a + b, 0);
  // totalQunatity = totalSaleQuantity + avaliableProduct.quantity;
  // console.log(totalQunatity);

  if (avaliableProduct.quantity + avaliableSale.quantity < quantity) {
    res.status(400);
    throw new Error(
      `Avaliable Quantity is ${
        avaliableProduct.quantity + avaliableSale.quantity
      }`
    );
  }

  if (quantity > avaliableSale.quantity) {
    exactSaleQuantity = quantity - avaliableSale.quantity;
    avaliableProduct.quantity = avaliableProduct.quantity - exactSaleQuantity;
    await avaliableProduct.save();
  }
  if (quantity < avaliableSale.quantity) {
    exactSaleQuantity = avaliableSale.quantity - quantity;
    avaliableProduct.quantity = avaliableProduct.quantity + exactSaleQuantity;
    await avaliableProduct.save();
  }

  // Update Sale
  const result = await saleModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      user: req.user.id,
      quantity,
      unitPrice,
      totalPrice,
    },
    { new: true }
  );

  res.status(200).json(result);
});

module.exports = {
  getSaleList,
  getSingleSale,
  deleteSale,
  updateSale,
};
