
import { Controller, Get, Param, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { WordsService } from './words.service';
import { Word } from './interfaces/word.interface';
import { CreateWordDto } from './create-word.dto';
import { RCRoutes } from '../reading-course.routes';

@Controller(RCRoutes.words)
export class WordsController {

  constructor( private readonly wordService: WordsService ) {}

  @Get()
  async getAllWods(): Promise<Word[]> {

    return await this.wordService.getAllWords();

  }

  @Get(':letter')
  async getWordsByLetter(@Param('letter') letter: string): Promise<Word> {

    const words = await this.wordService.getWordsByLetter(letter);

    if ( !words ) {
      throw new NotFoundException('No existe el registro.');
    }

    return words;

  }

  @Post()
  async createWord(): Promise<Word> {

    const word: CreateWordDto = {
      letter:  'a',
      words: [ 'aguacate', 'avión', 'abeja', 'agua', 'anillo', 'arpa', 'ardilla' ],
    };

    const existDoc = await this.wordService.existWord(word.letter);

    if (existDoc) {
      throw new UnauthorizedException('Registro ya existe');
    }

    return await this.wordService.saveWord(word);

  }

}
