import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnswersGroup, Answer } from './interfaces/answer.interface';
import { CreateAnswersGroupDto } from './dto/create-answers-group.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {

  constructor(
    @InjectModel('Answer') private readonly answersGroupModel: Model<AnswersGroup>,
  ) {}


  async addAnswersGroup(createAnswersGroupDto: CreateAnswersGroupDto): Promise<AnswersGroup> {

    const answersGroup = new this.answersGroupModel(createAnswersGroupDto);
    return await answersGroup.save();

  }


  async addAnswer(createAnswerDto: CreateAnswerDto, comment: string): Promise<AnswersGroup> {

    return await this.answersGroupModel.findOneAndUpdate(
      { comment },
      { $push: {
          answers: createAnswerDto,
        },
      },
    );

  }


  async getAnswers(commentId: string): Promise<AnswersGroup> {

    return this.answersGroupModel.findOne({ comment: commentId })
      .populate({
        path: 'answers.user',
        select: {
          __v: 0,
        },
      });

  }


  async commentHasAswers( commentId: string ): Promise<boolean> {

    const answersGroup = await this.answersGroupModel.findOne({ comment: commentId });
    const commentsLength = answersGroup.answers.length;

    return commentsLength > 0;

  }


  async getAnswerDetail(commentId: string, answerId: string): Promise<Answer> {

    let answersGroup: AnswersGroup = await this.answersGroupModel.findOne({ comment: commentId })
      .populate({
        path: 'answers.user',
        select: {
          __v: 0,
        },
      });

    const answer: Answer = answersGroup.answers.find(a => a.id === answerId);
    answersGroup = null;

    return answer;
  }


  async removeAnswer( commentId: string, answerId: string, userId: string ): Promise<void> {

    const deleteAnswer = await this.answersGroupModel.updateOne(
      { comment: commentId },
      { $pull: {
          'answers': { _id: answerId, user: userId }
        }
      },
      { safe: true }
    );

  };

  async removeAnswersGroup(commentId: string): Promise<{ ok?: number, n?: number }> {
    return await this.answersGroupModel.deleteOne({ comment: commentId })
  }

}
