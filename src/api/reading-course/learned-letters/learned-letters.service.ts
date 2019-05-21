import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CreateLearnedLetterDto } from './dto/create-learned-letter.dto';
import { CreateLearnedLettersDto } from './dto/create-learned-letters.dto';
import { LearnedLetter } from './interfaces/learned-letter.interface';
import { LearnedLetters } from './interfaces/learned-letters.interface';

@Injectable()
export class LearnedLettersService {

  constructor(
    @InjectModel('LearnedLetter') private readonly learnedLetterModel: Model<LearnedLetters>,
  ) { }


  async initialize(userId: string): Promise<LearnedLetters> {

    const learnedLetter    = new CreateLearnedLettersDto(new mongoose.Types.ObjectId(userId), []);
    const newLearnedLetter = new this.learnedLetterModel(learnedLetter);

    return await newLearnedLetter.save();

  }


  async existUserProgress(userId: string) {

    const count = await this.learnedLetterModel.countDocuments({ user: userId });
    return count > 0 ? true : false;

  }


  async existLearnedLetter(user: string, letter: string)/* : Promise<LearnedLetter[]>  */{

    const data = await this.learnedLetterModel.findOne({ user });
    const learnedLetters = data.learnedLetters;
    const learnedLetter  = learnedLetters.find(el => el.letter === letter);

    if (!learnedLetter) { return null; }

    return { learnedLetters, learnedLetter };

  }


  async addLearnedLetter(createLearnedLetterDto: CreateLearnedLetterDto, user: string): Promise<LearnedLetters> {

    return await this.learnedLetterModel.findOneAndUpdate(
      { user },
      {
        $push: {
          learnedLetters: createLearnedLetterDto,
        },
      },
    );

  }


  async updateLearnedLetter(learnedLetters: CreateLearnedLetterDto[], userId: string): Promise<LearnedLetters> {

    return await this.learnedLetterModel.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          learnedLetters
        }
      },
      { new: true },
    );

  }


  async getLearnedLetters(userId: string): Promise<LearnedLetter[]> {

    const data = await this.learnedLetterModel.findOne({ user: userId });
    return data.learnedLetters;

  }

  validate(data: CreateLearnedLetterDto): boolean {

    const maxRating = 5;
    const alphabet  = 'abcdefghijklmnñopqrstuvwxyz';
    const valRating = data.rating <= maxRating;
    const valLetter = alphabet.includes(data.letter);

    return valLetter === true && valRating === true;

  }


}
