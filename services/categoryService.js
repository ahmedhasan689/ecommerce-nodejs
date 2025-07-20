const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");

/**
 * @desc Get All Categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
exports.getAllCategories = factory.getAll(Category);

/**
 * @desc    Get Specific Category
 * @route   GET /api/v1/categories/:id
 * @access  Public
 */
exports.getCategory = factory.getOne(Category);

/**
 * @desc   Create Category
 * @route  POST /api/v1/categories
 * @access Private
 */
exports.createCategory = factory.createOne(Category);

/**
 * @desc   Update Specific category
 * @route  PUT /api/v1/categories/:id
 * @access Private
 */
exports.updateCategory = factory.updateOne(Category);

/**
 * @desc   Delete Specific category
 * @route  Delete /api/v1/categories/:id
 * @access Private
 */
exports.deleteCategory = factory.deleteOne(Category);
