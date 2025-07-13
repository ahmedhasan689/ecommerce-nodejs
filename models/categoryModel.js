const mongoose = require("mongoose");

// Shcema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name Required"],
      unique: [true, "Category Name Must Be Unique"],
      minLength: [3, "Too Short Catagory Name"],
      maxLength: [32, "Too Long Category Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

// Model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
