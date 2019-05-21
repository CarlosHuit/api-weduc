import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../../users/users.module';
import { LettersController } from './letters.controller';
import { LettersService } from './letters.service';
import { LetterSchema } from './schemas/letter.schema';

@Module({
  imports:     [
    MongooseModule.forFeature([{ name: 'Letter', schema: LetterSchema }]),
    UsersModule,
  ],
  controllers: [ LettersController ],
  providers:   [ LettersService ],
  exports:     [ LettersService ],
})

export class LettersModule { }
