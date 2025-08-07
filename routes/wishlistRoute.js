const express = require("express");
const authService = require("../services/authService");
const {
  getLoggedUserWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} = require("../services/wishlistService");
const {
  addProductToWishlistValidator,
  removeProductFromWishlistValidator,
} = require("../utils/validators/wishlistValidator");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));

router
  .route("/")
  .get(getLoggedUserWishlist)
  .post(addProductToWishlistValidator, addProductToWishlist)
  .delete(removeProductFromWishlistValidator, removeProductFromWishlist);

module.exports = router;
