const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const saleListModel = require("../models/saleListModel");
const saleModel = require("../models/saleModel");
const ProductTrash = require("../models/ProductTrashModel");

// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category,
    quantity,
    description,
    color,
    type,
    purchasePrice,
    salePrice,
    image,
  } = req.body;
  console.log("backend", req.body);
  // Validation;
  if (
    !name ||
    !category ||
    !quantity ||
    !description ||
    !color ||
    !type ||
    !purchasePrice ||
    !salePrice
  ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  if (purchasePrice < 0 || salePrice < 0) {
    res.status(400);
    throw new Error("Price cant be negitive value");
  }

  console.log("req .file", req.file, image);
  // Create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    purchasePrice,
    salePrice,
    description,
    image: req.file,
    color,
    type,
  });

  res.status(201).json(product);
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  console.log("CLicked");

  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const TrashedProduct = await ProductTrash.findOne({ user: req.user.id });
  if (TrashedProduct) {
    const trashedUser = await ProductTrash.findOne({ user: req.user.id });
    trashedUser.productTrash.push(product);
    await trashedUser.save();
    await product.remove();
  } else {
    await ProductTrash.create({ user: req.user.id });
    const trashedUser = await ProductTrash.findOne({ user: req.user.id });
    trashedUser.productTrash.push(product);
    await trashedUser.save();
    await product.remove();
  }

  res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    quantity,
    purchasePrice,
    salePrice,
    color,
    type,
    description,
  } = req.body;
  console.log("req", req.file);

  // Validation;
  if (
    !name ||
    !category ||
    !quantity ||
    !description ||
    !color ||
    !type ||
    !purchasePrice ||
    !salePrice
  ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      purchasePrice,
      salePrice,
      description,
      image: req.file ? req.file : product.image,
      color,
      type,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

const saleProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category,
    purchasePrice,
    color,
    type,
    description,
    quantity,
    unitPrice,
    totalPrice,
    image,
  } = req.body;
  const { id } = req.params;

  const trashList = await saleListModel.findOne({ user: req.user.id });
  const saleTrashtemFound = await trashList.saleTrash.find((item) => {
    return item._id.toString() === req.params.id;
  });

  const product = await Product.findById(id);

  // if product doesnt exsaleTrashist
  if (!product && !saleTrashtemFound) {
    res.status(404);
    throw new Error("Sale not found");
  }

  if (saleTrashtemFound) {
    const createdSale = await saleModel.create({
      user: req.user.id,
      purchaseId: saleTrashtemFound.purchaseId,
      name,
      sku,
      category,
      purchasePrice,
      color,
      type,
      description,
      quantity,
      unitPrice,
      totalPrice,
      image: image,
    });
    const foundedSaleList = await saleListModel.findOne({ user: req.user.id });
    if (!foundedSaleList) {
      await saleListModel.create({ user: req.user.id });
      const foundedSale = await saleListModel.findOne({ user: req.user.id });
      foundedSale.saleProductsList.push(createdSale);
      await foundedSale.save();
    }
    foundedSaleList.saleProductsList.push(createdSale);
    await foundedSaleList.save();
    const trashItem = await saleListModel.findOne({ user: req.user.id });
    const saleTrashFound = await trashItem.saleTrash.filter((item) => {
      return item._id.toString() !== req.params.id;
    });
    await saleListModel.findOneAndUpdate(
      { user: req.user.id },
      { $set: { saleTrash: saleTrashFound } },
      { safe: true }
    );
  } else {
    // Match product to its user
    if (product?.user?.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    if (product?.quantity <= 0) {
      res.status(404);
      throw new Error("Product does not avaliable");
    }
    if (quantity > product?.quantity) {
      res.status(404);
      throw new Error(`avaliable stock ${product?.quantity}`);
    }
    if (unitPrice <= 0) {
      res.status(404);
      throw new Error("price cant be negitive");
    }
    // Update Product

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        quantity: product.quantity - quantity,
      },
      {
        new: true,
      }
    );

    // let save sale model
    const createdSale = await saleModel.create({
      user: req.user.id,
      purchaseId: updatedProduct._id,
      name,
      sku,
      category,
      quantity,
      unitPrice,
      totalPrice,
      purchasePrice,
      color,
      type,
      description,
      image: image,
    });
    const foundedSaleList = await saleListModel.findOne({ user: req.user.id });
    if (!foundedSaleList) {
      await saleListModel.create({ user: req.user.id });
      const foundedSale = await saleListModel.findOne({ user: req.user.id });
      foundedSale.saleProductsList.push(createdSale);
      await foundedSale.save();
    }
    foundedSaleList.saleProductsList.push(createdSale);
    await foundedSaleList.save();
  }

  //

  res.status(200).json("Operation Successfull");
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  saleProduct,
};
