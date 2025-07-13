const CategoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// @desc    Create Category
// @route   GET /api/v1/categories/get-all-categories
// @access  Public
exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryModel.find({});
  res.status(200).json({ results: categories.length, data: categories });
});

// @desc    Create Category
// @route   POST /api/v1/categories/create
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const category = await CategoryModel.create({
    name: name,
    slug: slugify(name),
  });
  res.status(201).json({ data: category });
});
