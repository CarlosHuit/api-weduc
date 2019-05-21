import * as mongoose from 'mongoose';

const CombinationSchema = new mongoose.Schema(
  {
    w: { type: String, required: true },
    p: { type: String, required: true },
  },
  {
    _id: false,
  },
);

const AlphabetCombinationSchema = new mongoose.Schema(
  {
    letter:       { type: String, required: true },
    combinations: { type: [ CombinationSchema ], required: true },
  },
  {
    _id: false,
  },
);

const letterSoundsSchema = new mongoose.Schema(
  {
    letter: { type: String, required: true, maxlength: 5 },
    sound:  { type: String, required: true, maxlength: 20 },
  },
  {
    _id: false,
  },
);

export const LetterSchema = new mongoose.Schema(
  {
    vocals:        { type: String, required: true, maxlength: 5 },
    consonants:    { type: String, required: true, maxlength: 25 },
    alphabet:      { type: String, required: true, maxlength: 28 },
    combinations:  { type: [ AlphabetCombinationSchema ], required: true },
    letterSounds:  { type: [ letterSoundsSchema ], required: true },
  },
);
