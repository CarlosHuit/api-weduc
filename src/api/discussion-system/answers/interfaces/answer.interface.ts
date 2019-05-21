import { Document } from 'mongoose';
import { User } from '../../../users/interfaces/user.interface';

export interface AnswersGroup extends Document {
  readonly course: string;
  readonly answers: Answer[];
}

export interface Answer extends Document {
  readonly text: string;
  readonly date: Date;
  readonly user: User;
}
