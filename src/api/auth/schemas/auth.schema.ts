import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema(
  {
    email:    { type: String, required: true, maxlength: 100  },
    password: { type: String, required: true, maxlength: 100  },
    user:     { type: mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
  },
);
