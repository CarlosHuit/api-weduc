import { Document } from 'mongoose';

export interface SimilarLetter extends Document {
  readonly letter: string;
  readonly similarLetters: string[];
}
