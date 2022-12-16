import { DatabaseService } from 'src/database/database.service';
import { Body, Controller, Post } from '@nestjs/common';
import { specDTO,specEventDTO } from '../dto/specData.dto';
import { SpecificationImplService } from '../service/specification-impl.service';
import {specSchema} from '../../spec-data';
import {queryTxt} from '../queries/queries'
import { eventSchemaData } from 'src/utils/specSchemaData';

@Controller('spec')
export class SpecificationController {
    constructor( private specService:SpecificationImplService, private dbService:DatabaseService){

    }
    @Post('/dimension')
    async getDimensions(@Body() dimensionDTO:specDTO )
    {
        console.log("Request body is:", dimensionDTO);
        const response: any = await this.specService.ajvValidator(specSchema.input,dimensionDTO,)
        console.log("The response is:", response);
        if(!response.errors)
        {
          const result = await  this.dbService.executeQuery(queryTxt.getSchema(),[])
          console.log("The result is:", result);
          if( result.length == 0)
          {
            const insertResult = await this.dbService.executeQuery(queryTxt.insertSchema(),[dimensionDTO.dimension_name,specSchema])
            console.log("The insert result is:", insertResult);

          }
        }
    }

    @Post('/event')
    async getEvent(@Body() inputData:specEventDTO){
      try {
        const validatorResult: any = await this.specService.ajvValidator(eventSchemaData.input,inputData);

        if(!validatorResult.errors){
          const dbResult = await this.dbService.executeQuery(queryTxt.getEventsData());
          if(dbResult.length === 0){
            await this.dbService.executeQuery(queryTxt.insertEventSchema(),[inputData.event_name,eventSchemaData])
            return {
              message:"record inserted successfully."
            }
          }


        }

      } catch (error) {
        console.log('errror');
      }
    }

}
