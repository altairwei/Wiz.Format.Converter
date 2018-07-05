const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');

module.exports = {
  entry: {
    SaveCurDocToMarkdown: './src/SaveCurDocToMarkdown.js',
    SaveSelectedDocToMarkdown: './src/SaveSelectedDocToMarkdown.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'hidden-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '保存到 Markdown',
      template: './src/SaveCurDocToMarkdown.html',
      filename: 'SaveCurDocToMarkdown.html',
      chunks: ['SaveCurDocToMarkdown']
    }),
    new EncodingPlugin({
      encoding: 'utf16le',
      include: /SaveSelectedDocToMarkdown.js/
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  mode: 'development'
};