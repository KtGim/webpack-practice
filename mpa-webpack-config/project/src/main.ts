/*
 * @Author: your name
 * @Date: 2020-05-28 22:13:52
 * @LastEditTime: 2020-05-28 22:58:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-practice\mpa-webpack-config\project\src\main.ts
 */ 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//静态资源中间件依赖于具体平台，所以可以先引入express
import { NestExpressApplication } from '@nestjs/platform-express';
const swig = require('swig');

async function bootstrap() {
  console.log(__filename, "=========")
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(__dirname+'/public');
  app.setBaseViewsDir(__dirname+'/views');
  app.engine('html', swig.renderFile);
  app.setViewEngine("html");
  await app.listen(3000);
}
bootstrap();
