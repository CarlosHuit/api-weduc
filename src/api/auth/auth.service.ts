import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './interfaces/auth.interface';
import { CreateAccountDto } from './create-account.dto';

@Injectable()
export class AuthService {

  constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

  async emailIsAvailable(email: string) {

    const account = await this.authModel.findOne({email});
    const status  = account ? false : true;

    return status;

  }

  async saveAuth(createAccountDto: CreateAccountDto): Promise<Auth> {

    const account = new this.authModel(createAccountDto);
    const saveAccount = await account.save();
    return saveAccount;

  }

  async getAuthByEmail(email: string) {
    return await this.authModel.findOne({email});
  }

}
