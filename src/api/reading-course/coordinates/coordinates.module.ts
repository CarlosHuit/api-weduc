import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../../users/users.module';
import { CoordinatesController } from './coordinates.controller';
import { CoordinatesService } from './coordinates.service';
import { CoordinateSchema } from './schemas/coordinate.schemas';

@Module({
  imports:     [
    MongooseModule.forFeature([{ name: 'Coordinate', schema: CoordinateSchema }]),
    UsersModule,
  ],
  controllers: [ CoordinatesController ],
  providers:   [ CoordinatesService ],
  exports:     [ CoordinatesService ],
})
export class CoordinatesModule { }
