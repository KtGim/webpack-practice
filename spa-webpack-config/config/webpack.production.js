/*
 * @Author: your name
 * @Date: 2020-05-31 21:43:58
 * @LastEditTime: 2020-05-31 22:01:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\spa-webpack-config\config\webpack.production.js
 */ 
const UglifyJSPlugin = require("uglifyjs-webpack-pulugin");
// const os = require("os")

module.exports = {
    output: {
        filename: 'scripts/[name].[hash:5].bundles.js',
        publicPath: '/',
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                parallel: true,
                // parallel: os.cpus().length - 1
            })
        ]
    }
}