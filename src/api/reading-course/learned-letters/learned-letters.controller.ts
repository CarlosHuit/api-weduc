import { Controller } from '@nestjs/common';
import { LearnedLettersService } from './learned-letters.service';

@Controller('api/learned-letters')
export class LearnedLettersController {

  constructor(
    private readonly learnedLetterService: LearnedLettersService
    ) { }

}
