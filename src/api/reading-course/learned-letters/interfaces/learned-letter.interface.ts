import { Document } from 'mongoose';

export interface LearnedLetter extends Document {
  readonly letter: string;
  readonly rating: number;
}
