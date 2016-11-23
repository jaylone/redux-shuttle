var path = require('path');
var webpack = require('webpack');
var commonConfig = require('./webpack.common.config');

module.exports = Object.assign(commonConfig, {
  src: './src',
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'index.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
});
