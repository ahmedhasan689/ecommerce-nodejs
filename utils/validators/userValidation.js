const slugify = require("slugify");
const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

exports.createUserValidator = [
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
  check("avatar").optional(),
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
  check("role").optional().isArray(),

  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User ID Format"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User ID Format"),
  check("name")
    .optional()
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("email")
    .optional()
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
    .optional()
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
  validatorMiddleware,
];

exports.changePasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User ID Format"),
  check("currentPassword")
    .notEmpty()
    .withMessage("Current Password Required")
    .custom(async (value, { req }) => {
      const user = await User.findById(req.params.id);

      if (!user) {
        throw new Error("There is no user for this ID");
      }

      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );

      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password Required")
    .isLength({ min: 6 })
    .withMessage("Too Short Password")
    .isLength({ max: 32 })
    .withMessage("Too Long Password"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirmation Required")
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(
          new Error("Password confirmation does not match the password")
        );
      }
      return true;
    }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User ID Format"),
  validatorMiddleware,
];
