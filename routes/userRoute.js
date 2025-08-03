const express = require("express");
const authService = require("../services/authService");

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
  uploadUserAvatar,
} = require("../services/userService");

const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changePasswordValidator,
} = require("../utils/validators/userValidation");

const router = express.Router();

router
  .route("/")
  .get(authService.protect, authService.allowedTo("admin"), getAllUsers)
  .post(
    authService.protect,
    authService.allowedTo("admin"),
    uploadUserAvatar,
    createUserValidator,
    createUser
  );
router
  .route("/:id")
  .get(
    authService.protect,
    authService.allowedTo("admin"),
    getUserValidator,
    getUser
  )
  .put(
    authService.protect,
    authService.allowedTo("admin"),
    uploadUserAvatar,
    updateUserValidator,
    updateUser
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteUserValidator,
    deleteUser
  );

router
  .route("/changePassword/:id")
  .put(changePasswordValidator, changePassword);

module.exports = router;
