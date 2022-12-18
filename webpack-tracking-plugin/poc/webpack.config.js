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
      title: 'Template index.html',
      template: './src/index.html'
    }),
    new TraverseModuleGraphPlugin({
      trackingModule: "./lib/components", // TODO: 추적하고 싶은 모듈 이름으로 변경
      pageAnotation: "page" // TOOD: 페이지 모듈에서 호출될 함수명으로 변경
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
      } 
    ],
  },
};
