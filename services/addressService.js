const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/**
 * @desc Get Logged User Adresses
 * @route GET /api/v1/addresses
 * @access Private
 */
exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: "addresses",
    select: "_id alias details city postalCode",
  });

  res.status(200).json({
    status: "success",
    msg: req.t("common:success_fetched"),
    data: user.addresses,
  });
});

/**
 * @desc Create Address
 * @route POST /api/v1/addresses
 * @access Private
 */
exports.createAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    msg: req.t("common:success_created"),
    data: user.addresses,
  });
});

/**
 * @desc Delete Address
 * @route DELETE /api/v1/addresses/:id
 * @access Private
 */
exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.body.addressId } },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    msg: req.t("common:success_deleted"),
    data: user.addresses,
  });
});
