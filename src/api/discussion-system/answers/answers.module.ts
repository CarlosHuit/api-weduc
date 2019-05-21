import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswersController } from './answers.controller';
import { AnswersGroupSchema } from './schemas/answers-goup.schemas';
import { AnswersService } from './answers.service';
import { AuthMiddleware } from '../../../middleware/auth.middleware';
import { UserValidationMiddleware } from '../../../middleware/user-validation.middleware';
import { UsersModule } from '../../users/users.module';

@Module({
  imports:     [
    MongooseModule.forFeature([ { name: 'Answer', schema: AnswersGroupSchema } ]),
    UsersModule,
  ],
  controllers: [ AnswersController ],
  providers:   [ AnswersService ],
  exports:     [ AnswersService ],
})
export class AnswersModule implements NestModule {

  configure(consumer: MiddlewareConsumer): void {

    consumer
      .apply( AuthMiddleware, UserValidationMiddleware )
      .forRoutes('api/answers');

  }

}
