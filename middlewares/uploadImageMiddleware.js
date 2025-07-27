const fs = require("fs");
const { v4: uuid } = require("uuid");
const multer = require("multer");
const ApiError = require("../utils/apiError");

exports.uploadSingleImage = (modelName, pluralName, fieldName) => {
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = `uploads/${pluralName}`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const specialSuffixes = {
        avatar: "avatar",
        image: "thumbs",
      };

      const suffix = specialSuffixes[file.fieldname] || "";

      // Get Extension
      const extension = file.mimetype.split("/")[1];
      const filename = `${modelName}-${uuid()}-${Date.now()}-${suffix}.${extension}`;
      // Set image path to request body
      req.body[fieldName] = filename;
      cb(null, filename);
    },
  });

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Image Allowed", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload.single(fieldName);
};

exports.uploadMixOfImages = (modelName, pluralName, fields) => {
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = `uploads/${pluralName}`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const extension = file.mimetype.split("/")[1];

      const specialSuffixes = {
        coverImage: "cover",
        images: "thumb",
      };

      const suffix = specialSuffixes[file.fieldname] || "";

      const fileName = `${modelName}-${uuid()}-${Date.now()}-${suffix}.${extension}`;

      cb(null, fileName);
    },
  });

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Image Allowed", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return (req, res, next) => {
    upload.fields(fields)(req, res, (err) => {
      if (err) return next(err);

      if (req.files) {
        for (const [fieldName, files] of Object.entries(req.files)) {
          if (files.length === 1) {
            req.body[fieldName] = files[0].filename;
          } else {
            req.body[fieldName] = files.map((file) => file.filename);
          }
        }
      }

      next();
    });
  };
};
