import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserLogin } from 'src/authorization/dto/user.dto';
import { AuthenticationService } from './authentication.service';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  async login(@Body() user: UserLogin): Promise<any> {
    return await this.authService.login(user)
  }

  @Post('logout')
  logout(): void {}

  @Get('refresh')
  async refreshToken(@Req() req: Request): Promise<any> {
    return await this.authService.refreshToken(req)
  }
}
