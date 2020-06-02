#!/usr/bin/env node
// 系统看到这行时，能够沿着该路径查找node并执行，主要是为了兼容mac电脑，确保执行
/*
 * @Author: your name
 * @Date: 2020-06-02 09:12:21
 * @LastEditTime: 2020-06-02 09:21:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: 脚手架入口文件
 */
const program = require("commander");

// 定义当前版本
// 定义使用方法
// 定义四个指令

program.version(require("../package.json").version)
    .usage('<command> [options]')
    .command("add", "添加新的模板")
    .command("delete", "删除模板")
    .command("list", "展示所有的模板列表")
    .command("init", "根据模板初始化项目")

// 解析命令行参数
program.parse(process.argv);