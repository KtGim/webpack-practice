/*
 * @Author: your name
 * @Date: 2020-09-21 22:17:41
 * @LastEditTime: 2020-09-22 00:29:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\vueCliStudy\clidemo001\lib\index.js
 */
module.exports = function mainDoint() {
    const { program } = require('commander');

    // function help() {
    //     program.parse(process.argv);
    //     if (program.args.length < 1) return program.help(); 
    // }

    // help();

    program
        .command('list', '展示列表')
        .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')
        .action(() => {
            console.log(`cheese: ${program.cheese}`);
        }).on('help', () => {
            console.log('check check check')
        })

    program.parse(process.argv);
}

/**
 * <>该符号表示该参数为必填 [] 表示可选参数
 */