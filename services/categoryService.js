const { v4: uuid } = require("uuid");
const fs = require("fs");
const multer = require("multer");
const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/categories";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Get Extension
    const extension = file.mimetype.split("/")[1];
    const filename = `category-${uuid()}-${Date.now()}.${extension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: multerStorage });

exports.uploadCategoryImage = upload.single("image");

/**
 * @desc Get All Categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
exports.getAllCategories = factory.getAll(Category);

/**
 * @desc    Get Specific Category
 * @route   GET /api/v1/categories/:id
 * @access  Public
 */
exports.getCategory = factory.getOne(Category);

/**
 * @desc   Create Category
 * @route  POST /api/v1/categories
 * @access Private
 */
exports.createCategory = factory.createOne(Category);

/**
 * @desc   Update Specific category
 * @route  PUT /api/v1/categories/:id
 * @access Private
 */
exports.updateCategory = factory.updateOne(Category);

/**
 * @desc   Delete Specific category
 * @route  Delete /api/v1/categories/:id
 * @access Private
 */
exports.deleteCategory = factory.deleteOne(Category);
