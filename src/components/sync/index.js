/*
 * @Author: your name
 * @Date: 2020-05-10 23:28:57
 * @LastEditTime: 2020-05-25 21:41:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\src\components\sync\index.js
 */
import {isArray} from 'lodash-es';
import item from './sync.css';
const  sync = function() {
    console.log("sync");
    document.getElementById('app').innerHTML = `<h1 class="${item.test}">会hii会hi</h1>`
}

const isArrayAsync = function(args) {
    console.log(isArray(args));
}
export {
    sync,
    isArrayAsync,
}