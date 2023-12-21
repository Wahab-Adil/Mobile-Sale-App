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

router.get("/empty", protect, EmptyTrash);
router.get("/", protect, getTrashList);
router.get("/:id", protect, getSingleTrashItem);
router.delete("/:id", protect, deleteTrashItem);

module.exports = router;
