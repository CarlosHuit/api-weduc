import { UserResponse, userResponseFactory } from './auth/user.response.model';
import { AnswerResponse } from './answer.response';
import { Comment } from '../../api/discussion-system/comments/interfaces/comment.interface';

export class CommentResponse {

  constructor(
    public readonly      id: string,
    public readonly    date: Date,
    public readonly    text: string,
    public readonly  tempId: string,
    public readonly    user: UserResponse,
    public readonly answers: AnswerResponse[],
  ) {}

  static parseWithoutTempId(comment: Comment): CommentResponse {

    const createdAt = new Date(comment.date);
    const answers = AnswerResponse.parseAnswersList(comment.answers.answers);
    const user = userResponseFactory(comment.user);

    return new CommentResponse( comment._id, createdAt, comment.text, null, user, answers );

  }

  static parseWithTempId( comment: Comment, tempId: string ) {

    const createdAt = (date: Date) => new Date(date);

    return new CommentResponse(
      comment._id,
      createdAt(comment.date),
      comment.text,
      tempId,
      userResponseFactory(comment.user),
      [],
    );
  }

}
