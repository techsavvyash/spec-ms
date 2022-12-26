import { DimensionService } from './../service/dimension/dimension.service';
import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';
@Controller('spec')
export class SpecificationController {
  constructor(private dimensionService:DimensionService) {
  }
  @Post('/dimension')
  async getDimensions(@Body() dimensionDTO: any, @Res()response: Response) {
    try {
      let result = await this.dimensionService.createDimension(dimensionDTO);
      if(result.code == 400)
      {
        response.status(400).send({"message":result.message});
      }
      else
      {
        response.status(200).send({"message":result.message,"dimension_name":result.dimension_name,"pid":result.pid});
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
