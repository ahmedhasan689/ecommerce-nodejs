const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/**
 * @desc Get Logged User wishlist
 * @route GET /api/v1/wishlists
 * @access Private
 */
exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: "wishlist",
    select: "_id title",
  });

  res.status(200).json({
    status: "success",
    msg: req.t("common:success_fetched"),
    data: user.wishlist,
  });
});

/**
 * @desc Add product to wishlist
 * @route POST /api/v1/wishlists
 * @access Private
 */
exports.addProductToWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    msg: req.t("common:successfully_added_wishlist"),
    data: user.wishlist,
  });
});

/**
 * @desc Remove product to wishlist
 * @route DELETE /api/v1/wishlists
 * @access Private
 */
exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: req.body.productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    msg: req.t("common:successfully_removed_wishlist"),
    data: user.wishlist,
  });
});
