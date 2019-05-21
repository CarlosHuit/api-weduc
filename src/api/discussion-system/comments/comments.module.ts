import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsGroupSchema } from './schemas/comments-group.schema';
import { AuthMiddleware } from '../../../middleware/auth.middleware';
import { UserValidationMiddleware } from '../../../middleware/user-validation.middleware';
import { UsersModule } from '../../users/users.module';

@Module({
  imports:     [
    MongooseModule.forFeature([ { name: 'Comment', schema: CommentsGroupSchema } ]),
    UsersModule,
  ],
  controllers: [ CommentsController ],
  providers:   [ CommentsService ],
  exports:     [ CommentsService ],
})
export class CommentsModule implements NestModule {

  configure(consumer: MiddlewareConsumer): void {

    consumer
      .apply( AuthMiddleware, UserValidationMiddleware )
      .forRoutes('api/comments');

  }

}
