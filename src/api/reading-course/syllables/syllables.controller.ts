import { Controller, Get, Param, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { Syllable } from './interfaces/syllable.interface';
import { SyllablesService } from './syllables.service';
import { CreateSyllableDto } from './create-syllable.dto';
import { RCRoutes } from '../reading-course.routes';

@Controller(RCRoutes.syllables)
export class SyllablesController {

  constructor( private readonly syllableService: SyllablesService ) {}

  @Get()
  async getAllSyallbles(): Promise<Syllable[]> {

    return this.syllableService.getAllSyllables();

  }

  @Get(':letter')
  async getSyllable(@Param('letter') letter: string): Promise<Syllable> {

    const syllable = await this.syllableService.getSyllablesByLetter(letter);

    if (!syllable) {
      throw new NotFoundException('No existen registros');
    }

    return syllable;

  }

  @Post()
  async saveSyllable(): Promise<Syllable> {

    const syllable: CreateSyllableDto = {
      letter: 'a',
      syllables: [
        [ 'ar', 'pa' ],
        [ 'ar', 'di', 'lla' ],
        [ 'a', 'ni', 'llo' ],
      ],
    };

    const exist = await this.syllableService.existSyllable(syllable.letter);

    if ( exist ) {
      throw new UnauthorizedException('Registro ya existe');
    }

    return await this.syllableService.createSyllable(syllable);

  }

}
