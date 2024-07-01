import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
@Injectable()
export class UsersService {
  constructor(private readonly prisma : PrismaService){

  }
 async  create(createUserDto: CreateUserDto) {
  const {password , ...rest} = createUserDto
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password,salt)
    const user= await this.prisma.user.create({
      data : {
        password : hashedPassword,
        ...rest
      }
    })
    return "done";
  }

async findAll() {
    return await this.prisma.user.findMany({
      include : {
        recipes : true
      }
    })
  }

 async  findOne(id: number) {
    return await  this.prisma.user.findUnique({
      where : {
        id
      },
      include : {
        recipes : true
      }
    })
  }

 async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where : {
        id
      },
      data : updateUserDto
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
