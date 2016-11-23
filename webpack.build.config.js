var path = require('path');
var webpack = require('webpack');
var commonConfig = require('./webpack.common.config');

module.exports = Object.assign(commonConfig, {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'index.js',
    library: 'ReduxSagaShuttle',
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
