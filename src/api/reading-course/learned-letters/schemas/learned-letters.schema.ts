import * as mongoose from 'mongoose';
import { LearnedLetterSchema } from './leraned-letter.schema';

export const LearnedLettersSchema = new mongoose.Schema({
  user: {
    type:      mongoose.Schema.Types.ObjectId,
    required:  true,
    maxlength: 100,
  },
  learnedLetters: [ LearnedLetterSchema ],
});
