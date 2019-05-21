import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word } from './interfaces/word.interface';
import { CreateWordDto } from './create-word.dto';

@Injectable()
export class WordsService {

  constructor(
    @InjectModel('Word') private readonly wordModel: Model<Word>,
  ) {}

  async getAllWords(): Promise<Word[]> {

    return await this.wordModel.find({}, { __v: 0, _id: 0 });

  }

  async getWordsByLetter(letter: string): Promise<Word> {

    return await this.wordModel.findOne({ letter }, { __v: 0, _id: 0 });

  }

  async saveWord(createWordDto: CreateWordDto): Promise<Word> {

    const word = new this.wordModel(createWordDto);
    return await word.save();

  }

  async existWord(letter: string): Promise<boolean> {

    const count = await this.wordModel.countDocuments({ letter });
    return count > 0 ? true : false;

  }

  async hasData(): Promise<boolean> {

    const count = await this.wordModel.countDocuments({});
    return count > 0 ? true : false;

  }

}
