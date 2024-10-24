const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      util: require.resolve("util/"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
    },
  };

  // Additional configurations if needed
  return config;
};
