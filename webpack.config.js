const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let options = {
  entry: path.join(__dirname, "src", "js", "index.js"),

  output: {
    path: path.join(__dirname, "src"),
    filename: "bundle.js"
  },

  mode: 'development',

  module: {
    rules: [{
      test: /\.(s*)css$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },

  watch: true,

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "extension.html"),
      filename: "popup.html", //relative to root of the application
      pageHeader: 'Crypto-balance',
      hash: true,
    })
  ]
};

module.exports = options;
