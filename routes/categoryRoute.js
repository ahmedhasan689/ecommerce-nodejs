const express = require("express");
const authService = require("../services/authService");

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
} = require("../services/categoryService");

const router = express.Router();
const subCategoryRoute = require("./subCategoryRoute");

// router.get("/get-all-categories", getAllCategories);
// router.post("/create", createCategory);

router.use("/:categoryId/subcategories", subCategoryRoute);

router
  .route("/")
  .get(getAllCategories) // Get All Categories
  .post(
    authService.protect,
    authService.allowedTo("manager", "admin"),
    uploadCategoryImage,
    createCategoryValidator,
    createCategory
  ); // Create Category
router
  .route("/:id")
  .get(getCategoryValidator, getCategory) // Get Specific Category
  .put(
    authService.protect,
    authService.allowedTo("manager", "admin"),
    uploadCategoryImage,
    updateCategoryValidator,
    updateCategory
  ) // Update Specific Category
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteCategoryValidator,
    deleteCategory
  ); // Delete Specific Category

module.exports = router;
