import { Document } from 'mongoose';

export interface Coordinate extends Document {
  readonly letter: string;
  readonly coordinates: PositionXY[][];
}

interface PositionXY {
  readonly x: number;
  readonly y: number;
}
