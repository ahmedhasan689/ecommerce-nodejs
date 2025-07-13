const express = require("express");

const {
  getAllCategories,
  createCategory,
} = require("../services/categoryService");

const router = express.Router();

router.get("/get-all-categories", getAllCategories);
router.post("/create", createCategory);
// router.route('/').get(getAllCategories).post(createCategory);

module.exports = router;
