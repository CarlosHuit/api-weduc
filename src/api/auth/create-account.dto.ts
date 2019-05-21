import * as mongoose from 'mongoose';

export class CreateAccountDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly user: mongoose.Types.ObjectId,
  ) {}

}
