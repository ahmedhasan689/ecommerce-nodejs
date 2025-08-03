const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

const generateToken = (payload) => {
  const token = jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  return token;
};

/**
 * @desc register
 * @route POST /api/v1/auth/register
 * @access PUBLIC
 */
exports.register = asyncHandler(async (req, res, next) => {
  // Create User
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
  });

  // Generate Token
  const token = generateToken(user._id);

  // Return Response
  res
    .status(201)
    .json({ msg: req.t("auth:success_register"), data: user, token: token });
});

/**
 * @desc login
 * @route POST /api/v1/auth/login
 * @access PUBLIC
 */
exports.login = asyncHandler(async (req, res, next) => {
  // Get User
  const user = await User.findOne({ email: req.body.email });

  // Check User if not exists || password not correct
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError(req.t("auth:invalid_credentials")), 401);
  }

  // Generate Token
  const token = generateToken(user._id);

  res.status(200).json({
    msg: req.t("auth:login_success"),
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token: token,
  });
});

/**
 * @desc Protect routes by authentication
 */
exports.protect = asyncHandler(async (req, res, next) => {
  // Get Token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError(req.t("auth:auth_failed"), 401));
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Get userId & Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(new ApiError(req.t("auth:user_not_found"), 401));
  }

  // Check password changed at for user
  if (currentUser.passwordChangedAt) {
    const formattedPasswordChangedAt = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );

    // Password Changed After Token Created
    if (formattedPasswordChangedAt > decoded.iat) {
      return next(new ApiError(req.t("auth:session_expired"), 401));
    }
  }

  req.user = currentUser;
  next();
});

/**
 * @desc Check Permissions of auth user
 * @param  {...any} roles
 * @returns
 */
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(req.t("auth:invalid_role"), 403));
    }
    next();
  });
