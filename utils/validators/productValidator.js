const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product ID Format"),
  validatorMiddleware,
];

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Title Required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("Title must be at most 100 characters"),

  check("description")
    .notEmpty()
    .withMessage("Description Required")
    .isLength({ min: 20 })
    .withMessage("Description must be at least 3 characters")
    .isLength({ max: 2000 })
    .withMessage("Description must be at most 2000 characters"),

  check("quantity")
    .notEmpty()
    .withMessage("Quantity Required")
    .isNumeric()
    .withMessage("Quantity must be a valid number"),

  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Sold must be a valid number"),

  check("price")
    .notEmpty()
    .withMessage("Price Required")
    .isNumeric()
    .withMessage("Price must be a valid number")
    .isLength({ max: 20 })
    .withMessage("Too Long Product Price"),

  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Price after discount must be a valid number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("Price After Discount must be lower than price");
      }
      return true;
    }),

  check("colors").optional().isArray().withMessage("Colors must be array"),

  check("coverImage").notEmpty().withMessage("Cover Image Required"),

  check("images").optional().isArray().withMessage("Images must be array"),

  check("category")
    .notEmpty()
    .withMessage("Category ID Required")
    .isMongoId()
    .withMessage("Invalid Category ID Format")
    .custom((value) =>
      Category.findById(value).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category found with the given ID: ${value}`),
          );
        }
      }),
    ),

  check("subcategories")
    .optional()
    .isArray()
    .withMessage("Subcategory must be array")
    .isMongoId()
    .withMessage("Invalid Subcategory ID Format")
    .custom((value) =>
      SubCategory.find({ _id: { $exists: true, $in: value } }).then(
        (result) => {
          if (result.length < 1 || result.length !== value.length) {
            return Promise.reject(new Error("Invalid Subcategory ID"));
          }
        },
      ),
    )
    .custom(async (value, { req }) => {
      await SubCategory.find({ category: req.body.category }).then((result) => {
        const subCategoriesIds = [];
        result.forEach((item) => {
          subCategoriesIds.push(item._id.toString());
        });

        const arrayContainsAll = (target, arr) =>
          target.every((val) => arr.includes(val));

        if (!arrayContainsAll(value, subCategoriesIds)) {
          return Promise.reject(
            new Error("Subcategory Not Belong To Category"),
          );
        }
        return true;
      });
    }),

  check("brand").optional().isMongoId().withMessage("Invalid Brand ID Format"),

  check("ratingsAverage")
    .isNumeric()
    .withMessage("Ratings Average must be a valid number")
    .isLength({ min: 1 })
    .withMessage("Ratings Average must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),

  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Ratings Quantity must be a valid number"),

  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product ID Format"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product ID Format"),
  validatorMiddleware,
];
