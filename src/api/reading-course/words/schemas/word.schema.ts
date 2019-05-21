import * as mongoose from 'mongoose';

export const WordSchema = new mongoose.Schema(
  {
    letter: { type:   String,   required: true, maxlength: 2},
    words:  { type: [ String ], required: true },
  },
);
