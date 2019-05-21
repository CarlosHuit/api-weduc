import { Module   } from '@nestjs/common';
import { mongoURL  } from './config';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { AdminModule  } from './api/admin/admin.module';
import { WordsModule   } from './api/reading-course/words/words.module';
import { CoursesModule  } from './api/courses/courses.module';
import { LettersModule   } from './api/reading-course/letters/letters.module';
import { CommentsModule   } from './api/discussion-system/comments/comments.module';
import { MongooseModule    } from '@nestjs/mongoose';
import { SyllablesModule    } from './api/reading-course/syllables/syllables.module';
import { CoordinatesModule   } from './api/reading-course/coordinates/coordinates.module';
import { CombinationsModule   } from './api/reading-course/combinations/combinations.module';
import { SimilarLettersModule  } from './api/reading-course/similar-letters/similar-letters.module';
import { LearnedLettersModule   } from './api/reading-course/learned-letters/learned-letters.module';
import { ReadingCourseDataModule } from './api/reading-course/data/reading-course-data.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      mongoURL,
      { useNewUrlParser: true },
    ),
    AuthModule,
    AdminModule,
    UsersModule,
    WordsModule,
    CoursesModule,
    LettersModule,
    CommentsModule,
    SyllablesModule,
    CoordinatesModule,
    CombinationsModule,
    SimilarLettersModule,
    LearnedLettersModule,
    ReadingCourseDataModule,
  ],
})

export class AppModule { }
