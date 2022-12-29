import { Injectable } from "@nestjs/common";
import Ajv from "ajv";
const ajv = new Ajv();
@Injectable()
export class GenericFunction {
async ajvValidator(schema, inputData) {
    const isValid = ajv.validate(schema, inputData);
    if (isValid) {
        return inputData;
    } else {
        return {errors: ajv.errors};
    }
}
// converting all the keys in request body to lowercase to avoid duplication
  convertKeysToLowerCase(dimensionDTO)
{
    let json = JSON.stringify(dimensionDTO);
    let obj = json.replace(/"([\w]+)":/g, function ($0, $1) {
    return ('"' + $1.toLowerCase() + '":');
    });
    let newObj = JSON.parse(obj);
    return newObj
}
 getDbColumnNames(columnProperties)
{
    let dbColumns = []
      columnProperties.forEach((element, index) => {
        if (element.type == "string") {
          dbColumns[index] = 'VARCHAR'
        }
        else if (element.type == "number") {
          dbColumns[index] = 'INT';
        }
        else if (element.type == "json") {
          dbColumns[index] = 'jsonb';
        }
        else if (element.type == 'date') {
          dbColumns[index] = 'TIMESTAMP WITH TIME ZONE';
        }
      });
      return dbColumns;
}
}
