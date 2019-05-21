import {
  Get,
  Req,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Controller,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Request     } from 'express';
import { AnswerForm  } from '../../models/forms/answer-form.model';
import { decodeToken } from 'src/utils/decode-token';
import { CommentForm } from '../../models/forms/comment-form';
import { AppResponse } from '../../models/responses/app.response';
import { CoursesRoutes     } from './courses.routes';
import { LearnedLetter     } from '../reading-course/learned-letters/interfaces/learned-letter.interface';
import { CoursesService    } from './courses.service';
import { AnswerResponse    } from '../../models/responses/answer.response';
import { AnswersService    } from '../discussion-system/answers/answers.service';
import { CreateCourseDto   } from './create-course.dto';
import { CommentResponse   } from '../../models/responses/comment.response';
import { CreateAnswerDto   } from '../discussion-system/answers/dto/create-answer.dto';
import { CommentsService   } from '../discussion-system/comments/comments.service';
import { CreateCommentDto  } from '../discussion-system/comments/dto/create-comment.dto';
import { LearnedLetterForm } from '../../models/forms/learned-letter-form.model';
import { CreateAnswersGroupDto  } from '../discussion-system/answers/dto/create-answers-group.dto';
import { LearnedLettersService  } from '../reading-course/learned-letters/learned-letters.service';
import { CreateCommentsGroupDto } from '../discussion-system/comments/dto/create-comments-group.dto';
import { CreateLearnedLetterDto } from '../reading-course/learned-letters/dto/create-learned-letter.dto';
import { CourseResponse, courseResponseFactory } from '../../models/responses/course.response.model';

@Controller(CoursesRoutes.baseUrl)
export class CoursesController {

  constructor(
    private readonly courseService: CoursesService,
    private readonly answerService: AnswersService,
    private readonly commentService: CommentsService,
    private readonly learnedLetterService: LearnedLettersService,
  ) {}



  @Get()
  async getCourses(): Promise<CourseResponse[]> {

    const coursesList = await this.courseService.getAllCourses();
    const courses = coursesList.map(c => courseResponseFactory(c));

    return courses;

  }



  @Post()
  async saveNewCourse(@Body() body: CreateCourseDto): Promise<CourseResponse> {

    const course = new CreateCourseDto(
      body.title,
      body.subtitle,
      body.imageUrl,
      body.urlVideo,
      body.description,
      );

    const savedCourse  = await this.courseService.saveCourse(course);
    const commentGroup = new CreateCommentsGroupDto(savedCourse.id, []);

    const comments = await this.commentService.createCommentsGroup(commentGroup);

    return courseResponseFactory(savedCourse);

  }



  @Get(CoursesRoutes.course)
  async getCourseDetail( @Param('courseName') courseName: string ): Promise<CourseResponse> {

    const courseDetail = await this.courseService.getCourse(courseName);
    return courseResponseFactory(courseDetail);

  }



  @Get(CoursesRoutes.comments)
  async getCourseComments( @Param('courseName') courseName: string ): Promise<CommentResponse[]> {

    const course = await this.courseService.getCourseByName(courseName);
    const commentsGroup = await this.commentService.getCommentsGroup(course.id);
    const comments = commentsGroup.comments.map((c) => CommentResponse.parseWithoutTempId(c) );

    // TODO Remove answersGroup

    return comments;

  }



  @Post(CoursesRoutes.comments)
  async addCourseComment( @Body() body: CommentForm ) {

    const idAnswers = new mongoose.Types.ObjectId();
    const idComment = new mongoose.Types.ObjectId();
    const userId    = new mongoose.Types.ObjectId(body.userId);

    const newComment = new CreateCommentDto( idComment, body.date, body.text, userId, idAnswers );
    await this.commentService.addComment( newComment, body.courseId );

    const answersGroup = new CreateAnswersGroupDto( idAnswers, idComment, [] );
    await this.answerService.addAnswersGroup(answersGroup);

    const comment = await this.commentService.getCommentDetail(body.courseId, `${idComment}`);
    return CommentResponse.parseWithTempId(comment, body.tempId);

  }



  @Get(CoursesRoutes.comment)
  async getCommentdetail( @Param('courseName') courseName: string, @Param('commentId') commentId: string ): Promise<CommentResponse> {

    const course = await this.courseService.getCourse(courseName);
    const comment = await this.commentService.getCommentDetail(course.id, commentId);

    if (!comment) {
      throw new NotFoundException('recurso no encontrado');
    }

    return CommentResponse.parseWithoutTempId(comment);

  }

  

