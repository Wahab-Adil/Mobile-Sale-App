const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
// sale Trash routes
const {
  getTrashList,
  getSingleTrashItem,
  deleteTrashItem,
  EmptyTrash,
} = require("../controllers/saleTrashCtr");

router.get("/", getTrashList);
router.get("/:id", protect, getSingleTrashItem);
router.delete("/:id", protect, deleteTrashItem);
router.put("/empty", protect, EmptyTrash);

module.exports = router;
