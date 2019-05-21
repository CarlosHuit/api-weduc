import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async saveUser(createUserDto: CreateUserDto): Promise<User> {

    const newUser = new this.userModel(createUserDto);
    const user    = await newUser.save();

    return await this.userModel.findOne({ email: user.email }, { __v: 0 });

  }

  async getAllUsers(): Promise<User[]> {

    return await this.userModel.find({}, { __v: 0 });

  }

  async getUserByEmail(email: string): Promise<User> {

    return await this.userModel.findOne({ email }, {});

  }

}
