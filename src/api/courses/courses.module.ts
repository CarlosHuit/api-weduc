import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UserValidationMiddleware } from '../../middleware/user-validation.middleware';
import { AnswersModule } from '../discussion-system/answers/answers.module';
import { CommentsModule } from '../discussion-system/comments/comments.module';
import { LearnedLettersModule } from '../reading-course/learned-letters/learned-letters.module';
import { UsersModule } from '../users/users.module';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseSchema } from './schemas/course.schema';

@Module({
  imports:     [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
    CommentsModule,
    AnswersModule,
    UsersModule,
    LearnedLettersModule,
  ],
  controllers: [ CoursesController ],
  providers:   [ CoursesService ],
  exports:     [ CoursesService ],
})

export class CoursesModule implements NestModule {

  configure(consumer: MiddlewareConsumer): void {

    consumer
      .apply( AuthMiddleware, UserValidationMiddleware )
      .forRoutes('api/courses');

  }

}
