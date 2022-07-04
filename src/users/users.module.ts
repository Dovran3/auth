import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempUser } from './entities/temprory-user.entity';
import { Users } from './entities/users-entity';
import { UsersService } from './users.service';
import { config } from 'dotenv';
import { MessageService } from './message.service';

config()

@Module({
  imports: [
    TypeOrmModule.forFeature([ Users, TempUser ]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSWORD
        } 
      }
    })
  ],
  providers: [UsersService, MessageService],
  exports: [UsersService]
})
export class UsersModule {}
