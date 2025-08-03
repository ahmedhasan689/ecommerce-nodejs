const express = require("express");

const {
  register,
  login,
  forgetPassword,
  verifyCode,
  resetPassword,
} = require("../services/authService");
const {
  registerValidator,
  loginValidator,
  forgetPasswordValidator,
} = require("../utils/validators/authValidation");

const router = express.Router();

router.route("/register").post(registerValidator, register);
router.route("/login").post(loginValidator, login);
router.route("/forgetPassword").post(forgetPasswordValidator, forgetPassword);
router.route("/verifyCode").post(verifyCode);
router.route("/resetPassword").put(resetPassword);

module.exports = router;
