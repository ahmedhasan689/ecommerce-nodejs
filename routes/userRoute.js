const express = require("express");
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
  .get(getAllUsers)
  .post(uploadUserAvatar, createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserAvatar, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

router
  .route("/changePassword/:id")
  .put(changePasswordValidator, changePassword);

module.exports = router;
