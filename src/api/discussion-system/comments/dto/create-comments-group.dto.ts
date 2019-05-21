import * as mongoose from 'mongoose';
import { CreateCommentDto } from './create-comment.dto';

export class CreateCommentsGroupDto {
  constructor(
    public readonly course: mongoose.Types.ObjectId,
    public readonly comments: CreateCommentDto[],
  ) {}
}
