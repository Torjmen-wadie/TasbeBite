import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from'bcrypt'
@Injectable()
export class AuthService {
  constructor(private readonly prisma:PrismaService, private jwtService : JwtService ){}
 async login(dto: CreateAuthDto) {
    const user = await this.prisma.user.findUnique({
      where:{
        email: dto.email
      }
    });
    if(!user) throw new HttpException("wrong email",HttpStatus.BAD_REQUEST);

    const validate =  await bcrypt.compare(dto.password,user.password) 
    if(!validate) throw new HttpException("wrong password", HttpStatus.BAD_REQUEST);
    const {password, ...rest}= user;
    const token = this.jwtService.sign(rest);
    return( token) 
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  async getMe(token :string){
    return await this.jwtService.decode(token);
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
