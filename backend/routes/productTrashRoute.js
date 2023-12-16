const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
// product Trash routes
const {
  getTrashList,
  getSingleTrashItem,
  deleteTrashItem,
  EmptyTrash,
} = require("../controllers/productTrashCtr");

router.get("/", protect, getTrashList);
router.get("/:id", protect, getSingleTrashItem);
router.delete("/:id", protect, deleteTrashItem);
router.put("/empty", protect, EmptyTrash);

// sale Trash routes
const {
  getTrashList: saleTrashList,
  getSingleTrashItem: singleSaleTrash,
  deleteTrashItem: deleteSaleTrashItem,
  EmptyTrash: EmptySaleTrash,
} = require("../controllers/saleTrashCtr");

router.get("/sale/", protect, saleTrashList);
router.get("/sale/:id", protect, singleSaleTrash);
router.delete("/sale/:id", protect, deleteSaleTrashItem);
router.put("/sale/empty", protect, EmptySaleTrash);

module.exports = router;
