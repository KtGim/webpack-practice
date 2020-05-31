/*
 * @Author: your name
 * @Date: 2020-05-28 22:13:52
 * @LastEditTime: 2020-05-28 22:55:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\mpa-webpack-config\project\src\app.controller.ts
 */ 
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render("index.html")
  getHello(): object {
    return {message: this.appService.getHello()};
  }
}
