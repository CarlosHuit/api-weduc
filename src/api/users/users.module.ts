import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UserValidationMiddleware } from '../../middleware/user-validation.middleware';

@Module({
  imports:     [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]) ],
  controllers: [ UsersController ],
  providers:   [ UsersService ],
  exports:     [ UsersService ],
})
export class UsersModule implements NestModule {

  configure(consumer: MiddlewareConsumer): void {

    consumer
      .apply(AuthMiddleware, UserValidationMiddleware)
      .forRoutes('api/users');

  }

}
