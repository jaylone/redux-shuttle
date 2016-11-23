var path = require('path');
var webpack = require('webpack');
var commonConfig = require('./webpack.common.config');

module.exports = Object.assign(commonConfig, {
  src: './src',
  entry: [
    './example/src/entry.js'
  ],
  output: {
    path: path.join(__dirname, '/bundle/'),
    filename: 'index.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
});
