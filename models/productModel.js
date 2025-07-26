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
  { timestamps: true }
);

// Mongoose Query Middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name slug",
  }).populate({ path: "subcategories", select: "name slug" });
  next();
});

const setImageUrl = (doc) => {
  if (doc.coverImage) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.coverImage}`;
    doc.coverImage = imageUrl;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      const imageUrl = `${process.env.BASE_URL}/products/${image}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};

// Mongoose query For Image [getOne, getAll, update]
productSchema.post("init", (doc) => {
  setImageUrl(doc);
});

// Mongoose query For Image [create]
productSchema.post("save", (doc) => {
  setImageUrl(doc);
});

module.exports = mongoose.model("Product", productSchema);
