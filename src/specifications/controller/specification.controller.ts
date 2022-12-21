import { DatabaseService } from 'src/database/database.service';
import { Body, Controller, Post } from '@nestjs/common';
import { specDTO,specEventDTO } from '../dto/specData.dto';
import { SpecificationImplService } from '../service/specification-impl.service';
import { specSchema, eventSchema } from '../../spec-data';
import { queryTxt } from '../queries/queries'
@Controller('spec')
export class SpecificationController {
  constructor(private specService: SpecificationImplService, private dbService: DatabaseService) {

  }
  @Post('/dimension')
  async getDimensions(@Body() dimensionDTO: any) {
    //converting all the keys into lowercase to avoid duplication
    let obj = dimensionDTO?.input?.properties?.dimension?.properties;
    var json = JSON.stringify(dimensionDTO);
     obj = json.replace(/"([\w]+)":/g, function($0, $1) {
      return ('"' + $1.toLowerCase() + '":');
    });
    var newObj = JSON.parse(obj);
    console.debug("New Object is:",newObj?.input?.properties?.dimension?.properties);
    console.log("Dimension DTO:", dimensionDTO.input);
    console.log("Spec schema:", specSchema.input);
    const response: any = await this.specService.ajvValidator(specSchema.input, dimensionDTO?.input)
    console.log("The dimension DTO is:",dimensionDTO.input.properties.dimension);
    // if(!response.errors)
    // {
    const resultDname = await this.dbService.executeQuery(queryTxt.checkName('dimension_name',"dimension"), [dimensionDTO?.dimension_name.toLowerCase()]);
    if (resultDname.length > 0) {
      return { "message": "Dimension Name already exists"}
    }
    else {
      let values: JSON = newObj?.input?.properties?.dimension;
      const result = await this.dbService.executeQuery(queryTxt.checkDuplicacy(['dimension_name','dimension_data'],'dimension',['dimension_data','input','properties','dimension']), [JSON.stringify(values)])
      if (result.length == 0) //If there is no record in the DB then insert the first schema
      {
        console.log("No result rows");
        const insertResult = await this.dbService.executeQuery(queryTxt.insertSchema(['dimension_name','dimension_data'],'dimension'), [2,dimensionDTO.dimension_name.toLowerCase(), newObj]);
        return {"message":"Dimension Spec Created Successfully","dimension_name": dimensionDTO.dimension_name,"pid":insertResult[0].pid}

      }
      else {
        return { "message": "Duplicate dimension not allowed" }
      }
    }
  }

  

    @Post('/event')
    async getEvent(@Body() specEventDTO: any){
      console.log("Event DTO:", specEventDTO.input);
    console.log("Spec schema:", specSchema.input);
    const response: any = await this.specService.ajvValidator(specSchema.input, specEventDTO?.input)
    console.log("The response is:", response);
    const resultEname = await this.dbService.executeQuery(queryTxt.checkName(), [specEventDTO?.event_name.toLowerCase()]);
    if (resultEname.length > 0) {
      return { "message": "Event Name already exists" }
    }
    else {
      let values: JSON = specEventDTO?.input?.properties?.event;
      const result = await this.dbService.executeQuery(queryTxt.checkDuplicacy(), [JSON.stringify(values)])
      if (result.length == 0)
      {
        console.log("No result rows");
        const insertResult = await this.dbService.executeQuery(queryTxt.insertSchema(), [2,specEventDTO.event_name.toLowerCase(), specEventDTO]);
        return {"message":"Event Spec Created Successfully","event_name": specEventDTO.event_name,"pid":insertResult[0].pid}
      
      }
      else {
        return { "message": "Duplicate events not allowed" }
      }
    }
  }
}
      
      
      
      
//       try {
//         const validatorResult: any = await this.specService.ajvValidator(eventSchema.input,inputData);

//         if(!validatorResult.errors){
//           const dbResult = await this.dbService.executeQuery(queryTxt.getEventsData());
//           if(dbResult.length === 0){
//             await this.dbService.executeQuery(queryTxt.insertEventSchema(),[2,inputData.event_name.toLowerCase(),inputData])
//             return {
//               message:"record inserted successfully."
//             }
//           }


//         }

//       } catch (error) {
//         console.log('errror');
//       }
//     }


