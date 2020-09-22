#!/usr/bin/env node
/*
 * @Author: your name
 * @Date: 2020-09-21 22:28:04
 * @LastEditTime: 2020-09-21 23:35:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\vueCliStudy\clidemo001\bin\init-list.js
 */
var inquirer = require('inquirer');
var chalk = require('chalk');
var ora = require('ora');
var request = require('request');
inquirer
  .prompt([
    {
        type: 'input',
        name: 'sure', // 对应 answers 对象内部的一个 属性 answers.sure
        message: (opt) => {
            if (opt === 'yes') {
               return '请确认'
            }
            return '请取消'
        },
        default: 'no',
    },
    {
        type: 'confirm',
        name: 'sureAgain', // 对应 answers 对象内部的一个 属性
        message: "你需要再次确认吗",
        default: false,
    }
  ])
  .then(answers => {
    console.log(answers)
    if (answers.sureAgain) {
        console.log(chalk.green('yes'));
        const spinner = ora('Loading unicorns').start();
        spinner.color = 'red';
        spinner.text = '加载中';
        setTimeout(() => {
            spinner.stop();
        }, 5000);
    } else {
        console.log(chalk.red('no'));
    }
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });