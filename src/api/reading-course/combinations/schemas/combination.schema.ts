import * as mongoose from 'mongoose';

const SyllableSchema = new mongoose.Schema(
  {
    w: { type: String, required: true, maxlength: 20 },
    p: { type: String, required: true, maxlength: 20 },
  },
  {
    _id: false,
  },
);

const CombinationsSchema = new mongoose.Schema(
  {
    combination: { type: String,   required: true, maxlength: 4},
    word:        { type: String,   required: false, maxlength: 100 },
    syllable:    SyllableSchema,
    syllables:   { type: [String], required: true },
  },
  {
    _id: false,
  },

);

export const CombinationSchema = new mongoose.Schema(
  {
    letter:       { type: String, required: true, maxlength: 2 },
    combinations: [ CombinationsSchema ],
  },
);
