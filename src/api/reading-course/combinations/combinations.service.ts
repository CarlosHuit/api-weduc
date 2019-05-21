import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Combination } from './interfaces/combination.interface';
import { CreateCombinationDto } from './create-combination.dto';

@Injectable()
export class CombinationsService {

  constructor(
    @InjectModel('Combination') private readonly combinationModel: Model<Combination>,
  ) {}

  async existCombination(letter: string): Promise<boolean> {

    const count = await this.combinationModel.countDocuments({ letter });
    return count > 0 ? true : false;

  }

  async saveCombination( createCombinationDto: CreateCombinationDto ): Promise<Combination> {

    const combination = new this.combinationModel(createCombinationDto);
    return await combination.save();

  }

  async getAllCombinations(): Promise<Combination[]> {

    return await this.combinationModel.find({}, {__v: 0, _id: 0});

  }

  async getCombinationByLetter(letter: string): Promise<Combination> {

    return await this.combinationModel.findOne({ letter }, { __v: 0, _id: 0 });

  }

  async hasData(): Promise<boolean> {

    const count = await this.combinationModel.countDocuments({});
    return count > 0 ? true : false;

  }

}
