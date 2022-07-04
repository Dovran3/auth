import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthorizationController } from './authorization.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthorizationController]
})
export class AuthorizationModule {}
