const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const isAdmin = require("../middleware/isAdminMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");


router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.get("/admin", protect, isAdmin, getAllOrders);
router.patch("/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;
