const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/js/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    filename: 'bundle.js',

    path: path.resolve(__dirname, './../')
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  mode: 'development',

  module: {
    rules: [{
      test: /\.(s*)css$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    // /** Since Webpack 4 */
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     handlebarsLoader: {}
    //   }
    // })
    new HtmlWebpackPlugin({
      hash: true,
      pageHeader: 'Crypto-balance',
      template: './../src/extension.html',
      filename: './../extension.html' //relative to root of the application
    })
  ]
};
