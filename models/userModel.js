const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
    },
    phoneNumber: String,
    avatar: String,
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Too short password"],
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.avatar) {
    doc.avatar = `${process.env.BASE_URL}/users/${doc.avatar}`;
  }
};

// Hashing Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Mongoose Middleware Query For Avatar
userSchema.post("init", (doc) => {
  setImageUrl(doc);
});

userSchema.post("save", (doc) => {
  setImageUrl(doc);
});

module.exports = mongoose.model("User", userSchema);
