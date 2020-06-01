/*
 * @Author: your name
 * @Date: 2020-05-10 23:49:19
 * @LastEditTime: 2020-06-01 11:09:03
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
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const WebpackBuildNotifier = require("webpack-build-notifier");
const ProgressPlugin = require("progress-bar-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

const setTitle = require("node-bash-title");
setTitle(" opopop ")
const loading = {
    html: '加载中'
}
const smp = new SpeedMeasurePlugin();

const modeflag = argv.mode === "production";
const config = {
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 1, // 表示被引用次数，默认为1
                    maxInitialRequests: 5, // 打出来的chunks的最大请求不能超过5
                    minSize:  0,
                }
            }
        },
        runtimeChunk: { // 运行时
            name: 'runtime'
        }
    },
    devServer: {
        port: 3000,
        hot: true,
        before(app) {
            app.get('/api/list', (req, res) => {
                res.json({
                    data: [1,2,3],
                    massage: "请求成功"
                })
            })
        }
    },
    plugins: [
        // new webpackDeepScopeAnalysisPlugin(),  // js tree shaking
        new ParallelUglifyPlugin({
            uglifyES: {
                // exclude， include 配置比较重要，可以加快构建速度
                // exclude:{},
                // include: "",
                output: {
                    beautify: false, // es 美化
                    comments: false, // 注释
                },
                compress: {
                    warnings: false, // 不输出警告
                    drop_console: false,
                    collapse_vars: true,
                }
            }
        }),
        new ManifestPlugin(),
        new DashboardPlugin(), // webpack-dashboard package.json 命令更改
        new ProgressPlugin(),
        new WebpackBuildNotifier({
            title: 'my pro',
            // logo: "path.resolve()"
            suppressSuccess: true,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtraPlugin({
            filename: modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
            // chunkFilename： "[id].css",
        }),
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
            loading
        }),
        // new PuricssPlugin({
        //     paths: glob.sync(path.join(__dirname, './dist/*.html'))
        // }) // 文件不存在 会导致错误
    ]
}

module.exports = smp.wrap(config)  // npm run chart  和这个包冲突

// module.exports = config;