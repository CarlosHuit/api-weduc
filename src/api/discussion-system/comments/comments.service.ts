import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsGroup, Comment } from './interfaces/comment.interface';
import { CreateCommentsGroupDto } from './dto/create-comments-group.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {

  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<CommentsGroup>,
  ) {}

  async existCommentsGroupOf(courseId: string): Promise<boolean> {

    const t = await this.commentModel.countDocuments({ course: courseId });
    return t > 0 ? true : false;

  }

  async createCommentsGroup(createCommentGroupDto: CreateCommentsGroupDto) {

    const commentGroup = new this.commentModel(createCommentGroupDto);
    return await commentGroup.save();

  }

  async getCommentsGroup(courseId: string): Promise<CommentsGroup> {

    return await this.commentModel.findOne({ course: courseId })
      .populate({
        path: 'comments.user',
        select: {
          __v: 0,
        },
      })
      .populate({
        path: 'comments.answers',
        select: {
          answers: 1,
          _id: 0,
        },
        populate: {
          path:   'answers.user',
          select: {
            __v: 0,
          },
        },
      });

  }

  async addComment(createCommentDto: CreateCommentDto, course: string): Promise<CommentsGroup> {

    return await this.commentModel.findOneAndUpdate(
      { course },
      { $push: {
          comments: createCommentDto,
        },
      },
    );

  }

  async getCommentDetail(courseId: string, commentId: string): Promise<Comment> {

    let data: CommentsGroup = await this.commentModel.findOne({ course: courseId })
      .populate({
        path: 'comments.user',
        select: {
          __v: 0,
        },
      })
      .populate({
        path: 'comments.answers',
        select: {
          answers: 1,
          _id: 0,
        },
        populate: {
          path: 'answers.user',
          select: {
            __v: 0,
          },
        },
      });

    const comment = data.comments.find(c => c.id === commentId);
    data = null;

    return comment;

  }

  async hasData(): Promise<boolean> {

    const count = await this.commentModel.countDocuments({});
    return count > 0 ? true : false;

  }


  async removeComment( courseId: string, commentId: string, userId: string ) {

    const deleteComment = await this.commentModel.updateOne(
      { course: courseId },
      { $pull: { 'comments': { _id: commentId, user: userId }} },
      { safe: true }
    )

  }


}
