const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");

/**
 * @desc Get All brands
 * @route GET /api/v1/brands
 * @access Public
 */
exports.getAllBrands = factory.getAll(Brand);

/**
 * @desc Create Brand
 * @route POST /api/v1/brands
 * @access Private
 */
exports.createBrand = factory.createOne(Brand);
/**
 * @desc Get Specific Brand
 * @route GET /api/v1/brands/:id
 * @access Public
 */
exports.getBrand = factory.getOne(Brand);

/**
 * @desc Update Specific Brand
 * @route PUT /api/v1/brands/:id
 * @access Private
 */
exports.updateBrand = factory.updateOne(Brand);

/**
 * @desc Delete Specific Brand
 * @route DELETE /api/v1/brands/:id
 * @access Private
 */
exports.deleteBrand = factory.deleteOne(Brand);
