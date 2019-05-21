import * as mongoose from 'mongoose';

export const PositionXYSchema = new mongoose.Schema(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  {
    _id: false,
  },
);

export const CoordinateSchema = new mongoose.Schema({
  letter:      { type: String, required: true,   maxlength: 2 },
  coordinates: { type: [ [ PositionXYSchema ] ], required: true},
});
