const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    'babel-polyfill',
    './src/css/main.css',
    './src/main',
  ],
  output: {
    publicPath: '/',
    filename: 'main.js',
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot', 'babel-loader'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
  postcss: () => [precss, autoprefixer],
  devServer: {
    contentBase: './src',
    stats: 'errors-only',
    inline: true,
    progress: true,
    proxy: {
      '/api/*': 'http://localhost:8080',
    },
  },
};
