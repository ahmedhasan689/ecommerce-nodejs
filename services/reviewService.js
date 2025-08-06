const Review = require("../models/reviewModel");
const factory = require("./handlersFactory");

/**
 * @desc [ nested route ] Middleware To Set Category ID Before Validation
 */
exports.setProductIdToBody = (req, res, next) => {
  // Nested Route
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

/**
 * @desc nested route
 * @route /api/v1/products/:productId/reviews
 * @access Public
 */
exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

/**
 * @desc Get All Reviews
 * @route GET /api/v1/reviews
 * @access PUBLIC
 */
exports.getAllReviews = factory.getAll(Review);

/**
 * @desc Create review
 * @route POST /api/v1/reviews
 * @access Private / Protect => [ user ]
 */
exports.createReview = factory.createOne(Review);

/**
 * @desc Get specific review
 * @route GET /api/v1/reviews/:id
 * @access PUBLIC
 */
exports.getReview = factory.getOne(Review);

/**
 * @desc Update Specific Review
 * @route PUT /api/v1/reviews/:id
 * @access Private / Protect => [ user ]
 */
exports.updateReview = factory.updateOne(Review);

/**
 * @desc Delete Specific Review
 * @route DELETE /api/v1/reviews/:id
 * @access Private / Protect => [ user, admin, manager ]
 */
exports.deleteReview = factory.deleteOne(Review);
