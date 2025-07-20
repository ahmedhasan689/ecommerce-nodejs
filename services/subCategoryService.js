const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

/**
 * @desc Middleware To Set Category ID Before Validation
 */
exports.setCategoryIdToBody = (req, res, next) => {
  // Nested Route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

/**
 * @desc Get All SubCategories
 * @route Get /api/v1/subcategories
 * @access Public
 */
exports.getAllSubCategories = factory.getAll(SubCategory);

/**
 * @desc Get Specific SubCategory
 * @route GET /api/v1/subcategories/:id
 * @access Public
 */
exports.getSubCategory = factory.getOne(SubCategory);

/**
 * @desc Create SubCategory
 * @route POST /api/v1/subcategories
 * @access Private
 */
exports.createSubCategory = factory.createOne(SubCategory);

/**
 * @desc Update Specific SubCategory
 * @route PUT /api/v1/subcategories/:id
 * @access Private
 */
exports.updateSubCategory = factory.updateOne(SubCategory);

/**
 * @desc Delete Specific SubCategory
 * @route Delete /api/v1/subcategories/:id
 * @access Private
 */
exports.deleteSubCategory = factory.deleteOne(SubCategory);
