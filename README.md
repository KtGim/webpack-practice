<!--
 * @Author: your name
 * @Date: 2020-05-10 23:32:06
 * @LastEditTime: 2020-05-25 22:48:41
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
#### css tree-shaking
- 依赖文件 npm i purify-css purifycss-webpack
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

