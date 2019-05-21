import * as mongoose from 'mongoose';
import { CreateLearnedLetterDto } from './create-learned-letter.dto';

export class CreateLearnedLettersDto {

  constructor(
    public readonly user: mongoose.Types.ObjectId,
    public readonly learnedLetters: CreateLearnedLetterDto[],
  ) {}

}
