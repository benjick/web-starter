const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');

let config;
const common = {
  entry: [
    './src/css/main.css',
    'whatwg-fetch',
    './src/main',
  ],
  output: {
    publicPath: '/',
    path: `${__dirname}/dist`,
    filename: '[hash].js',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html',
    }),
  ],
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
  postcss: () => [precss, autoprefixer],
};

switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {
      devtool: 'cheap-module-source-map',
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
          __DEVELOPMENT__: false,
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
      ],
    });
    break;
  default:
    config = merge(common, {
      entry: [
        ...common.entry,
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
      ],
      debug: true,
      devServer: {
        contentBase: './src',
        stats: 'errors-only',
        inline: true,
        proxy: {
          '/api/*': 'http://localhost:8080',
        },
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
      ],
    });
}

module.exports = validate(config);
