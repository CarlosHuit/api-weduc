import * as mongoose from 'mongoose';
import { CreateAnswerDto } from './create-answer.dto';

export class CreateAnswersGroupDto {

  constructor(
// tslint:disable-next-line: variable-name
    public readonly _id: mongoose.Types.ObjectId,
    public readonly comment: mongoose.Types.ObjectId,
    public readonly answers: CreateAnswerDto[],
  ) { }

}
