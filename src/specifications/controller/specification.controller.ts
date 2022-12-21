import { DatabaseService } from 'src/database/database.service';
import { Body, Controller, Post } from '@nestjs/common';
import { specDTO } from '../dto/specData.dto';
import { SpecificationImplService } from '../service/specification-impl.service';
import { specSchema } from '../../spec-data';
import { queryTxt } from '../queries/queries'
@Controller('spec')
export class SpecificationController {
  constructor(private specService: SpecificationImplService, private dbService: DatabaseService) {

  }
  @Post('/dimension')
  async getDimensions(@Body() dimensionDTO: any) {
    console.log("Dimension DTO:", dimensionDTO.input);
    console.log("Spec schema:", specSchema.input);
    const response: any = await this.specService.ajvValidator(specSchema.input, dimensionDTO?.input)
    console.log("The response is:", response);

    // if(!response.errors)
    // {

    // console.log(dimensionDTO?.input?.properties?.dimension);
    // console.log(dimensionDTO?.dimension_name.toLowerCase());
    const resultDname = await this.dbService.executeQuery(queryTxt.checkName(), [dimensionDTO?.dimension_name.toLowerCase()]);
    if (resultDname.length > 0) {
      return { "message": "Dimension Name already exists" }
    }
    else {
      let values: JSON = dimensionDTO?.input?.properties?.dimension;
      // console.log('values====>', JSON.stringify(values));
      const result = await this.dbService.executeQuery(queryTxt.checkDuplicacy(), [JSON.stringify(values)])
      // console.log("The result is:", result.length);
      if (result.length == 0) //If there is no record in the DB then insert the first schema
      {
        console.log("No result rows");
        // return { "Message": "No duplicate" };
        //just to check if insert query works or not,  actual implementation is different
        const insertResult = await this.dbService.executeQuery(queryTxt.insertSchema(), [2,dimensionDTO.dimension_name.toLowerCase(), dimensionDTO]);
        // console.log("The insert result is:", insertResult);
        return {"message":"Dimension Spec Created Successfully","dimension_name": dimensionDTO.dimension_name,"pid":insertResult[0].pid}

      }
      else {
        return { "message": "Duplicate dimension not allowed" }
      }
    }
  }

}
