import { HttpCustomService } from './service/HttpCustomService';
import { EventService } from './service/event/event.service';
import { Dimension } from './../typeorm/dimension.entity';
import { Module } from '@nestjs/common';
import { SpecificationController } from './controller/specification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DimensionService } from './service/dimension/dimension.service';
import { GenericFunction } from './service/genericFunction';
import { TransformerService } from './service/transformer/transformer.service';
import { DatasetService } from './service/dataset/dataset.service';
import { HttpModule } from '@nestjs/axios';
import { PipelineService } from './service/pipeline/pipeline.service';

@Module({
  imports: [HttpModule],
  controllers: [SpecificationController],
  providers:[DimensionService,EventService,GenericFunction,TransformerService, DatasetService, PipelineService, HttpCustomService],

})
export class SpecificationsModule {}
