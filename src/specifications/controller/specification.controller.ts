import { DatabaseService } from 'src/database/database.service';
import { Body, Controller, Post } from '@nestjs/common';
import { specDTO } from '../dto/specData.dto';
import { SpecificationImplService } from '../service/specification-impl.service';
import {specSchema} from '../../spec-data';
import {queryTxt} from '../queries/queries'
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

}
