const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.mjs',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.mjs',
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
        test: /\.mjs$/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
}