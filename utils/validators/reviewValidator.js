const { body, check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Review = require("../../models/reviewModel");

exports.createReviewValidator = [
  body("title").optional(),
  body("rating")
    .notEmpty()
    .withMessage("Rating required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating value must be between 1 to 5"),
  body("user").isMongoId().notEmpty().withMessage("User required"),
  body("product")
    .isMongoId()
    .notEmpty()
    .withMessage("Product required")
    .custom((value, { req }) =>
      Review.findOne({
        product: value,
        user: req.user._id,
      }).then((review) => {
        if (review) {
          return Promise.reject(
            new Error(`You already created a review before`)
          );
        }
      })
    ),
  validatorMiddleware,
];

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review ID Format"),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review ID Format")
    .custom((value, { req }) =>
      Review.findById(value).then((review) => {
        if (!review) {
          return Promise.reject(new Error("Review not found"));
        }

        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error("You are not allowed to perform this action")
          );
        }
      })
    ),
  body("title").optional(),
  body("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating value must be between 1 to 5"),
  body("user").isMongoId().optional(),
  body("product").isMongoId().optional(),

  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review ID Format")
    .custom((value, { req }) => {
      if (req.user.role === "user") {
        Review.findById(value).then((review) => {
          if (!review) {
            return Promise.reject(new Error("Review not found"));
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error("You are not allowed to perform this action")
            );
          }
        });
      }
    }),
  validatorMiddleware,
];
