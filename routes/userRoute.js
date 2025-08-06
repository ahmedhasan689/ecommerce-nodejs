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
  getLoggedUserInfo,
  updateLoggedUserPassword,
  updateLoggedUserInfo,
  deactiveLoggedUser,
} = require("../services/userService");

const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changePasswordValidator,
  changeLoggedUserPasswordValidator,
  updateLoggedUserValidator,
} = require("../utils/validators/userValidation");

const router = express.Router();

// Get Logged User Information
router.use(authService.protect);

router.get("/getLoggedUser", getLoggedUserInfo, getUser);
router.put(
  "/updateLoggedUserPassword",
  changeLoggedUserPasswordValidator,
  updateLoggedUserPassword
);
router.put(
  "/updateLoggedUserInfo",
  updateLoggedUserValidator,
  updateLoggedUserInfo
);
router.delete("/deactiveLoggedUser", deactiveLoggedUser);

/**
 * ? Routes For Admin
 */
router.use(authService.allowedTo("admin"));

router
  .route("/")
  .get(getAllUsers)
  .post(uploadUserAvatar, createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserAvatar, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

router.put("/changePassword/:id", changePasswordValidator, changePassword);

module.exports = router;
