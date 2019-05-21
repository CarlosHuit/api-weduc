import * as mongoose from 'mongoose';

export const LearnedLetterSchema = new mongoose.Schema(
  {
    letter: { type: String, required: true, maxlength: 2 },
    rating: { type: Number, required: true, min: 0, max: 5 },
  },
  {
    _id: false,
  },
);
