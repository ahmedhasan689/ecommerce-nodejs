const express = require("express");
const {
  getCategoryValidator,
  createaCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const router = express.Router();

// router.get("/get-all-categories", getAllCategories);
// router.post("/create", createCategory);

router
  .route("/")
  .get(getAllCategories) // Get All Categories
  .post(createaCategoryValidator, createCategory); // Create Category
router
  .route("/:id")
  .get(getCategoryValidator, getCategory) // Get Specific Category
  .put(updateCategoryValidator, updateCategory) // Update Specific Category
  .delete(deleteCategoryValidator, deleteCategory); // Delete Specific Category

module.exports = router;
