import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 40  },
  lastName:  { type: String, required: true, maxlength: 40  },
  email:     { type: String, required: true },
  avatar:    { type: String, required: true, maxlength: 40 },
});
