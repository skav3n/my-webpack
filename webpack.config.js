const webpack = require('webpack');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: [path.resolve(__dirname, './index.js')]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
	  { 
		test: /\.less$/,
		use: ['style-loader', 'css-loader', 'less-loader']
	  },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', { "modules": false }] // IMPORTANT
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader?name=[path][name].[ext]']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader?limit=10000&minetype=application/font-woff']
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
	port: 9000
  },
  plugins: [
    new copyWebpackPlugin([{
      context: path.join(__dirname),
      from: {
        glob: './index.html',
        dot: true
      },
        to: './'
    }]),
    new copyWebpackPlugin([{
      context: path.join(__dirname),
      from: {
        glob: 'assets/**/*',
        dot: true
      },
        to: './'
    }]),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname),
      verbose: true, 
      dry: false,
    })
  ]
};
