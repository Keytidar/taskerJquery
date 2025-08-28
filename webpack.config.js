const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    clean: true
  },
  mode: 'development',
  plugins: [
    new HtmlPlugin({
      template: './src/index.html'
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