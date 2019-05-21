import { Document } from 'mongoose';

interface Combination {
  readonly w: string;
  readonly p: string;
}

interface AlphabetCombination {
  readonly letter: string;
  readonly combinations: Combination[];
}

interface LetterSounds {
  readonly letter: string;
  readonly sound: string;
}

export interface Letter extends Document {
  readonly vocals: string;
  readonly consonants: string;
  readonly alphabet: string;
  readonly combinations: AlphabetCombination[];
  readonly letterSounds: LetterSounds[];
}
