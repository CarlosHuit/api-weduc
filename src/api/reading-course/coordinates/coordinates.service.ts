import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coordinate } from './interfaces/coordinate.interfaces';
import { CreateCoordinateDto } from './create-coordinate.dto';

@Injectable()
export class CoordinatesService {

  constructor(
    @InjectModel('Coordinate') private readonly coordinateModel: Model<Coordinate>,
  ) {}

  async getCoordinates(): Promise<Coordinate[]> {

    return await this.coordinateModel.find({}, { __v: 0, _id: 0 });

  }

  async getCoordinate(letter: string): Promise<Coordinate> {

    return await this.coordinateModel.findOne({ letter }, { __v: 0, _id: 0 });

  }

  async saveCoordinate(createCoordinateDto: CreateCoordinateDto): Promise<Coordinate> {

    const coordinate = new this.coordinateModel(createCoordinateDto);
    return coordinate.save();

  }

  async hasData(): Promise<boolean> {

    const count = await this.coordinateModel.countDocuments({});
    return count > 0 ? true : false;

  }

}
