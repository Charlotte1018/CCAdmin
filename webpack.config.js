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
      { from: './app/views/**/*',
        from: './app/images/**'
     }
    ]),
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: 'head',
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff2|woff|ttf)$/i,
        loader: "file-loader"
      }
    ]
  }
}
