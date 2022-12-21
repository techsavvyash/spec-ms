import { Dimension } from './../../typeorm/dimension.entity';
import { Injectable } from '@nestjs/common';
import {  InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import Ajv, {JSONSchemaType} from "ajv";
import {  DataSource, Repository } from 'typeorm';
import { specDTO } from '../dto/specData.dto';
const ajv = new Ajv()
@Injectable()
export class SpecificationImplService {

    constructor(@InjectRepository(Dimension) private readonly dimensionRepo: Repository<Dimension>,
    @InjectDataSource() private readonly dataSource: DataSource)
    {
        
    }
    async ajvValidator(schema, inputData) {
        const isValid = ajv.validate(schema, inputData);
        console.log("Valid",isValid);
        if (isValid) {
            return inputData;
        } else {
            return {errors: ajv.errors};
        }
    }
    
//
//    async InsertIntoDb(specDto:specDTO)
//    {
//     const newDimension = this.dimensionRepo.create(specDto);
//     return this.dimensionRepo.save(newDimension);
//    }

//    async GetData()
//    {
//     return this.dataSource.query('SELECT * from spec.dimension');
//    }

 
}
