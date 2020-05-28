/*
 * @Author: your name
 * @Date: 2020-05-10 23:16:54
 * @LastEditTime: 2020-05-28 21:32:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\src\index.js
 */
import { sync } from './components/sync'
import(/*webpackChunkName: "AsyncTest"*/'./components/async').then(_ => {
    _.default.init();
})
 console.log('=====webpack=====');
 sync();