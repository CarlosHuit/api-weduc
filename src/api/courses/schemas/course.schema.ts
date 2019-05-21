import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  title:       { type: String, required: true, maxlength: 50  },
  subtitle:    { type: String, required: true, maxlength: 100 },
  imageUrl:    { type: String, required: true, maxlength: 200 },
  urlVideo:    { type: String, required: true, maxlength: 200 },
  description: { type: String, required: true, maxlength: 250 },
});
