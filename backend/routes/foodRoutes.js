const express = require("express");
const {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdminMiddleware");

const router = express.Router();

// PUBLIC
router.get("/", getFoods);

// ADMIN ONLY
router.post("/", protect, isAdmin, createFood);
router.put("/:id", protect, isAdmin, updateFood);
router.delete("/:id", protect, isAdmin, deleteFood);

module.exports = router;
