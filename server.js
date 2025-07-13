const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");

dotenv.config({ path: "config.env" });

// Connect With DB
dbConnection();

// Express App
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/categories", categoryRoute);

app.get("/", (req, res) => {
  res.send("My First Project In NodeJs");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App Running Into ${PORT}`);
});
