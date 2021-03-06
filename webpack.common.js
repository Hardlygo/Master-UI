/*
 * @Author: your name
 * @Date: 2020-05-30 10:44:34
 * @LastEditTime: 2020-07-21 21:15:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog_vuee:\JSWorkSpace\master-ui\webpack.common.js
 */
const path = require("path");
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugun = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const devMode = process.env.NODE_ENV !== "production";

function resolvePath(pathName) {
  path.join(__dirname, pathName);
}

module.exports = {
  //不同环境有不同entry，common文件不配置
  output: {
    filename: devMode ? "[name].bundle.js" : "js/[name].[contenthash:10].js",
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js',//都放到js文件夹
    path: resolvePath("dist"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // 将 `.vue` 添加为一个可解析的扩展名。
    extensions: [".js", ".json", ".vue"],
  },
  stats: {
    builtAt: true,
    timings: true,
  },
  module: {
    //loader默认是从右向左执行
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css/,
        use: [
          {
            loader:
              process.env.NODE_ENV !== "production"
                ? "vue-style-loader"
                : MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: devMode,
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        //stylus-loader
        test: /\.styl(us)?$/,
        use: [
          {
            loader:
              process.env.NODE_ENV !== "production"
                ? "vue-style-loader"
                : MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: devMode,
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          "css-loader",
          "postcss-loader",
          "stylus-loader",
          {
              //给每个组件的styl加上公共的变量，注意要给每个组件的顶头回车一行，才不会报错
            loader: "style-resources-loader",
            options: {
              patterns: [
                path.resolve(__dirname, "src/assets/css/*.styl"),
                // path.resolve(__dirname, "path/to/stylus/mixins/*.styl"),
              ],
              injector: (source, resources) => {
                const combineAll = (type) =>
                  resources
                    .filter(({ file }) => file.includes(type))
                    .map(({ content }) => content)
                    .join("");
                return combineAll("variables") + combineAll("animation")+ source; //+ combineAll("mixins")
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]?[hash]",
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              symbolId: "icon-[name]",
            },
          },
        ],
        include: [path.resolve(__dirname, "src/icons")],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "[name].[ext]?[hash]",
            },
          },
        ],
        exclude: [path.resolve(__dirname, "src/icons")],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "css/[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "css/[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      title:"Master UI",
      meta: {
        viewport:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no",
      },
      minify: {
        removeAttributeQuotes: !devMode,
        collapseWhitespace: !devMode,
        removeComments: !devMode,
      },
      hash: true,
    }),
    new CleanWebpackPlugin(),
    //拷贝插件，把public文件夹内的内容复制到dist文件夹
    new CopyWebpackPlugun({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new webpack.BannerPlugin(`generated by Hardly at ${new Date()}`),
    new VueLoaderPlugin(),
  ],
};
