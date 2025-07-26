const express = require("express");

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
  .post(uploadCategoryImage, createCategoryValidator, createCategory); // Create Category
router
  .route("/:id")
  .get(getCategoryValidator, getCategory) // Get Specific Category
  .put(uploadCategoryImage, updateCategoryValidator, updateCategory) // Update Specific Category
  .delete(deleteCategoryValidator, deleteCategory); // Delete Specific Category

module.exports = router;
