import * as mongoose from 'mongoose';

export const SimilarLetterSchema = new mongoose.Schema(
  {
    letter:         { type: String, required: true, maxlength: 2},
    similarLetters: { type: [ String ], required: true},
  },
);
