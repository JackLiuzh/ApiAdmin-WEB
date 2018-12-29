const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//动态添加hash 防止引用缓存、2可以生成多个入口文件html
const ExtractTextPlugin = require('extract-text-webpack-plugin');//从js中抽离css
const CopyWebpackPlugin = require('copy-webpack-plugin');//拷贝资源
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'iView admin v' + package.version,
            filename: '../index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/views/main_components/theme_switch/theme'
            }
        ])
    ]
});
