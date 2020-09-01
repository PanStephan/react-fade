const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "react-fade-ts.js",
    library: "react-fade-ts",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
  },
};