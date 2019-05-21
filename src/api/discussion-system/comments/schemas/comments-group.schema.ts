import * as mongoose from 'mongoose';
import { CommentSchema } from './comment.schema';

export const CommentsGroupSchema = new mongoose.Schema(
  {
    course:   { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    comments: { type: [ CommentSchema ] },
  },
);
