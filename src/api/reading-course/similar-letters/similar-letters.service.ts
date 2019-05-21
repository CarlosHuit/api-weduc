import { Injectable } from '@nestjs/common';
import { SimilarLetter } from './interfaces/similar-letter.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSimilarLetterDto } from './create-similar-letter.dto';

@Injectable()
export class SimilarLettersService {

  constructor(
    @InjectModel('SimilarLetter') private readonly similarLetterModel: Model<SimilarLetter>,
  ) {}

  async saveSimilarLetter(createSimilarLetterDto: CreateSimilarLetterDto): Promise<SimilarLetter> {

    const similarLetter = new this.similarLetterModel(createSimilarLetterDto);
    return await similarLetter.save();

  }

  async getAllSimilarLetters(): Promise<SimilarLetter[]> {

    return await this.similarLetterModel.find({}, {__v: 0, _id: 0});

  }

  async getSimilarLettersByLetter(letter: string): Promise<SimilarLetter> {

    return await this.similarLetterModel.findOne({ letter }, { __v: 0, _id: 0 });

  }

  async hasData(): Promise<boolean> {

    const count = await this.similarLetterModel.countDocuments({});
    return count > 0 ? true : false;

  }

}
