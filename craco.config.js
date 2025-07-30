module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add fallbacks for Node.js modules not available in browsers
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "fs": false,
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "vm": require.resolve("vm-browserify"),
        "assert": false,
        "http": false,
        "https": false,
        "os": false,
        "url": false
      };

      // Add sql.js WASM file handling
      webpackConfig.module.rules.push({
        test: /\.wasm$/,
        type: 'asset/resource',
      });

      return webpackConfig;
    },
  },
};
