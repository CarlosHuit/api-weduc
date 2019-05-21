import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schemas/auth.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LearnedLettersModule } from '../reading-course/learned-letters/learned-letters.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports:     [
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    UsersModule,
    LearnedLettersModule,
    CoursesModule,
  ],
  controllers: [ AuthController ],
  providers:   [ AuthService ],
})

export class AuthModule {}
