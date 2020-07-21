/*
 * @Author: your name
 * @Date: 2020-05-30 10:45:05
 * @LastEditTime: 2020-07-21 21:52:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog_vuee:\JSWorkSpace\master-ui\webpack.prod.js
 */

//用来生成gitPage的环境配置
const path = require("path");
const merge = require("webpack-merge");
var webpack = require("webpack");
const common = require("./webpack.common");

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = merge(common, {
  mode: "production",
  entry: path.resolve(__dirname, "src/main.js"),
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ parallel: true, extractComments: true }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [new BundleAnalyzerPlugin()],
});
