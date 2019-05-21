import { Document } from 'mongoose';

export interface Word extends Document {
  readonly letter: string;
  readonly words: string[];
}