  @Delete(CoursesRoutes.comment)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(

    @Param('courseName') courseName: string,
    @Param('commentId') commentId: string,
    @Req() req: Request,

  ): Promise<void> {


    const user = decodeToken(req);
    const course = await this.courseService.getCourseByName(courseName);
    const comment = await this.commentService.getCommentDetail(course.id, commentId);
    

    if ( comment.user.id !== user.id) {
      throw new UnauthorizedException('No eres el propietario de este comentario');
    }
    

    const hasAnswers = await this.answerService.commentHasAswers(commentId);


    if ( hasAnswers ) {
      throw new BadRequestException('Comment has answers.');
    }


    await this.commentService.removeComment(course.id, commentId, user.id);
    await this.answerService.removeAnswersGroup(commentId);

    return;

  }



  @Get(CoursesRoutes.answers)
  async getAnswersComment( @Param('commentId') commentId: string ): Promise<AnswerResponse[]> {

    const answerGroup = await this.answerService.getAnswers(commentId);
    const answers = AnswerResponse.parseAnswersList(answerGroup.answers);

    return answers;

  }



  @Post(CoursesRoutes.answers)
  async addAnswerComment( @Param('commentId') commentId: string, @Body() body: AnswerForm ): Promise<AnswerResponse> {

    const userId = mongoose.Types.ObjectId(body.userId);
    const answerId = mongoose.Types.ObjectId();
    const answerToSave = new CreateAnswerDto(answerId, body.date, body.text, userId );

    await this.answerService.addAnswer(answerToSave, commentId);
    const answer = await this.answerService.getAnswerDetail(commentId, `${answerId}`);

    return AnswerResponse.parseWithTempId(answer, body.tempId);

  }



  @Get(CoursesRoutes.answer)
  async getAnswer( @Param('commentId') commentId: string, @Param('answerId')   answerId: string ): Promise<AnswerResponse> {

    const answer = await this.answerService.getAnswerDetail(commentId, answerId);

    if (!answer) {
      throw new NotFoundException(
        `El comentario: ${commentId} no contiene la respuesta: ${answerId}`,
      );
    }

    return AnswerResponse.parseWithoutTempId(answer);

  }



  @Delete(CoursesRoutes.answer)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAnswer(

    @Param('courseName') courseName: string,
    @Param('commentId')  commentId: string,
    @Param('answerId')   answerId: string,
    @Req() req: Request,

  ): Promise<void> {

    const user  = await decodeToken(req);
    const course = await this.courseService.getCourseByName( courseName );
    const answer = await this.answerService.getAnswerDetail( commentId, answerId );

    if ( answer.user.id !== user.id ) {
      throw new UnauthorizedException('No eres el propietario de este comentario');
    }

    await this.answerService.removeAnswer(commentId, answerId, user.id);
    return;

  }



  @Get(CoursesRoutes.learnedLetters)
  async getLearnedLetters( @Param('userId') userId: string ): Promise<LearnedLetter[]> {

    return await this.learnedLetterService.getLearnedLetters(userId);

  }



  @Post(CoursesRoutes.learnedLetters)
  @HttpCode(HttpStatus.CREATED)
  async addLearnedLetter( @Param('userId') userId: string, @Body() body: LearnedLetterForm ) {

    
    const maxRating = 5;
    const letter  = body.letter;
    const rating  = body.rating;
    const lLetter = new CreateLearnedLetterDto(letter, rating);
    const valid   = this.learnedLetterService.validate(lLetter);
    
    
    if (!valid) {
      throw new UnauthorizedException('Invalid Data');
    }
    

    const data = await this.learnedLetterService.existLearnedLetter(userId, letter);


    if (!data) {

      await this.learnedLetterService.addLearnedLetter(lLetter, userId);
      return new AppResponse(201, 'Creado');

    }


    if (data) {


      if (rating <= data.learnedLetter.rating || rating > maxRating) {

        return new AppResponse(200, 'OK')

      }


      const learnedLetters = data.learnedLetters.map(el => {
        return el.letter === letter ? lLetter : new CreateLearnedLetterDto(el.letter, el.rating);
      });

      await this.learnedLetterService.updateLearnedLetter(learnedLetters, userId);
      return new AppResponse(200, 'Actualizado');      

    }


  }



}
