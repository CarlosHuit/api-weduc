import { Document } from 'mongoose';

export interface Syllable extends Document {
  readonly letter: string;
  readonly syllables: string[][];
}
