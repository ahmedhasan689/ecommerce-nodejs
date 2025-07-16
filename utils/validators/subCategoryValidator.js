const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const ApiError = require("../apiError");
const CategoryModel = require("../../models/categoryModel");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID Format!"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name Required")
    .isLength({ min: 2 })
    .withMessage("Too Short SubCategory Name")
    .isLength({ max: 32 })
    .withMessage("Too Long SubCategory Name"),
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid Category ID Format")
    .custom(async (value) => {
      const category = await CategoryModel.findById(value);
      if (!category) {
        return Promise.reject(new ApiError("Category Not Found", 404));
      }
    }),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name Required")
    .isLength({ min: 2 })
    .withMessage("Too Short SubCategory Name")
    .isLength({ max: 32 })
    .withMessage("Too Long SubCategory Name"),
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid Category ID Format")
    .custom(async (value) => {
      const category = await CategoryModel.findById(value);
      if (!category) {
        return Promise.reject(new ApiError("Category Not Found", 404));
      }
    }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID Format!"),
  validatorMiddleware,
];
