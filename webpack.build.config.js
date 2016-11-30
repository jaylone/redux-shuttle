var path = require('path');
var webpack = require('webpack');
var commonConfig = require('./webpack.common.config');

module.exports = Object.assign(commonConfig, {
  entry: {
    index: './src/index.js',
    helper: './src/helper.js',
    underscored: './src/underscored.js',
    validator: './src/validator.js'
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    chunkFilename: '[name].js',
    filename: '[name].js',
    library: 'ReduxShuttle',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true,
      },
      comments: /^!/
    })
  ]
});
