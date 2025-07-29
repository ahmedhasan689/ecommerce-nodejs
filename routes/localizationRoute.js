const express = require("express");

const { changeLanguage } = require("../services/localizationService");

const router = express.Router();

router.route("/change-language/:lng").post(changeLanguage);

module.exports = router;
