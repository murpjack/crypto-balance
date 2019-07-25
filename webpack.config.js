const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const options = {
  mode: "development",

  entry: path.join(__dirname, "src", "scripts", "app.js"),

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "file-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },

  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },

  watch: true,

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "template.html"),
      filename: "extension.html", //relative to root of the application
      pageHeader: "Crypto-balance",
      hash: true
    })
  ]
};

module.exports = options;
