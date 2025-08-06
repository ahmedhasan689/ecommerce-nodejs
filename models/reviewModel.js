const mongoose = require("mongoose");
const Product = require("./productModel");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    rating: {
      type: Number,
      required: [true, "Rating required"],
      min: [1, "Min rating value is 1.0"],
      max: [5, "Max rating value is 5.0"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to user"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to product"],
    },
  },
  { timestamps: true }
);

// Populate User
reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "_id name email phoneNumber avatar" });
  next();
});

// Aggregations
reviewSchema.statics.calcAverageRatingAndQuantity = async function (productId) {
  const result = await this.aggregate([
    // Stage One => Matching => Get All Reviews by productId
    {
      $match: { product: productId },
    },
    // Stage Two => Grouping
    {
      $group: {
        _id: "product",
        avgRatings: {
          $avg: "$rating",
        },
        ratingQty: {
          $sum: 1,
        },
      },
    },
  ]);

  console.log(result);

  if (result.length > 0) {
    await Product.findByIdAndUpdate(
      productId,
      {
        ratingsAverage: result[0].avgRatings,
        ratingsQuantity: result[0].ratingQty,
      },
      { new: true }
    );
  } else {
    await Product.findByIdAndUpdate(
      productId,
      {
        ratingsAverage: 0,
        ratingsQuantity: 0,
      },
      { new: true }
    );
  }
};

// POST
reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatingAndQuantity(this.product);
});

reviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await this.constructor.calcAverageRatingAndQuantity(this.product);
  }
);

module.exports = mongoose.model("Review", reviewSchema);
