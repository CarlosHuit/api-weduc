import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ReadingCourseDataResponse } from '../../../models/responses/reading-course/reading-course-data.response';
import { LearnedLettersService   } from '../learned-letters/learned-letters.service';
import { SimilarLettersService } from '../similar-letters/similar-letters.service';
import { CoordinatesService } from '../coordinates/coordinates.service';
import { LettersService  } from '../letters/letters.service';
import { WordsService } from '../words/words.service';
import { RCRoutes  } from '../reading-course.routes';

@Controller(RCRoutes.data)
export class ReadingCourseDataController {


  constructor(
    public readonly similarLetterService: SimilarLettersService,
    public readonly learnedLetterService: LearnedLettersService,
    public readonly coordinateService: CoordinatesService,
    public readonly letterService: LettersService,
    public readonly wordService: WordsService,
  ) { }


  @Get(':userId')
  async getInitialData(@Param('userId') userId: string) {

    const words = await this.wordService.getAllWords();
    const coordinates    = await this.coordinateService.getCoordinates();
    const lettersList    = await this.letterService.getLetters();
    const learnedLetters = await this.learnedLetterService.getLearnedLetters(userId);
    const similarLetters = await this.similarLetterService.getAllSimilarLetters();
    const letters = lettersList[0];

    return ReadingCourseDataResponse.parse(
      words,
      coordinates,
      letters,
      learnedLetters,
      similarLetters
    );    

  }


  @Post()
  async getReadingCourseData(@Body() body: { userId: string }) {

    const words = await this.wordService.getAllWords();
    const coordinates    = await this.coordinateService.getCoordinates();
    const lettersList    = await this.letterService.getLetters();
    const learnedLetters = await this.learnedLetterService.getLearnedLetters(body.userId);
    const similarLetters = await this.similarLetterService.getAllSimilarLetters();
    const letters = lettersList[0];

    return ReadingCourseDataResponse.parse(
      words,
      coordinates,
      letters,
      learnedLetters,
      similarLetters
    );    

  }


}
