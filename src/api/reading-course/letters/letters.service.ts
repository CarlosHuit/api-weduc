import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Letter } from './interfaces/letter.interface';
import { CreateLetterDto } from './create-letter.dto';

@Injectable()
export class LettersService {

  constructor(
    @InjectModel('Letter') private readonly letterModel: Model<Letter>,
  ) {}

  async getLetters(): Promise<Letter[]> {
    return await this.letterModel.find();
  }

  async saveLetter(createLetterDto: CreateLetterDto): Promise<Letter> {

    const letter = new this.letterModel(createLetterDto);
    return await letter.save();

  }

  async hasData(): Promise<boolean> {

    const count = await this.letterModel.countDocuments({});
    return count > 0 ? true : false;

  }

}
