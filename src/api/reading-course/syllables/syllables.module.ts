import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../../users/users.module';
import { SyllableSchema } from './schemas/syllable.schema';
import { SyllablesController } from './syllables.controller';
import { SyllablesService } from './syllables.service';

@Module({
  imports:     [
    MongooseModule.forFeature([{ name: 'Syllable', schema: SyllableSchema }]),
    UsersModule,
  ],
  controllers: [ SyllablesController ],
  providers:   [ SyllablesService ],
  exports:     [ SyllablesService ],
})

export class SyllablesModule { }
