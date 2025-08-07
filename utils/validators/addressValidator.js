const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const ApiError = require("../apiError");
const User = require("../../models/userModel");

exports.createAddressValidator = [
  body("alias").notEmpty().withMessage("Alias required"),
  body("details").notEmpty().withMessage("Details required"),
  body("city").notEmpty().withMessage("City required"),
  body("postalCode").notEmpty().withMessage("Postal code required"),
  validatorMiddleware,
];

exports.deleteAddressValidator = [
  body("addressId")
    .isMongoId()
    .withMessage("Invalid Address ID")
    .notEmpty()
    .withMessage("Address ID required")
    .custom(async (value, { req }) => {
      await User.findById(req.user._id).then((user) => {
        const addressesArr = user.addresses;
        const exists = addressesArr.some(
          (address) => address._id.toString() === value
        );
        if (!exists) {
          return Promise.reject(
            new ApiError(req.t("common:address_not_found"))
          );
        }
      });
    }),
  validatorMiddleware,
];
