/*
 * @Author: your name
 * @Date: 2020-05-31 17:18:23
 * @LastEditTime: 2020-05-31 18:23:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\mpa-webpack-config\htmlAfterPlugin.js
 */ 
const pluginName = 'HtmlAfterWebpackPlugin';

class HtmlAfterWebpackPlugin {
    // webpack 核心对象 compiler 会将编译过程中产生的各种对象挂在到这个对象上
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            console.log("webpack HtmlAfterWebpackPlugin 构建过程开始！");
            // htmlPluginData 打包的 文件
            // 注意此时 html-webpack-plugin 版本为 3.2
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName, htmlPluginData => {
                const result = htmlPluginData.assets.js;
                let _html = htmlPluginData.html;
                _html = _html.replace("<!--injectjs -->", `<script src=${result}></script>`);
                htmlPluginData.html = _html;
            })
        });
    }
}

module.exports = HtmlAfterWebpackPlugin;