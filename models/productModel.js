const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Required"],
      trim: true,
      minLength: [3, "Too Short Product Title"],
      maxLength: [100, "Too Long Product Title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
      minLength: [20, "Too Short Product Description"],
      maxLength: [2000, "Too Long Product Title"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [200000, "Too Long Product Price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    color: [String],
    coverImage: {
      type: String,
      required: [true, "Product Cover Image is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Mongoose Query Middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name slug",
  }).populate({ path: "subcategories", select: "name slug" });
  next();
});

module.exports = mongoose.model("Product", productSchema);
