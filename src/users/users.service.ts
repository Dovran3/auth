import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegistr } from 'src/authorization/dto/user.dto';
import { Repository } from 'typeorm';
import { TempUser } from './entities/temprory-user.entity';
import { Users } from './entities/users-entity';
import { MessageService } from './message.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(TempUser)
    private readonly tempUserRepo: Repository<TempUser>,
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
    private readonly messageService: MessageService
  ) {}

  async getUser(email: string): Promise<Users> {
    return await this.usersRepo.findOne({ where: { email } })
  }

  async createTempUser(user: UserRegistr): Promise<void> {
    const _user = await this.usersRepo.findOne({ where: { email: user.email } })
    const _tempUser = await this.tempUserRepo
      .findOne({ where: { email: user.email } })
    if (_user || _tempUser)
      throw new BadRequestException(`${user.email} is already in database`)
    else {
      const tempUser = this.tempUserRepo.create(user)
      tempUser.password = await bcrypt.hash(tempUser.password, +process.env.SALT_ROUNDS)
      await this.tempUserRepo.save(tempUser)
      this.messageService.sendMessage(tempUser.email, tempUser.id)
    }
  }

  async createUser(_id: number): Promise<string> {
    const tempUser = await this.tempUserRepo.findOne({ where: { id: _id } })
    if (!tempUser) throw new NotFoundException('User not found')
    const { id, ...others } = tempUser
    const user = this.usersRepo.create(others)
    await this.usersRepo.save(user)
    await this.tempUserRepo.delete(_id)
    return 'Verified))'
  }

  async updateUser(id: number, user: UserRegistr): Promise<any | null> {
    const _user = await this.usersRepo.findOne({ where: { id } })
    if (_user) return await this.usersRepo.update(id, user)
    return null
  }

  async deleteUser(id: number): Promise<any | null> {
    const user = await this.usersRepo.findOne({ where: { id } })
    if (user) return await this.usersRepo.delete(id)
    return null
  }

  async addRefreshToken(email: string, token: string): Promise<void> {
    const user = await this.usersRepo.findOne({ where: { email } })
    user.refresh_token = token
    await this.usersRepo.save(user)
  }
}
