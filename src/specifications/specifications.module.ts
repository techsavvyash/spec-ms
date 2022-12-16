import { Dimension } from './../typeorm/dimension.entity';
import { Module } from '@nestjs/common';
import { SpecificationController } from './controller/specification.controller';
import { SpecificationImplService } from './service/specification-impl.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Dimension]),],
  controllers: [SpecificationController],
  providers:[SpecificationImplService],

})
export class SpecificationsModule {}
