const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

module.exports = withCSS(
  withImages({
    cssModules: true,
    publicRuntimeConfig: {
      APP_NAME: "Jeerno Bhava",
      API_DEVELOPMENT: "http://localhost:8000/agm/us",
      PRODUCTION: false,
    },
  })
);
