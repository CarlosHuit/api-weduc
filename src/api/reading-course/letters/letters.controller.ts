import { Controller, Get, Post } from '@nestjs/common';
import { LettersService } from './letters.service';
import { Letter } from './interfaces/letter.interface';
import { RCRoutes } from '../reading-course.routes';
import { letters } from '../data';

@Controller(RCRoutes.letters)
export class LettersController {

  constructor(private readonly lettersService: LettersService) { }

  // @Post()
  // async saveLetter() {

  //   return await this.lettersService.saveLetter(letters);

  // }

  @Get()
  async getLetters(): Promise<Letter[]> {

    return await this.lettersService.getLetters();

  }

}
