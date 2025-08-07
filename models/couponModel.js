const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name required"],
      unique: [true, "Name must be unique"],
    },
    expiredAt: {
      type: Date,
      required: [true, "Expired time required"],
    },
    discount: {
      type: Number,
      required: [true, "Discount required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
