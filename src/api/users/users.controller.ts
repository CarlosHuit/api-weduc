import { Controller, Get, Param, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { userResponseFactory, UserResponse } from '../../models/responses/auth/user.response.model';
import { User } from './interfaces/user.interface';

@Controller('api/users')
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {

    const users: User[] = await this.userService.getAllUsers();
    const usersList: UserResponse[] = users.map(user => userResponseFactory(user));
    return usersList;

  }

  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {

    const user = await this.userService.getUserByEmail(email);

    if (user) {
      return userResponseFactory(user);
    }

    if (!user) {
      throw new UnauthorizedException('Usuario no existe');
    }

  }

}
