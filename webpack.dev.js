/*
 * @Author: your name
 * @Date: 2020-05-30 10:45:23
 * @LastEditTime: 2020-05-30 14:03:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog_vuee:\JSWorkSpace\master-ui\webpack.dev.js
 */
const path = require('path');
const merge = require('webpack-merge');
const comom = require('./webpack.common');
const webpack = require('webpack');

function resolvePath(pathName) {
    path.resolve(__dirname,pathName)
}
module.exports = merge(comom, {
    mode: 'development',
    entry:  path.resolve(__dirname, 'src/main.js'),
    output: {
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    //开发服务器配置
    devServer: {
        //默认将dist文件夹内的内容放到开发服务器
        contentBase: path.resolve(__dirname, 'dist'),
        // 进度条
        progress: true,
        //开启热更新
        hot: true
    },
    plugins: [
        //用于检测哪个模块已经更换
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})