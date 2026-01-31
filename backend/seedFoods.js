require("dotenv").config();
const mongoose = require("mongoose");
const Food = require("./models/Food");

const foodData = [
  {
    name: "Royale Burger",
    image: "/src/assets/food_1.jpg",
    price: 249,
    description:
      "A juicy flame-grilled chicken patty layered with fresh lettuce, roma tomatoes, and creamy house mayo, served inside a soft toasted brioche bun.",
    category: "Burger",
  },
  {
    name: "Ultimate Lava Cheese Burger",
    image: "/src/assets/food_2.jpg",
    price: 299,
    description:
      "Overflowing molten cheddar melts over a crispy chicken, topped with smoky seasoning and crunchy veggies for a rich, indulgent cheese experience.",
    category: "Burger",
  },
  {
    name: "Double Crunch Burger",
    image: "/src/assets/food_3.jpg",
    price: 349,
    description:
      "Two crispy chicken patties stacked with melted cheese, tangy signature sauce, and fresh toppings—crafted for true heavy-hunger champions.",
    category: "Burger",
  },
  {
    name: "Classic Chicken Burger",
    image: "/src/assets/food_4.png",
    price: 199,
    description:
      "Simple, clean flavors: tender chicken patty, crisp lettuce, juicy tomato, and light mayo, served in a golden sesame bun for an everyday satisfying bite.",
    category: "Burger",
  },
  {
    name: "Cheesy Lasagna Roll",
    image: "/src/assets/food_5.png",
    price: 159,
    description:
      "Soft sheets rolled with rich cheese and filling, baked for a perfect Italian-style bite.",
    category: "Rolls",
  },
  {
    name: "Peri-Peri Fiery Chicken Roll",
    image: "/src/assets/food_6.png",
    price: 139,
    description:
      "Spicy peri-peri seasoned chicken wrapped with fresh veggies for a bold, zesty flavor punch.",
    category: "Rolls",
  },
  {
    name: "Classic Chicken Tikka Roll",
    image: "/src/assets/food_7.png",
    price: 189,
    description:
      "Tender chicken tikka, fresh onions, and mint mayo wrapped in a warm flaky paratha.",
    category: "Rolls",
  },
  {
    name: "Veggie Supreme Roll",
    image: "/src/assets/food_8.png",
    price: 129,
    description:
      "A wholesome mix of spiced vegetables, crunchy salad, and creamy mayo in a soft wrap.",
    category: "Rolls",
  },
  {
    name: "Veggie Loaded Pizza",
    image: "/src/assets/food_9.png",
    price: 229,
    description:
      "Crispy base topped with fresh veggies and melted cheese.",
    category: "Pizza",
  },
  {
    name: "Chicken Tikka Pizza",
    image: "/src/assets/food_10.png",
    price: 299,
    description:
      "Bold chicken tikka with smoky spices and creamy cheese.",
    category: "Pizza",
  },
  {
    name: "Pepperoni Pizza",
    image: "/src/assets/food_11.png",
    price: 279,
    description:
      "A classic, cheesy pizza topped with perfectly crisp pepperoni slices.",
    category: "Pizza",
  },
  {
    name: "Farmhouse Mix Pizza",
    image: "/src/assets/food_12.jpg",
    price: 249,
    description:
      "A tasty combo of tomato, mint leaves, capsicum, and onions.",
    category: "Pizza",
  },
  {
    name: "Chicken Stacker Sandwich",
    image: "/src/assets/food_13.png",
    price: 149,
    description:
      "Layered chicken with creamy mayo inside soft toasted bread.",
    category: "Sandwich",
  },
  {
    name: "Veggie Layer Sandwich",
    image: "/src/assets/food_14.png",
    price: 119,
    description:
      "A fresh mix of fresh veggies with a light, flavorful spread.",
    category: "Sandwich",
  },
  {
    name: "Cheese Melt Sandwich",
    image: "/src/assets/food_15.png",
    price: 159,
    description:
      "A soft, warm sandwich filled with melted cheese.",
    category: "Sandwich",
  },
  {
    name: "Bread Sandwich",
    image: "/src/assets/food_16.png",
    price: 139,
    description:
      "Simple bread sandwich filled with smooth mayo.",
    category: "Sandwich",
  },
  {
    name: "Cheesy Pasta",
    image: "/src/assets/food_17.png",
    price: 159,
    description:
      "Rich, creamy cheese sauce tossed with soft pasta.",
    category: "Pasta",
  },
  {
    name: "Tangy Tomato Pasta",
    image: "/src/assets/food_18.png",
    price: 149,
    description:
      "Pasta cooked in a fresh tomato base with herbs.",
    category: "Pasta",
  },
  {
    name: "Creamy White Sauce Pasta",
    image: "/src/assets/food_19.png",
    price: 169,
    description:
      "A silky white sauce pasta blended with herbs.",
    category: "Pasta",
  },
  {
    name: "Chicken Penne Pasta",
    image: "/src/assets/food_20.png",
    price: 199,
    description:
      "Tender chicken pieces mixed in a creamy sauce.",
    category: "Pasta",
  },
  {
    name: "Butter Tossed Noodles",
    image: "/src/assets/food_21.png",
    price: 129,
    description:
      "Soft noodles lightly tossed in butter.",
    category: "Noodles",
  },
  {
    name: "Mixed Veg Noodles",
    image: "/src/assets/food_22.png",
    price: 119,
    description:
      "Classic stir-fried noodles loaded with veggies.",
    category: "Noodles",
  },
  {
    name: "Soft Somen Bowl",
    image: "/src/assets/food_23.png",
    price: 179,
    description:
      "Light, delicate noodles with mild flavor.",
    category: "Noodles",
  },
  {
    name: "Plain Stir Noodles",
    image: "/src/assets/food_24.png",
    price: 139,
    description:
      "Simple stir-cooked noodles with gentle seasoning.",
    category: "Noodles",
  },
];

async function seedFoods() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Food.deleteMany();
    await Food.insertMany(foodData);

    console.log("✅ Food data inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting food data:", error);
    process.exit(1);
  }
}

seedFoods();
