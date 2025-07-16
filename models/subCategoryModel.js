const mongoose = require("mongoose");

// Schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "SubCategory Name Required"],
      unique: [true, "SubCategory Name Must Be Unique"],
      minLength: [2, "Too Short SubCategory Name"],
      maxLength: [32, "Too Long SubCategory Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belongs to parent category"],
    },
  },
  { timestamps: true }
);

// Model
const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategoryModel;
