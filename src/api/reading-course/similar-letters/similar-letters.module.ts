import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../../users/users.module';
import { SimilarLetterSchema } from './schemas/similar-letter.schema';
import { SimilarLettersController } from './similar-letters.controller';
import { SimilarLettersService } from './similar-letters.service';

@Module({
  imports:     [
    MongooseModule.forFeature([{ name: 'SimilarLetter', schema: SimilarLetterSchema }]),
    UsersModule,
  ],
  controllers: [ SimilarLettersController ],
  providers:   [ SimilarLettersService ],
  exports:     [ SimilarLettersService ],
})

export class SimilarLettersModule { }
