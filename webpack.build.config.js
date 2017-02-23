const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLESS = new ExtractTextPlugin('style.css');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: ['./index.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.less$/i,
      use: extractLESS.extract(['css-loader', 'less-loader']),
    }, {
      test: /\.html$/,
      use: ['html-loader'],
    }, {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
          ],
        },
      }],
    }, {
      test: /\.(png|jpg|gif)$/,
      use: ['file-loader?name=[path][name].[ext]'],
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: ['url-loader?limit=10000&minetype=application/font-woff'],
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: ['file-loader'],
    }],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  plugins: [
    extractLESS,
    new HtmlWebpackPlugin({
      inject: true,
      template: './templates/index.html',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'contact.html',
      template: './templates/contact.html',
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname),
      verbose: true,
      dry: false,
    }),
  ],
};
