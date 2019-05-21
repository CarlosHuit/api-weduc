import { Controller, Get, Param, Post, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Combination } from './interfaces/combination.interface';
import { CombinationsService } from './combinations.service';
import { CreateCombinationDto } from './create-combination.dto';
import { RCRoutes } from '../reading-course.routes';

@Controller(RCRoutes.combinations)
export class CombinationsController {

   constructor(private readonly combinationService: CombinationsService) {}

  @Get()
  async getAllCombinations(): Promise<Combination[]> {

    return await this.combinationService.getAllCombinations();

  }

  @Get(':letter')
  async getCombination(@Param('letter') letter: string): Promise<Combination> {

    const combination = await this.combinationService.getCombinationByLetter(letter);

    if (!combination) {
      throw new NotFoundException('datos no encontrados');
    }

    return combination;

  }

  @Post()
  async saveCombination(): Promise<Combination> {

    const t: CreateCombinationDto =   {
      letter: 'b',
      combinations: [
        {
          combination: 'ba',
          syllable:    {w: 'ba', p: 'ba'},
          word:        'barco',
          syllables:   ['ba', 'rco'],
        },
        {
          combination: 'be',
          syllable:    {w: 'be', p: 've'},
          word:        'becerro',
          syllables:   ['be', 'cerro'],
        },
        {
          combination: 'bi',
          syllable:    {w: 'bi', p: 'bi'},
          word:        'bicicleta',
          syllables:   ['bi', 'cicleta'],
        },
        {
          combination: 'bo',
          syllable:    {w: 'bo', p: 'bo'},
          word:        'bota',
          syllables:   ['bo', 'ta'],
        },
        {
          combination: 'bu',
          syllable:    {w: 'bu', p: 'bu'},
          word:        'burro',
          syllables:   ['bu', 'rro'],
        },
      ],
    };

    const existCombination = await this.combinationService.existCombination(t.letter);

    if (existCombination) {
      throw new UnauthorizedException('Registro ya existe, actualice');
    }

    return await this.combinationService.saveCombination(t);

  }

}
