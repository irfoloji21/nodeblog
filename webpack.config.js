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
    ]
  }
};