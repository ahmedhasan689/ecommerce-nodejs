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

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};

// Mongoose query For Image [getOne, getAll, update]
brandSchema.post("init", (doc) => {
  setImageUrl(doc);
});

// Mongoose query For Image [create]
brandSchema.post("save", (doc) => {
  setImageUrl(doc);
});

const brandModel = mongoose.model("Brand", brandSchema);

module.exports = brandModel;
