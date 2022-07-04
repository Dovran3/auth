import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from 'src/authorization/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { Request } from 'express';

config()

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login(user: UserLogin): Promise<any> {
    const _user = await this.usersService.getUser(user.email)
    if (_user && await bcrypt.compare(user.password, _user.password)) {
      return await this.getAccessToken(user.email)
    }
    throw new NotFoundException('Invalid EMAIL or PASSWORD')
  }

  async refreshToken(req: Request): Promise<any> {
    try {
      const token = req.headers.authorization.split('Bearer ')[1]
      const decoded = this.jwtService.verify(token, { secret: process.env.REFRESH_TOKEN })
      const user = await this.usersService.getUser(decoded.email)
      const valid = await bcrypt.compare(token, user.refresh_token)
      if (valid) return this.getAccessToken(user.email)
      throw new UnauthorizedException()
    } catch {
      throw new UnauthorizedException()
    }
  }

  async getTokens(email: string): Promise<any> {
    const refreshToken = this.getRefreshToken(email)
    await this.usersService.addRefreshToken(email, refreshToken)
    const accessToken = this.getAccessToken(email)
    return { accessToken, refreshToken }
  }

  getAccessToken(email: string): any {
    const accessToken = this.jwtService.sign({
      email: email,
      someRandomInfo: process.env.RANDOM_INFO
    }, {
      secret: process.env.ACCESS_TOKEN,
      expiresIn: process.env.ACCESS_TIME
    })
    return accessToken
  }

  getRefreshToken(email: string): any {
    const refreshToken = this.jwtService.sign({
      email: email,
      someRandomInfo: process.env.RANDOM_INFO
    }, {
      secret: process.env.REFRESH_TOKEN,
      expiresIn: process.env.REFRESH_TIME
    })
    return refreshToken
  }
}
