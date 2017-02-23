const webpack = require('webpack');
const path = require('path');

exports.rules = (() => {
  return {
    module: {
      rules: [{
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      }],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
  };
})();
