const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const ApiError = require("../utils/apiError");
const generateToken = require("../utils/createToken");

exports.uploadUserAvatar = uploadSingleImage("user", "users", "avatar");

/**
 * @desc Get All Users
 * @route GET /api/v1/users
 * @access Public
 */
exports.getAllUsers = factory.getAll(User);

/**
 * @desc Create User
 * @route POST /api/v1/users
 * @access Private
 */
exports.createUser = factory.createOne(User);
/**
 * @desc Get Specific User
 * @route GET /api/v1/users/:id
 * @access Public
 */
exports.getUser = factory.getOne(User);

/**
 * @desc Update Specific User
 * @route PUT /api/v1/users/:id
 * @access Private
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      avatar: req.body.avatar,
      email: req.body.email,
      role: req.body.role,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(
      new ApiError(`No document found with the given ID: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ data: document });
});

/**
 * @desc Change password for specific user
 * @route PUT /api/v1/users/changePassword/:id
 * @access Private
 */
exports.changePassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(
      new ApiError(`No document found with the given ID: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ data: document });
});

/**
 * @desc Delete Specific User
 * @route DELETE /api/v1/users/:id
 * @access Private
 */
exports.deleteUser = factory.deleteOne(User);

/**
 * @desc Get Logged User Information
 * @route GET /api/v1/users/getLoggedUser
 * @access Private
 */
exports.getLoggedUserInfo = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

/**
 * @desc Update Logged User Password
 * @route PUT /api/v1/users/updateMyPassword
 * @access Private
 */
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // Generate token
  const token = generateToken(user._id);

  res.status(200).json({ data: user, token });
});

/**
 * @desc Update Logged User Information
 * @route PUT /api/v1/users/updateLoggedUserInfo
 * @access Private
 */
exports.updateLoggedUserInfo = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    },
    {
      new: true,
    }
  );

  res.status(200).json({ data: user });
});

/**
 * @desc Deactive Logged User
 * @route DELETE /api/v1/users/deactiveLoggedUser
 * @access Private
 */
exports.deactiveLoggedUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { active: !req.user.active },
    { new: true }
  );

  res.status(200).json({ msg: req.t("common:success"), data: user });
});
