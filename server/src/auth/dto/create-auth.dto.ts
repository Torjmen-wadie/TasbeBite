import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
export class CreateAuthDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email:string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    password: string;
}
