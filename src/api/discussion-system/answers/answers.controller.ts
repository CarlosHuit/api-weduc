import { Controller, Get } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {

  constructor( private readonly answerService: AnswersService ) {}

}
