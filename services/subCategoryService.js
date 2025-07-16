const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const SubCategoryModel = require("../models/subCategoryModel");

/**
 * @desc Get All SubCategories
 * @route Get /api/v1/subcategories
 * @access Public
 */
exports.getAllSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const subcategories = await SubCategoryModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ results: subcategories.length, page, data: subcategories });
});

/**
 * @desc Get Specific SubCategory
 * @route GET /api/v1/subcategories/:id
 * @access Public
 */
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategoryModel.findById(id);

  if (!subCategory) {
    return next(
      new ApiError(`No SubCategory found with the given ID: ${id}`, 404)
    );
  }

  res.status(200).json({ data: subCategory });
});

/**
 * @desc Create SubCategory
 * @route POST /api/v1/subcategories
 * @access Private
 */
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subCategory = await SubCategoryModel.create({
    name: name,
    slug: slugify(name),
    category: category,
  });

  res.status(201).json({ data: subCategory });
});

/**
 * @desc Update Specific SubCategory
 * @route PUT /api/v1/subcategories/:id
 * @access Private
 */
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategoryModel.findByIdAndUpdate(
    id,
    {
      name: name,
      slug: slugify(name),
      category: category,
    },
    { new: true }
  );

  if (!subCategory) {
    return next(
      new ApiError(`No SubCategory found with the given ID: ${id}`, 404)
    );
  }

  res.status(200).json({ data: subCategory });
});

/**
 * @desc Delete Specific SubCategory
 * @route Delete /api/v1/subcategories/:id
 * @access Private
 */
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategoryModel.findByIdAndDelete(id);

  if (!subCategory) {
    return next(
      new ApiError(`No SubCategory found with the given ID: ${id}`, 404)
    );
  }

  res.status(200).json({ msg: "Successfully Deleted" });
});
