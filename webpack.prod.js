const path = require('path');
const webpack = require('webpack');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/public/js/base.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', 
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(jpg|png|svg|jpg|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: './src/public/index.html',
      filename: 'index.html'
    }),
    new WorkboxPlugin.GenerateSW()
  ]
}