import { ReadingCourseDataController } from './reading-course-data.controller';
import { LearnedLettersModule } from '../learned-letters/learned-letters.module';
import { SimilarLettersModule } from '../similar-letters/similar-letters.module';
import { CombinationsModule } from '../combinations/combinations.module';
import { CoordinatesModule } from '../coordinates/coordinates.module';
import { SyllablesModule } from '../syllables/syllables.module';
import { CoursesModule } from '../../courses/courses.module';
import { LettersModule } from '../letters/letters.module';
import { WordsModule } from '../words/words.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SimilarLettersModule,
    LearnedLettersModule,
    CombinationsModule,
    CoordinatesModule,
    SyllablesModule,
    LettersModule,
    CoursesModule,
    WordsModule,
  ],
  controllers: [ ReadingCourseDataController ],
})

export class ReadingCourseDataModule {}
