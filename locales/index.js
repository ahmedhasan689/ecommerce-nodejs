const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
const { join } = require("path");

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    preload: ["en", "ar"],
    ns: ["common", "auth", "errors"],
    defaultNS: "common",
    backend: {
      loadPath: join(__dirname, "{{lng}}/{{ns}}.json"),
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["header"],
      lookupHeader: "accept-language",
      caches: [],
    },
  });

module.exports = i18next;
