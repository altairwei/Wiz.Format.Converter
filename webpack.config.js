const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');

module.exports = {
  entry: {
    SaveToMarkdown: './src/SaveToMarkdown.js',
    SaveCurDocToMarkdown: './src/SaveCurDocToMarkdown.js',
    SaveSelectedDocToMarkdown: './src/SaveSelectedDocToMarkdown.js',
    SaveFolderDocToMarkdown: './src/SaveFolderDocToMarkdown.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '保存到 Markdown',
      template: './src/SaveToMarkdown.html',
      filename: 'SaveToMarkdown.html',
      chunks: ['SaveToMarkdown']
    }),
    new EncodingPlugin({
      encoding: 'utf16le',
      include: [/SaveSelectedDocToMarkdown.js/, /SaveCurDocToMarkdown.js/, /SaveFolderDocToMarkdown/]
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