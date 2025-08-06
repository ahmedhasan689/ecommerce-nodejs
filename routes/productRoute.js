const express = require("express");
const authService = require("../services/authService");
const reviewRoute = require("./reviewRoute");

const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
} = require("../services/productService");

const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const router = express.Router();

// Nested Route
router.use("/:productId/reviews", reviewRoute);

router
  .route("/")
  .get(getAllProducts)
  .post(
    authService.protect,
    authService.allowedTo("manager", "admin"),
    uploadProductImages,
    createProductValidator,
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    authService.protect,
    authService.allowedTo("manager", "admin"),
    updateProductValidator,
    updateProduct
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
