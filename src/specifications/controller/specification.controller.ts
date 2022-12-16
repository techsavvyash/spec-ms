import { Body, Controller, Post } from '@nestjs/common';
import { specDTO } from '../dto/specData.dto';
import { SpecificationImplService } from '../service/specification-impl.service';
import {specSchema} from '../../spec-data';
@Controller('spec')
export class SpecificationController {
    constructor( private specService:SpecificationImplService){

    }
    @Post('/dimension')
    async getDimensions(@Body() dimensionDTO:specDTO )
    {
        console.log("Requst body is:", dimensionDTO);
        // const isValidSchema: any = await this.specService.ajvValidator(specSchema,dimensionDTO)
        // if (!isValidSchema?.errors)
        // {
        //     console.log("No AJV errors");
        // }
        // else{
        //     console.log("AJV errors");
            
        // }
        const response = await this.specService.GetData();
        return {message:"User Added Successfully", response:response};

    }

}
