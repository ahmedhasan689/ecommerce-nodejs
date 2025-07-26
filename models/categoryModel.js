const mongoose = require("mongoose");

// Schema
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

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};

// Mongoose query For Image [getOne, getAll, update]
categorySchema.post("init", (doc) => {
  setImageUrl(doc);
});

// Mongoose query For Image [create]
categorySchema.post("save", (doc) => {
  setImageUrl(doc);
});

// Model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
