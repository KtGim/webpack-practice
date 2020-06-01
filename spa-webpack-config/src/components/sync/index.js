/*
 * @Author: your name
 * @Date: 2020-05-10 23:28:57
 * @LastEditTime: 2020-06-01 10:09:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\src\components\sync\index.js
 */
import {isArray} from 'lodash-es';
import item from './sync.css';
const  sync = function() {
    console.log("sync");
    setTimeout(() => {
        document.getElementById('app').innerHTML = `<h1 class="${item.test}">会hii会hi</h1>`
    }, 3000);
}

const isArrayAsync = function(args) {
    console.log(isArray(args));
}
export {
    sync,
    isArrayAsync,
}