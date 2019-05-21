import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsGroup } from './interfaces/comment.interface';

@Controller('comments')
export class CommentsController {

  constructor( private readonly commentService: CommentsService ) {}

  @Get(':courseId')
  async getCommentsGroup(@Param('courseId') courseId: string): Promise<CommentsGroup> {

    try {

      const data = await this.commentService.getCommentsGroup(courseId);

      if (!data) { throw new NotFoundException('No existe el registro'); }

      return data;

    } catch (error) {

      throw new NotFoundException('No existe el registro');

    }

  }

}
