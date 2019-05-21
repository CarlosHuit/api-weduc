import { UserResponse, userResponseFactory } from './auth/user.response.model';
import { Answer } from '../../api/discussion-system/answers/interfaces/answer.interface';
import { User } from '../../api/users/interfaces/user.interface';

export class AnswerResponse {

  constructor(
    public readonly     id: string,
    public readonly   date: Date,
    public readonly tempId: string,
    public readonly   text: string,
    public readonly   user: UserResponse,
  ) {}

  static parseAnswersList( answersList: Answer[] ) {

    const createdAt = (date: Date) => new Date(date);

    const answers = answersList.map((answer) => {

      return new AnswerResponse(
        answer.id,
        createdAt(answer.date),
        null,
        answer.text,
        userResponseFactory(answer.user),
      );

    });

    return answers;

  }

  static parseWithoutTempId(answer: Answer): AnswerResponse {

    const createdAt = (date: Date) => new Date(date);
    return new AnswerResponse(
      answer._id,
      createdAt(answer.date),
      null,
      answer.text,
      userResponseFactory(answer.user),
    );

  }

  static parseWithTempId(answer: Answer, tempId: string): AnswerResponse {

    const createdAt = (date: Date) => new Date(date);

    return new AnswerResponse(
      answer._id,
      createdAt(answer.date),
      tempId,
      answer.text,
      userResponseFactory(answer.user),
    );

  }

}
