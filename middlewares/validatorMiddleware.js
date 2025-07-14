const { validationResult } = require("express-validator");

/**
 * @docs Finds the validation errors in this request and wraps them in an object with handy functions
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = validatorMiddleware;
