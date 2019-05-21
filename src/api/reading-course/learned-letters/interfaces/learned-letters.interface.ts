import { Document } from 'mongoose';
import { LearnedLetter } from './learned-letter.interface';

export interface LearnedLetters extends Document {
  readonly user: string;
  readonly learnedLetters: LearnedLetter[];
}
