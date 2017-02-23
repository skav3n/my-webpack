const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractLESS = new ExtractTextPlugin('style.css');

exports.rules = (() => {
  return {
    module: {
      rules: [{
        test: /\.less$/i,
        use: extractLESS.extract(['css-loader', 'less-loader']),
      }],
    },
    plugins: [
      extractLESS,
      new CleanWebpackPlugin(['dist'], {
        root: path.join(__dirname),
        verbose: true,
        dry: false,
      }),
    ],
  };
})();
