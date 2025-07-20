const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

/**
 * ? Get All
 */
exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build Query
    const countDocuments = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(countDocuments)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute Query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res.status(200).json({
      results: documents.length,
      pagination: paginationResult,
      data: documents,
    });
  });

/**
 * ? Create Model
 */
exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

/**
 * ? Get a Specific Model
 */
exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      return next(
        new ApiError(
          `No document found with the given ID: ${req.params.id}`,
          400,
        ),
      );
    }

    res.status(200).json({ data: document });
  });

/**
 * ? Update Model
 */
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(
          `No document found with the given ID: ${req.params.id}`,
          400,
        ),
      );
    }

    res.status(200).json({ data: document });
  });

/**
 * ? Delete Model
 */
exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(
        new ApiError(
          `No document found with the given ID: ${req.params.id}`,
          400,
        ),
      );
    }

    res.status(200).json({ msg: "Successfully Deleted" });
  });
