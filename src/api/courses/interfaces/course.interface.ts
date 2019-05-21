import { Document } from 'mongoose';

export interface Course extends Document {

  readonly title: string;
  readonly subtitle: string;
  readonly imageUrl: string;
  readonly urlVideo: string;
  readonly description: string;

}
