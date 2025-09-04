const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './frontend/src/script/index.mjs',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[contenthash].mjs',
    clean: true,
  },
  mode: 'development',
  plugins: [
    new HtmlPlugin({
      template: './frontend/src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.mjs$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
