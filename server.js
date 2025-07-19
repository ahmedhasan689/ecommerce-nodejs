const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dbConnection = require("./config/database");
const qs = require("qs");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

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

app.set("query parser", (str) =>
  qs.parse(str, {
    allowDots: true,
    depth: 10,
  }),
);
// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);

app.all("/{*any}", (req, res, next) => {
  next(new ApiError(`Cannot Find This Route: ${req.originalUrl}`, 400));
});

// Global Error Handling Middleware
app.use(globalError);

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`App Running Into ${PORT}`);
});

// Handle Rejection Outside Express
process.on("unhandledRejection", (err) => {
  console.log(
    `Unhandled Rejection Error : ${err.name} || message: ${err.message}`,
  );
  server.close(() => {
    process.exit(1);
  });
});
