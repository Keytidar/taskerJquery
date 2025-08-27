const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './script/index.js',
  output: {
    // path: path.resolve(__dirname, './build'),
    path: __dirname,
    filename: 'bundle.js',
    clean: true
  },
  mode: 'development',
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }) 
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
}