const path = require('path');
const webpack = require('webpack');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: 'localhost',
    port: 3000,
    proxy: {
      '^/api/*': {
        target: 'http://localhost:3000/api/',
        secure: false
      }
    }
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: './src/public/index.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    })
  ]
}