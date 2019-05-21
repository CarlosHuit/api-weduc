import { Controller, Get, Param } from '@nestjs/common';
import { CoordinatesService } from './coordinates.service';
import { Coordinate } from './interfaces/coordinate.interfaces';
import { RCRoutes } from '../reading-course.routes';

@Controller(RCRoutes.coordinates)
export class CoordinatesController {

  constructor( private readonly coordinateService: CoordinatesService ) {}

  @Get()
  async getCoordinates(): Promise<Coordinate[]> {

    return await this.coordinateService.getCoordinates();

  }

  @Get(':letter')
  async getCoordinate(@Param('letter') letter: string): Promise<Coordinate> {
    return await this.coordinateService.getCoordinate(letter);
  }

  // @Post()
  // async saveCoordinate(): Promise<Coordinate> {

  //   return this.coordinateService.saveCoordinate(coordinate);

  // }

}
