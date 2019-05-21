import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LearnedLettersModule  } from '../reading-course/learned-letters/learned-letters.module';
import { SimilarLettersModule } from '../reading-course/similar-letters/similar-letters.module';
import { CombinationsModule  } from '../reading-course/combinations/combinations.module';
import { CoordinatesModule  } from '../reading-course/coordinates/coordinates.module';
import { SyllablesModule   } from '../reading-course/syllables/syllables.module';
import { AdminController  } from './admin.controller';
import { RootMiddleware  } from '../../middleware/root.middleware';
import { CoursesModule  } from '../courses/courses.module';
import { LettersModule } from '../reading-course/letters/letters.module';
import { WordsModule  } from '../reading-course/words/words.module';

@Module({
  imports: [
    SimilarLettersModule,
    CombinationsModule,
    CoordinatesModule,
    SyllablesModule,
    LettersModule,
    WordsModule,
    CoursesModule,
    LearnedLettersModule,
  ],
  controllers: [AdminController],
  providers: [],
})

export class AdminModule implements NestModule {

  configure(consumer: MiddlewareConsumer): void {

    consumer
      .apply( RootMiddleware )
      .forRoutes('api/admin');

  }

}
