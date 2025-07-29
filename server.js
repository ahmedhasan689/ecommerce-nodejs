const express = require("express");
const path = require("path");
const qs = require("qs");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dbConnection = require("./config/database");
const localizationRoute = require("./routes/localizationRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const i18nextMiddleware = require("i18next-http-middleware");
const i18n = require("./locales");

dotenv.config({ path: "config.env" });

// Connect With DB
dbConnection();

// Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(i18nextMiddleware.handle(i18n));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.set("query parser", (str) =>
  qs.parse(str, {
    allowDots: true,
    depth: 10,
  })
);

// Mount Routes
app.use("/api/v1/", localizationRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

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
    `Unhandled Rejection Error : ${err.name} || message: ${err.message}`
  );
  server.close(() => {
    process.exit(1);
  });
});
