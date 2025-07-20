const Product = require("../models/productModel");
const factory = require("./handlersFactory");

/**
 * @desc Get All Products
 * @route GET /api/v1/products
 * @access Public
 */
exports.getAllProducts = factory.getAll(Product, "Product");

/**
 * @desc Create Product
 * @route POST /api/v1/products
 * @access Private
 */
exports.createProduct = factory.createOne(Product);

/**
 * @desc Get Specific Product
 * @route GET /api/v1/products/:id
 * @access Public
 */
exports.getProduct = factory.getOne(Product);

/**
 * @desc Update Specific Product
 * @route PUT /api/v1/products/:id
 * @access Private
 */
exports.updateProduct = factory.updateOne(Product);

/**
 * @desc Delete Specific Product
 * @route DELETE /api/v1/products/:id
 * @access Private
 */
exports.deleteProduct = factory.deleteOne(Product);
