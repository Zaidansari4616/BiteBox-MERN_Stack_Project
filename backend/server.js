const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // 🔥 ALLOW COOKIES
  })
);

/* ROUTES */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/foods", require("./routes/foodRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Backend running");
});

/* DB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
