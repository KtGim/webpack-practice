/*
 * @Author: your name
 * @Date: 2020-05-31 17:12:33
 * @LastEditTime: 2020-05-31 18:11:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\mpa-webpack-config\webpack.config.js
 */
const htmlWebpackPlugin  = require("html-webpack-plugin");
const HtmlAfterWebpackPlugin = require("./htmlAfterWepackPlugin");
module.exports = {
    entry: {
        "index-index": "./project/src/views/index.entry.js"
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "./project/src/views/index.html",
            inject: false
        }),
        new HtmlAfterWebpackPlugin()
    ]
}