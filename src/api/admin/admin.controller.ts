import { similarLettersList, combinationsList, coordinatesList, syllablesList, letters, coursesList, wordsList } from '../reading-course/data';
import { Controller, HttpCode, HttpStatus, InternalServerErrorException, Post, UnauthorizedException } from '@nestjs/common';
import { CreateCommentsGroupDto  } from '../discussion-system/comments/dto/create-comments-group.dto';
import { SimilarLettersService  } from '../reading-course/similar-letters/similar-letters.service';
import { LearnedLettersService } from '../reading-course/learned-letters/learned-letters.service';
import { CombinationsService  } from '../reading-course/combinations/combinations.service';
import { CoordinatesService  } from '../reading-course/coordinates/coordinates.service';
import { SyllablesService   } from '../reading-course/syllables/syllables.service';
import { CommentsService   } from '../discussion-system/comments/comments.service';
import { CoursesService   } from '../courses/courses.service';
import { LettersService  } from '../reading-course/letters/letters.service';
import { WordsService   } from '../reading-course/words/words.service';
import { AdminRoutes   } from './admin.routes';

@Controller(AdminRoutes.baseUrl)
export class AdminController {


  constructor(
    public readonly similarLetterService: SimilarLettersService,
    public readonly learnedLetterService: LearnedLettersService,
    public readonly combinationService: CombinationsService,
    public readonly coordinateService: CoordinatesService,
    public readonly syllableService: SyllablesService,
    public readonly commentService: CommentsService,
    public readonly courseService: CoursesService,
    public readonly letterService: LettersService,
    public readonly wordService: WordsService,
  ) { }


  @Post(AdminRoutes.RCSaveData)
  @HttpCode(HttpStatus.CREATED)
  async saveInitialData() {

    const canSaveData = await this.canSaveData();

    if (!canSaveData) {
      throw new UnauthorizedException('Data exist on database');
    }

    try {

      await this.saveSimilarLetters();
      await this.saveCombinations();
      await this.saveCoordinates();
      await this.saveSyllables();
      await this.saveCourses();
      await this.saveLetters();
      await this.saveWords();

      return 'Reading Course Data Saved';

    } catch (error) {

      throw new InternalServerErrorException('An error as ocurred when save reading course data');

    }

  }


  async saveSimilarLetters(): Promise<void> {

    for (const e of similarLettersList) {
      await this.similarLetterService.saveSimilarLetter(e);
    }

  }


  async saveCombinations(): Promise<void> {

    for (const e of combinationsList) {
      await this.combinationService.saveCombination(e);
    }

  }


  async saveCoordinates(): Promise<void> {

    for (const e of coordinatesList) {
      await this.coordinateService.saveCoordinate(e);
    }

  }


  async saveSyllables(): Promise<void> {

    for (const e of syllablesList) {
      await this.syllableService.createSyllable(e);
    }

  }


  async saveLetters(): Promise<void> {

    await this.letterService.saveLetter(letters);

  }


  async saveCourses(): Promise<void> {

    for (const e of coursesList) {

      const savedCourse = await this.courseService.saveCourse(e);
      const commentGroup = new CreateCommentsGroupDto(savedCourse.id, []);

      await this.commentService.createCommentsGroup(commentGroup);

    }

  }


  async saveWords(): Promise<void> {

    for (const e of wordsList) {
      await this.wordService.saveWord(e);
    }

  }


  async canSaveData(): Promise<boolean> {

    const v1 = await this.similarLetterService.hasData();
    const v2 = await this.combinationService.hasData();
    const v3 = await this.coordinateService.hasData();
    const v4 = await this.syllableService.hasData();
    const v5 = await this.commentService.hasData();
    const v6 = await this.courseService.hasData();
    const v7 = await this.letterService.hasData();
    const v8 = await this.wordService.hasData();

    const v = !v1 && !v2 && !v3 && !v4 && !v5 && !v6 && !v7 && !v8 ? true : false;

    return v;

  }

}
