import * as mongoose from 'mongoose';
import { AnswerSchema } from './answer.schema';

export const AnswersGroupSchema = new mongoose.Schema(
  {
    // comment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    comment: { type: mongoose.Schema.Types.ObjectId },
    answers: { type: [ AnswerSchema ] },
  },
);
