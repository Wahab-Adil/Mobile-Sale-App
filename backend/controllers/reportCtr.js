const asyncHandler = require("express-async-handler");
const saleModel = require("../models/saleModel");
const productModel = require("../models/productModel");
const expenseModel = require("../models/expenseModel");
const loanModel = require("../models/LoanModel");
const { default: mongoose } = require("mongoose");

// Purchase Report
const purchaseReport = asyncHandler(async (req, res) => {
  const { fromDate, toDate } = req.body;
  const purchaseDateWise = await productModel.find({
    updatedAt: {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    },
  });
  const totalpurchaseCount = await productModel
    .find({
      updatedAt: {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      },
    })
    .count();
  const purcahseStatustics = await productModel.aggregate([
    {
      $match: {
        updatedAt: {
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

// Purchase Avaliable  Stack Report
const purchaseAvaliableStackReport = asyncHandler(async (req, res) => {
  const { fromDate, toDate } = req.body;
  const purchaseAvaliableStackDateWise = await productModel.find({
    createdAt: {
      $gte: fromDate,
      $lte: toDate,
    },
  });
  const result = purchaseAvaliableStackDateWise?.filter((avaliableProducts) => {
    return !avaliableProducts.quantity <= 0;
  });

  res.status(200).json(result);
});

// Purchase Out of  Stack Report
const purchaseOutOfStackReport = asyncHandler(async (req, res) => {
  console.log("Calel", req.body);

  const { fromDate, toDate } = req.body;
  const purchaseAvaliableStackDateWise = await productModel.find({
    createdAt: {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    },
  });
  const result = purchaseAvaliableStackDateWise?.filter((avaliableProducts) => {
    return avaliableProducts.quantity === 0;
  });

  res.status(200).json(result);
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

// top 3 max sold  Report
const maximumSoldProductsReport = asyncHandler(async (req, res) => {
  const { fromDate, toDate, limit } = req.body;

  if (!fromDate || !toDate || !limit) {
    res.status(400);
    throw new Error("please fill all fields");
  }
  await saleModel.aggregate(
    [
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
          _id: "$purchaseId",
          quantity: { $sum: "$quantity" },
        },
      },

      {
        $sort: {
          quantity: -1,
        },
      },
      {
        $limit: limit,
      },
    ],
    async function (err, list) {
      await productModel.populate(list, { path: "_id" }, (err, result) => {
        console.log("res", result);
        const ExistedProMaxSoldList = result?.filter((productResult) => {
          return productResult._id !== null;
        });

        const maxSold = ExistedProMaxSoldList.map((res) => {
          return {
            _id: res._id._id,
            name: res._id.name,
            sku: res._id.sku,
            category: res._id.category,
            purchasePrice: res._id.purchasePrice,
            salePrice: res._id.salePrice,
            description: res._id.description,
            image: res._id.image,
            color: res._id.color,
            type: res._id.type,
            avalQuantity: res._id.quantity,
            purchasedQuantity: res.quantity,
          };
        });

        res.status(200).json(maxSold);
      });
      if (err) {
        res.status(400);
        throw new Error(err);
      }
    }
  );
});

// top 3 min sold  Report
const minimumSoldProductsReport = asyncHandler(async (req, res) => {
  const { fromDate, toDate, limit } = req.body;

  if (!fromDate || !toDate || !limit) {
    res.status(400);
    throw new Error("please fill all fields");
  }
  await saleModel.aggregate(
    [
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
          _id: "$purchaseId",
          quantity: { $sum: "$quantity" },
        },
      },

      {
        $sort: {
          quantity: 1,
        },
      },
      {
        $limit: limit,
      },
    ],
    async function (err, list) {
      await productModel.populate(list, { path: "_id" }, (err, result) => {
        const ExistedProductMinSoldList = result?.filter((productResult) => {
          return productResult._id !== null;
        });
        const minSold = ExistedProductMinSoldList.map((res) => {
          return {
            _id: res._id._id,
            name: res._id.name,
            sku: res._id.sku,
            category: res._id.category,
            purchasePrice: res._id.purchasePrice,
            salePrice: res._id.salePrice,
            description: res._id.description,
            image: res._id.image,
            color: res._id.color,
            type: res._id.type,
            avalQuantity: res._id.quantity,
            purchasedQuantity: res.quantity,
          };
        });

        res.status(200).json(minSold);
      });
      if (err) {
        res.status(400);
        throw new Error(err);
      }
    }
  );
});

// Expense
const expenseReport = asyncHandler(async (req, res) => {
  const { fromDate, toDate } = req.body;
  const expensesDateWise = await expenseModel.find({
    createdAt: {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    },
  });
  const totalExpensesCount = await expenseModel
    .find({
      createdAt: {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      },
    })
    .count();
  const expensesStatustics = await expenseModel.aggregate([
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
        totalPaid: {
          $sum: "$paid",
        },
      },
    },
  ]);
  const purchaseReport = {
    expenses: expensesDateWise,
    totalExpensesCount,
    expensesStatustics,
  };

  res.status(200).json(purchaseReport);
});

// Loan
const loanReport = asyncHandler(async (req, res) => {
  const { fromDate, toDate } = req.body;
  const loansDateWise = await loanModel.find({
    createdAt: {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    },
  });
  const totalLoansCount = await loanModel
    .find({
      createdAt: {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      },
    })
    .count();
  const LoansStatustics = await loanModel.aggregate([
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
        totalPaid: {
          $sum: "$paid",
        },
        totalRecived: {
          $sum: "$recieved",
        },
      },
    },
  ]);
  const purchaseReport = {
    loans: loansDateWise,
    totalLoansCount,
    LoansStatustics,
  };

  res.status(200).json(purchaseReport);
});
module.exports = {
  purchaseReport,
  purchaseAvaliableStackReport,
  purchaseOutOfStackReport,
  saleReport,
  maximumSoldProductsReport,
  minimumSoldProductsReport,
  expenseReport,
  loanReport,
};
