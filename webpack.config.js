const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const config = path.join(__dirname, process.env.NODE_ENV);
const webpackConfig = require(config);

const common = {
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
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './templates/index.html',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'contact.html',
      template: './templates/contact.html',
    }),
  ],
};

module.exports = webpackMerge(common, webpackConfig.rules);
