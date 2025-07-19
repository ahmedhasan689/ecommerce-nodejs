const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const Product = require("../models/productModel");

/**
 * @desc Get All Products
 * @route GET /api/v1/products
 * @access Public
 */
exports.getAllProducts = asyncHandler(async (req, res) => {
  // Build Query
  const countDocuments = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .paginate(countDocuments)
    .filter()
    .sort()
    .limitFields()
    .search();
  // .populate({ path: "category", select: "name slug" });

  // Execute Query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;

  res.status(200).json({
    results: products.length,
    pagination: paginationResult,
    data: products,
  });
});

/**
 * @desc Create Product
 * @route POST /api/v1/products
 * @access Private
 */
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

/**
 * @desc Get Specific Product
 * @route GET /api/v1/products/:id
 * @access Public
 */
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate({
    path: "category",
    select: "name slug",
  });

  if (!product) {
    return next(new ApiError(`No product found with the given ID: ${id}`, 404));
  }

  res.status(200).json({ data: product });
});

/**
 * @desc Update Specific Product
 * @route PUT /api/v1/products/:id
 * @access Private
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product found with the given ID: ${id}`, 404));
  }

  res.status(200).json({ data: product });
});

/**
 * @desc Delete Specific Product
 * @route DELETE /api/v1/products/:id
 * @access Private
 */
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id, req.body);
  if (!product) {
    return next(new ApiError(`No product found with the given ID: ${id}`, 404));
  }

  res.status(200).json({ msg: "Successfully Deleted" });
});
