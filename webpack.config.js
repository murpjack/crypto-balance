const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const options = {
  mode: "development",

  entry: path.join(__dirname, "src", "app.jsx"),

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
      extensionTitle: "Calypso - Crypto rates",
      pageHeader: "Crypto rates",
      hash: true
    }),
    new CopyPlugin([
      {
        from: path.join(__dirname, "src", "fonts"),
        to: path.join(__dirname, "dist", "fonts")
      },
      {
        from: path.join(__dirname, "src", "manifest.json"),
        to: path.join(__dirname, "dist")
      },
      {
        from: path.join(__dirname, "src", "images"),
        to: path.join(__dirname, "dist", "images")
      }
    ])
  ]
};

module.exports = options;
