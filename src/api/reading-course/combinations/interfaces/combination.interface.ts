import { Document } from 'mongoose';

export interface Syllable {
  readonly w: string;
  readonly p: string;
}

export interface Combinations {
  readonly word: string;
  readonly syllable: Syllable;
  readonly syllables: string[];
  readonly combination: string;
}

export interface Combination extends Document {
  readonly letter: string;
  readonly combinations: Combinations[];
}
