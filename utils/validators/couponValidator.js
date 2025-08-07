const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCouponValidator = [
  param("id").isMongoId().withMessage("Invalid Coupon ID"),
  validatorMiddleware,
];

exports.createCouponValidator = [
  body("name").notEmpty().withMessage("Name Required"),
  body("expiredAt")
    .notEmpty()
    .withMessage("Expired time required")
    .isDate()
    .withMessage("Expired time must be date"),
  body("discount")
    .notEmpty()
    .withMessage("Discount value required")
    .isInt()
    .withMessage("Discount value must be number"),
  validatorMiddleware,
];

exports.updateCouponValidator = [
  param("id").isMongoId().withMessage("Invalid Coupon ID"),
  validatorMiddleware,
];

exports.deleteCouponValidator = [
  param("id").isMongoId().withMessage("Invalid Coupon ID"),
  validatorMiddleware,
];
