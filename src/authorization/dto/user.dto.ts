import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Matches, IsDecimal, Length } from 'class-validator';

export class UserRegistr {
  @ApiProperty()
  @Length(2, 30)
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @Length(2, 30)
  @IsNotEmpty()
  surname: string

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @Matches(
    '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}', '',
    { message: 'password invalid' }
  )
  @IsNotEmpty()
  password: string
}

export class UserLogin {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @Matches(
    '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}', '',
    { message: 'password invalid' }
  )
  @IsNotEmpty()
  password: string
}

export class Id {
  @ApiProperty()
  @IsDecimal()
  id: string
}