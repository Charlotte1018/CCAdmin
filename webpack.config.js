var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var htmlWebpackPlugin = require("html-webpack-plugin");
var cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './app/js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './app/views/**/*' }
    ]),
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff2|woff|ttf)$/i,
        loader: "file-loader"
      }
    ]
  }
}
