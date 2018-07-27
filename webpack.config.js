const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');

module.exports = {
  entry: {
    ParamsDialog: './src/ParamsDialog.js',
    SaveCurDocToMarkdown: './src/Menus/SaveToMarkdown/SaveCurDocToMarkdown.js',
    SaveSelectedDocToMarkdown: './src/Menus/SaveToMarkdown/SaveSelectedDocToMarkdown.js',
    SaveFolderDocToMarkdown: './src/Menus/SaveToMarkdown/SaveFolderDocToMarkdown.js',
    SaveCurDocToWord: './src/Menus/SaveToWord/SaveCurDocToWord.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '参数对话框',
      template: './src/ParamsDialog.html',
      filename: 'ParamsDialog.html',
      chunks: ['ParamsDialog']
    }),
    new EncodingPlugin({
      encoding: 'utf16le',
      include: [
        /SaveSelectedDocToMarkdown.js/,
        /SaveCurDocToMarkdown.js/,
        /SaveFolderDocToMarkdown.js/,
        /SaveCurDocToWord.js/
      ]
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