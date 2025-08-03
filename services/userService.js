const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const ApiError = require("../utils/apiError");

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
