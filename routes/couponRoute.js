const express = require("express");
const authService = require("../services/authService");
const {
  getAllCoupons,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../services/couponService");
const {
  getCouponValidator,
  createCouponValidator,
  updateCouponValidator,
  deleteCouponValidator,
} = require("../utils/validators/couponValidator");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("admin", "manager"));

router.route("/").get(getAllCoupons).post(createCouponValidator, createCoupon);
router
  .route("/:id")
  .get(getCouponValidator, getCoupon)
  .put(updateCouponValidator, updateCoupon)
  .delete(deleteCouponValidator, deleteCoupon);

module.exports = router;
