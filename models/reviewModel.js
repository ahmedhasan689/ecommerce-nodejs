const mongoose = require("mongoose");

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

module.exports = mongoose.model("Review", reviewSchema);
