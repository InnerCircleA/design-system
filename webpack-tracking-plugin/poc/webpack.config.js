const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { TraverseModuleGraphPlugin } = require("./plugins/traverse-module-graph-plugin");

module.exports = {

  mode: "development",
  devtool: "inline-source-map",
  entry: {
    index: "./src/index.ts",
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html'
    }),
    new TraverseModuleGraphPlugin({
      trackingModule: "./components",
      pageAnotation: "here"
    })
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader', // TODO: Change Babel Loader. ref. https://webpack.js.org/guides/typescript/#loader
        exclude: /node_modules/,
      },
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
