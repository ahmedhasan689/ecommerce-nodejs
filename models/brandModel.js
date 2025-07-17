const mongoose = require("mongoose");

// Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Required"],
      unique: [true, "Brand Name Must Be Unique"],
      minLength: [3, "Too Short Brand Name"],
      maxLength: [32, "Too Long Brand Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const brandModel = mongoose.model("Brand", brandSchema);

module.exports = brandModel;
