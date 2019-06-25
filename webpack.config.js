const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
  entry: {
    app: './src/report/index.js',
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/report/index.html",
      filename: "./report.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'report.js',
  },
};
