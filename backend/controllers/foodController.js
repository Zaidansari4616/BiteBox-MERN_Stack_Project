const Food = require("../models/Food");

/* GET ALL FOODS */
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CREATE FOOD (admin later) */
exports.createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* UPDATE FOOD */
exports.updateFood = async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "Name, price and category are required" });
    }

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        category,
        image,
        description,
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json(updatedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


/* DELETE FOOD */
exports.deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
