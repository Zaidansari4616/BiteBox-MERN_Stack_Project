const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
