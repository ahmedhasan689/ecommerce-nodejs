const i18nextMiddleware = require("i18next-http-middleware");
const i18n = require("../locales");

module.exports = i18nextMiddleware.handle(i18n, {
  ignoreRoutes: ["/assets", "/public"],
  removeLngFromUrl: true,
});
