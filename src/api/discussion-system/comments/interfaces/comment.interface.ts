import * as mongoose from 'mongoose';
import { User } from '../../../users/interfaces/user.interface';
import { Answer, AnswersGroup } from '../../../discussion-system/answers/interfaces/answer.interface';

export interface Comment extends mongoose.Document {

  readonly    text: string;
  readonly    date: Date;
  readonly    user: User;
  readonly answers: AnswersGroup;

}

export interface CommentsGroup extends mongoose.Document {

  readonly   course: mongoose.Types.ObjectId;
  readonly comments: Comment[];

}
