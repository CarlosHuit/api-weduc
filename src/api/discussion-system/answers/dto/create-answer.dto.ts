import * as mongoose from 'mongoose';

export class CreateAnswerDto {

  constructor(
// tslint:disable-next-line: variable-name
    public readonly _id: mongoose.Types.ObjectId,
    public readonly date: Date,
    public readonly text: string,
    public readonly user: mongoose.Types.ObjectId,
  ) {}

}
