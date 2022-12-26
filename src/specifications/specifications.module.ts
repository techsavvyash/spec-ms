import { DatabaseModule } from './../database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { Dimension } from './../typeorm/dimension.entity';
import { Module } from '@nestjs/common';
import { SpecificationController } from './controller/specification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DimensionService } from './service/dimension/dimension.service';
import { GenericFunction } from './service/genericFunction';


@Module({
  imports: [DatabaseModule],
  controllers: [SpecificationController],
  providers:[DimensionService, GenericFunction],

})
export class SpecificationsModule {}
