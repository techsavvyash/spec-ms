import { EventService } from './service/event/event.service';
import { Dimension } from './../typeorm/dimension.entity';
import { Module } from '@nestjs/common';
import { SpecificationController } from './controller/specification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DimensionService } from './service/dimension/dimension.service';
import { GenericFunction } from './service/genericFunction';


@Module({
  imports: [],
  controllers: [SpecificationController],
  providers:[DimensionService,EventService,GenericFunction],

})
export class SpecificationsModule {}
