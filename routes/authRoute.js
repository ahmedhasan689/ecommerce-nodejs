const express = require("express");

const { register, login } = require("../services/authService");
const {
  registerValidator,
  loginValidator,
} = require("../utils/validators/authValidation");

const router = express.Router();

router.route("/register").post(registerValidator, register);
router.route("/login").post(loginValidator, login);

module.exports = router;
