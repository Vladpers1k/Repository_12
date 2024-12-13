const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    stat: './statistics.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' }), new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        type: 'asset/resource'
      }
    ]
  }
}
