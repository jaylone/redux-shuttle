import path from 'path';
import commonConfig from './webpack.common.config';

export default Object.assign(commonConfig, {
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/assets/'
  },
  devtool: 'source-map',
});
