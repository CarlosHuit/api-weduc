import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../../users/users.module';
import { WordSchema } from './schemas/word.schema';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  imports:     [
    MongooseModule.forFeature([ { name: 'Word', schema: WordSchema } ]),
    UsersModule,
  ],
  controllers: [ WordsController ],
  providers:   [ WordsService ],
  exports:     [ WordsService ],
})

export class WordsModule { }
