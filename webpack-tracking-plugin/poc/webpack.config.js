const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const options = {};

module.exports = {
  entry: {
    index: "./src/index.js",
    print: "./src/print.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
    new WebpackManifestPlugin(options)
  ],
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
