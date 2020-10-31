const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const filename = (ext, filename = 'bundle') => isDev ? `${filename}.${ext}` : `${filename}.[fullhash].${ext}`;
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        babelrc: true,
      },
    },
  ];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],

  devtool: isDev ? 'source-map' : false,

  devServer: {
    open: true,
    contentBase: [path.resolve(__dirname, 'src'), path.resolve(__dirname, '/dist')],
    inline: true,
    hot: isDev,
    port: 3000,
  },

  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },

  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {from: path.resolve(__dirname, 'src/favicon.ico')},
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
