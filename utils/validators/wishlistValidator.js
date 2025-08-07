const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const ApiError = require("../apiError");
const Product = require("../../models/productModel");

exports.addProductToWishlistValidator = [
  body("productId")
    .isMongoId()
    .withMessage("Invalid Product ID Format")
    .notEmpty()
    .withMessage("Product Id Required")
    .custom(
      async (value, { req }) =>
        await Product.findById(value).then((product) => {
          if (!product) {
            return Promise.reject(
              new ApiError(req.t("common:product_not_found"))
            );
          }
        })
    ),
  validatorMiddleware,
];

exports.removeProductFromWishlistValidator = [
  body("productId")
    .isMongoId()
    .withMessage("Invalid Product ID Format")
    .notEmpty()
    .withMessage("Product Id Required")
    .custom(
      async (value, { req }) =>
        await Product.findById(value).then((product) => {
          if (!product) {
            return Promise.reject(
              new ApiError(req.t("common:product_not_found"))
            );
          }
          const userWishlist = req.user.wishlist;

          if (!userWishlist.includes(value)) {
            return Promise.reject(
              new ApiError(req.t("common:product_not_found_in_wishlist"))
            );
          }
        })
    ),
  validatorMiddleware,
];
