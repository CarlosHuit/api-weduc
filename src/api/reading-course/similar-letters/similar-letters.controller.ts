import { Controller, Get, Post, Param, NotFoundException } from '@nestjs/common';
import { SimilarLettersService } from './similar-letters.service';
import { SimilarLetter } from './interfaces/similar-letter.interface';
import { CreateSimilarLetterDto } from './create-similar-letter.dto';
import { RCRoutes } from '../reading-course.routes';

@Controller(RCRoutes.similarLetters)
export class SimilarLettersController {

  constructor(
    private readonly similarLetterService: SimilarLettersService,
  ) {}

  @Post()
  async saveSimilarLetters(): Promise<SimilarLetter> {

    const sm: CreateSimilarLetterDto = {
      letter: 'a',
      similarLetters: ['k', 'g', 'd', 'o', 'b', 'p', 'q'],
    };

    return await this.similarLetterService.saveSimilarLetter(sm);

  }

  @Get()
  async getAllSimilarLetters(): Promise<SimilarLetter[]> {

    return await this.similarLetterService.getAllSimilarLetters();

  }

  @Get(':letter')
  async getSimilarLetters(@Param('letter') letter: string): Promise<SimilarLetter> {

    const sm = await this.similarLetterService.getSimilarLettersByLetter(letter);

    if (!sm) {
      throw new NotFoundException('No existen registros');
    }

    return sm;

  }

}
