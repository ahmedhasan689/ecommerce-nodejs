const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const BrandModel = require("../models/brandModel");

/**
 * @desc Get All brands
 * @route GET /api/v1/brands
 * @access Public
 */
exports.getAllBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const brands = await BrandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

/**
 * @desc Create Brand
 * @route POST /api/v1/brands
 * @access Private
 */
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await BrandModel.create({ name: name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

/**
 * @desc Get Specific Brand
 * @route GET /api/v1/brands/:id
 * @access Public
 */
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await BrandModel.findById(id);

  if (!brand) {
    return next(new ApiError(`No brand found with the given ID: ${id}`, 400));
  }

  res.status(200).json({ data: brand });
});

/**
 * @desc Update Specific Brand
 * @route PUT /api/v1/brands/:id
 * @access Private
 */
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await BrandModel.findByIdAndUpdate(
    id,
    { name: name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    return next(new ApiError(`No brand found with the given ID: ${id}`, 400));
  }

  res.status(200).json({ data: brand });
});

/**
 * @desc Delete Specific Brand
 * @route DELETE /api/v1/brands/:id
 * @access Private
 */
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await BrandModel.findByIdAndDelete(id);

  if (!brand) {
    return next(new ApiError(`No brand found with the given ID: ${id}`, 400));
  }

  res.status(200).json({ msg: "Successfully Deleted" });
});
