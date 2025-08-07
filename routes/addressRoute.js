const express = require("express");
const authService = require("../services/authService");
const {
  getLoggedUserAddresses,
  createAddress,
  deleteAddress,
} = require("../services/addressService");

const {
  createAddressValidator,
  deleteAddressValidator,
} = require("../utils/validators/addressValidator");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));

router
  .route("/")
  .get(getLoggedUserAddresses)
  .post(createAddressValidator, createAddress)
  .delete(deleteAddressValidator, deleteAddress);

module.exports = router;
