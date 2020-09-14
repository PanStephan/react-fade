const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "index.js",
    library: "react-fade-ts",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true
  },
  resolve: {      
    alias: {          
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),

    }  
  },  
  externals: {      
      react: {          
          commonjs: "react",          
          commonjs2: "react",          
          amd: "React",          
          root: "React"      
      },      
      "react-dom": {          
          commonjs: "react-dom",          
          commonjs2: "react-dom",          
          amd: "ReactDOM",          
          root: "ReactDOM"      
      }  
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