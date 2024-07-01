import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { existsSync, mkdir, mkdirSync } from 'fs';
import path, { extname } from 'path';

@ApiTags("app")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 @Post("upload") 
 @UseInterceptors(FileInterceptor('file',{
  storage:diskStorage({
    destination:(req:any,file:any,cb:any)=>{
      const uploadPath = "upload"
      if(!existsSync(uploadPath)){
        mkdirSync(uploadPath);
      }
      cb(null,uploadPath)
  },
  filename: (req: any, file: any, cb: any) => {
    //  Generating a 32 random chars long string
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    //  Calling the callback passing the random name generated with
    // the original extension name
    cb(null, `${randomName}${extname(file.originalname)}`);
  }
 })
 }))
 uploadFile(@UploadedFile() file:Express.Multer.File, @Body() dto:any){
  console.log('this is file', file);
  let data={desription: dto.desription, alt: dto.alt, extension: file.filename.split('.')[1],path:'http://localhost:4000/upload/'+file.filename}
  return data;
}
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
