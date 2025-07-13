const CategoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

exports.getAllCategories = (req, res) => {
  res.send();
};

exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const category = await CategoryModel.create({
    name: name,
    slug: slugify(name),
  });
  res.status(201).json({ data: category });
});
