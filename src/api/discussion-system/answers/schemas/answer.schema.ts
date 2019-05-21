import * as mongoose from 'mongoose';

export const AnswerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId,  ref: 'User', required: true  },
    text: { type: String, required: true, maxlength: 240 },
    date: { type: Date,   required: true, maxlength: 240 },
  },
);
