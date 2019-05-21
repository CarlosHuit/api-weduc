import * as mongoose from 'mongoose';

export const SyllableSchema = new mongoose.Schema(
  {
    letter:    { type:     String,     required: true, maxlength: 2 },
    syllables: { type: [ [ String ] ], required: true },
  },
);
