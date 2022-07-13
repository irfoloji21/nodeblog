const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require("path");

module.exports = {
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "./js"),
    filename: "main-bundled.js"
  },
  module: {
    rules: [
      {
        test: /\.handlebars$/,
        use: [{
          loader: "handlebars-loader",
          options: {helperDirs: path.resolve(__dirname, "./helpers")}
        }]
      }
    ],
    plugins: [
      new NodePolyfillPlugin()
  ]
  },
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty'
  }
};