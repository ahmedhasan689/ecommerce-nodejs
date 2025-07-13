const Category = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

/**
 * @desc Create Category
 * @route   GET /api/v1/categories
 * @access  Public
 */
exports.getAllCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

/**
 * @desc    Get Specific Category
 * @route   GET /api/v1/categories/:id
 * @access  Public
 */
exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    res.status(404).json({ msg: `No category found with the given ID: ${id}` });
  }

  res.status(200).json({ data: category });
});

/**
 * @desc   Create Category
 * @route  POST /api/v1/categories
 * @access Private
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const category = await Category.create({
    name: name,
    slug: slugify(name),
  });
  res.status(201).json({ data: category });
});

/**
 * @desc   Update Specific category
 * @route  PUT /api/v1/categories/:id
 * @access Private
 */
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const name = req.body.name;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    {
      name: name,
      slug: slugify(name),
    },
    { new: true }
  );

  if (!category) {
    res.status(404).json({ msg: `No category found with the given ID: ${id}` });
  }

  res.status(200).json({ data: category });
});

/**
 * @desc   Delete Specific category
 * @route  Delete /api/v1/categories/:id
 * @access Private
 */
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findOneAndDelete({ _id: id }); // OR findByIdAndDelete(id);

  if (!category) {
    res.status(404).json({ msg: `No category found with the given ID: ${id}` });
  }

  res.status(200).json({ msg: "Successfully Deleted" });
});
