import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Syllable } from './interfaces/syllable.interface';
import { CreateSyllableDto } from './create-syllable.dto';

@Injectable()
export class SyllablesService {

  constructor(
    @InjectModel('Syllable') private readonly syllableModel: Model<Syllable>,
  ) {}

  async existSyllable( letter: string ): Promise<boolean> {

    const count = await this.syllableModel.countDocuments({ letter });
    return count > 0 ? true : false;

  }

  async getAllSyllables(): Promise<Syllable[]> {

    return await this.syllableModel.find({}, { __v: 0, _id: 0 });

  }

  async getSyllablesByLetter( letter: string ): Promise<Syllable> {

    return await this.syllableModel.findOne({ letter }, { __v: 0, _id: 0 });

  }

  async createSyllable(createSyllableDto: CreateSyllableDto): Promise<Syllable> {

    const syllable = new this.syllableModel(createSyllableDto);
    return await syllable.save();

  }

  async hasData(): Promise<boolean> {

    const count = await this.syllableModel.countDocuments({});
    return count > 0 ? true : false;

  }

}
