import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../../users/users.module';
import { CombinationsController } from './combinations.controller';
import { CombinationsService } from './combinations.service';
import { CombinationSchema } from './schemas/combination.schema';

@Module({
  imports:     [
    MongooseModule.forFeature([ { name: 'Combination', schema: CombinationSchema } ]),
    UsersModule,
  ],
  controllers: [ CombinationsController ],
  providers:   [ CombinationsService ],
  exports:     [ CombinationsService ],
})

export class CombinationsModule { }
