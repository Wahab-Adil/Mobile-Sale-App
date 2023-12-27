const asyncHandler = require("express-async-handler");
const saleModel = require("../models/saleModel");
const productModel = require("../models/productModel");

// sale Report
const purchaseReport = asyncHandler(async (req, res) => {
  const { fromDate, toDate } = req.body;
  const purchaseDateWise = await productModel.find({
    createdAt: {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    },
  });
  const totalpurchaseCount = await productModel
    .find({
      createdAt: {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      },
    })
    .count();
  const purcahseStatustics = await productModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalQuantity: {
          $sum: "$quantity",
        },
        totalPrice: {
          $sum: "$purchasePrice" * totalQuantity,
        },
      },
    },
  ]);
  const purchaseReport = {
    purchase: purchaseDateWise,
    totalpurchaseCount,
    purcahseStatustics,
  };

  res.status(200).json(purchaseReport);
});

// sale Report
const saleReport = asyncHandler(async (req, res) => {
  const { fromDate, toDate } = req.body;
  const SalesDateWise = await saleModel.find({
    createdAt: {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    },
  });
  const totalSalesDateWise = await saleModel
    .find({
      createdAt: {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      },
    })
    .count();
  const salesStatustics = await saleModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalQuantity: {
          $sum: "$quantity",
        },
        totalPrice: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);
  const salesReport = {
    sales: SalesDateWise,
    totalSalesDateWise,
    salesStatustics,
  };

  res.status(200).json(salesReport);
});

module.exports = {
  saleReport,
  purchaseReport,
};
