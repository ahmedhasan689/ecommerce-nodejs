const asyncHandler = require("express-async-handler");
const Coupon = require("../models/couponModel");
const factory = require("./handlersFactory");

/**
 * @desc Get All Coupons
 * @route GET /api/v1/coupons
 * @access Public
 */
exports.getAllCoupons = factory.getAll(Coupon);

/**
 * @desc Create Coupon
 * @route POST /api/v1/coupons
 * @access Private
 */
exports.createCoupon = factory.createOne(Coupon);
/**
 * @desc Get Specific Coupon
 * @route GET /api/v1/coupons/:id
 * @access Public
 */
exports.getCoupon = factory.getOne(Coupon);

/**
 * @desc Update Specific Coupon
 * @route PUT /api/v1/coupons/:id
 * @access Private
 */
exports.updateCoupon = factory.updateOne(Coupon);

/**
 * @desc Delete Specific Coupon
 * @route DELETE /api/v1/coupons/:id
 * @access Private
 */
exports.deleteCoupon = factory.deleteOne(Coupon);
