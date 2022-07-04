import { Body, Controller, Delete, 
  NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { Id, UserRegistr } from './dto/user.dto';

@ApiTags('Authorization')
@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly usersService: UsersService) {}

  // @Get(':id')
  // async getUser(@Param() _id: Id): Promise<any> {
  //   const user = await this.usersService.getUser(+(_id.id))
  //   if (!user) throw new NotFoundException('User not found')
  //   const { refresh_token, password, id, ...results } = user
  //   return results
  // }

  @Post()
  async createTempUser(@Body() user: UserRegistr): Promise<void> {
    await this.usersService.createTempUser(user)
  }

  @Post(':id')
  async createUser(@Param() id: Id): Promise<string> {
    return await this.usersService.createUser(+(id.id))
  }

  @Patch(':id')
  async updateUser(
    @Param() id: Id,
    @Body() user: UserRegistr
  ): Promise<string> {
    const result = await this.usersService.updateUser(+(id.id), user)
    if (!result) throw new NotFoundException('User not found')
    return `#${id.id} has been updated`
  }

  @Delete(':id')
  async deleteUser(@Param() id: Id): Promise<string> {
    const result = await this.usersService.deleteUser(+(id.id))
    if (!result) throw new NotFoundException('User not found')
    return `#${id.id} has been deleted`
  }
}