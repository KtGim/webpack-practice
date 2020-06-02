<!--
 * @Author: your name
 * @Date: 2020-06-02 09:24:39
 * @LastEditTime: 2020-06-02 09:26:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: 部分命令说明
--> 
## npm link
```
  "bin": {
    "moe": "bin/moe.js"
  },
```
- 当在package.json 文件中写入上述操作后，需要使用 npm link 来将命令挂在到全局，通过 moe 直接操作数据
