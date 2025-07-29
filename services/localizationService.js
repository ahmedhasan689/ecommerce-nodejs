const i18n = require("../locales");

exports.changeLanguage = (req, res, next) => {
  const lang = req.params.lng;

  res.cookie("i18next", lang, {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: false,
  });

  const message = i18n.getFixedT(lang)("language_changed");
  res.json({ success: true, message });
};
