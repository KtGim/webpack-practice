/*
 * @Author: your name
 * @Date: 2020-05-10 23:49:19
 * @LastEditTime: 2020-05-25 23:55:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\webpack.config.js
 */
const webpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const PuricssPlugin = require('purifycss-webpack');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin  = require("html-webpack-plugin");

const argv = require("yargs-parser")(process.argv.slice(2))
const glob = require('glob');
const path = require('path');

const modeflag = argv.mode === "production";
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[
                    // 'style-loader',
                    {
                        loader: MiniCssExtraPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        // options: {
                        //     modules: {
                        //         // 可以生成指定格式的 class类名
                        //         localIdentName: '[name]_[local]-[hash:base64:5]'
                        //     },
                        // }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new webpackDeepScopeAnalysisPlugin(),
        
        new CleanWebpackPlugin(),
        new MiniCssExtraPlugin({
            filename: modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
            // chunkFilename： "[id].css",
        }),
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html"
        }),
        new PuricssPlugin({
            paths: glob.sync(path.join(__dirname, './dist/*.html'))
        })
    ]
}