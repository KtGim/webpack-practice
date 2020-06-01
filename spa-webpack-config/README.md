<!--
 * @Author: your name
 * @Date: 2020-05-10 23:32:06
 * @LastEditTime: 2020-06-01 11:03:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\README.md
 -->
#### tree shaking
- js tree shaking
    - 上线环境会自动除去多余的没有使用的代码（npm run prod）
    - 无法将调用了第三方依赖但没有使用的函数去除(class组件内部引用moment此时，无法去除这个没有使用的class的打包编译)
    - webpack-deep-scope-plugin  可以进行深层次的tree shaking, 不编译内部作用域中（scope）中有引用但是没有使用的函数
    ```
        const webpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
        module.exports = {
            plugins: [
                new webpackDeepScopeAnalysisPlugin()
            ]
        }
    ```
- css tree shaking
 - 对比html和class 发现有没有使用的css 则直接不打入生产环境中的css文件中

 ## css-loader,style-loader
 #### webpack 读取 css-modules 样式
 ```
    use:['style-loader', {
        loader: 'css-loader',
        options: {
            modules: {
                // 可以生成指定格式的 class类名
                localIdentName: '[name]_[local]-[hash:base64:5]'
            },
        }
    }]

```
#### css tree-shaking (单页应用)
- 依赖文件 npm i purify-css purifycss-webpack
    - 会将所有css打包到同一个文件夹下面，同时html中没有的css 样式不会被打包出来
```
new PuricssPlugin({
    // 指定css-shaking 文件地址
    paths: glob.sync(path.join(__dirname, './dist/*.html'))
})

// 与 style-loader 冲突，通过 正则匹配 class, 注释也会被匹配， html中没有的话就不会打入 单独的 css 包中
{
    loader: MiniCssExtraPlugin.loader,
    options: {
        publicPath: '../'
    }
},

new MiniCssExtraPlugin({
    filename: "[name].css",
    // chunkFilename： "[id].css",
}),
```
#### webpack dev serve -> hot reload
- 自动更新服务 刷新页面，单页开发时提高效率
- dev-server  配置
- 为了防止对线上环境产生干扰，需要单独配置开发环境配置
- dist 中会生成魔法字符串对应的名称的js代码
```
    devServer: {
        port: 3000,
        hot: true,
        before(app) {  
            // 此处可以结合 mockjs 实现接口代理
            app.get('api/list', (req, res) => {
                res.json({
                    data: [1,2,3],
                    massage: "请求成功"
                })
            })
        }
    },
```
#### magic comments 魔法注释 用于做异步包的导入
- 魔法注释可以配置 输出的chunk的 名字
- 可以配置 prefetch preload 字段
- 这个包会被动态加载到页面中，并且会执行代码的结果

```
import(/*webpackChunkName: "Async Test"*/'./components/async').then(_ => {
    _.default.init();
})
```

#### 单页应用的常用包 ： runtime.js,main.js,common.js, asyncTest.js(异步代码文件) 单页应用的核心文件
- [单页配置 optimization](https://www.jianshu.com/p/a12928c18507)

## 上线（窗口）优化配置
- 开启多核压缩 uglifyjs-webpack-plugin 默认开启当前核数 - 1
- 查看影响打包的因素，进行监控。 可以将每个chunk的打包时间给反印出来（开发环境配置）speed-measure-webpack-plugin
- 同知面板 提示是否打包成功  webpack-build-notifier， 会弹出错误信息和成功时的反馈
- 开启打包进度 progress-bar-webpack-plugin 打包进度条
- webpack-dashboard 信息面板， webpack1时已有
    ```
        "scripts": {
            ...
            "dev": "webpack-dashboard -- webpack --mode development",
            ...
        },
    ```
- 窗口标题 node-bash-title

=========================== 以上是窗口优化

## 上线
- polyfill.min.js (v2版本) （https://cdn.polyfill.io/v2/polyfill.min.js）根据参数来读取 polyfill.js 部分功能
- 前端缓存小负载
    - 通过node(webpack 计算出有变化的文件)，然后再根据负载内容更新结果
        - webpack-manifest-plugin 会生成 打包文件的文件名和打包的地址生成映射保存再 manifest.json 文件中。
        - 如果是服务器端构造的html，就可以根据当前的manifest.  json，引入css和js文件，而且这个文件是必须的，否则服务器端压根不知道hash之后的JS文件名字和CSS名字。
        - 
- html-webpack-plugin 设置options来去除 loading 的效果