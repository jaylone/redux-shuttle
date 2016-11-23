module.exports = {
  entry: [
    'src/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/i,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }, {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]'
      }, {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
}
