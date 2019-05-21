import { Module } from '@nestjs/common';
import { LearnedLettersController } from './learned-letters.controller';
import { LearnedLettersService } from './learned-letters.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LearnedLettersSchema } from './schemas/learned-letters.schema';

@Module({
  imports:     [ MongooseModule.forFeature([{ name: 'LearnedLetter', schema: LearnedLettersSchema }]) ],
  controllers: [ LearnedLettersController ],
  providers:   [ LearnedLettersService ],
  exports:     [ LearnedLettersService ],
})

export class LearnedLettersModule {}
