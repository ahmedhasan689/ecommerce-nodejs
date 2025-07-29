const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");

exports.registerValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name Required")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email Required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      await User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email already exists"));
        }
        return true;
      });
    }),
  check("phoneNumber")
    .notEmpty()
    .withMessage("Phone Number Required")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid Phone Number")
    .custom(async (value) => {
      await User.findOne({ phoneNumber: value }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Phone Number already exists"));
        }
        return true;
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("Password Required")
    .isLength({ min: 6 })
    .withMessage("Too Short Password")
    .isLength({ max: 32 })
    .withMessage("Too Long Password")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        return Promise.reject(new Error("Password Confirmation incorrect"));
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirmation Required"),

  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email Required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password Required")
    .isLength({ min: 6 })
    .withMessage("Too Short Password")
    .isLength({ max: 32 })
    .withMessage("Too Long Password"),

  validatorMiddleware,
];
