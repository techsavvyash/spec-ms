import { GenericFunction } from './../genericFunction';
import { checkDuplicacy, checkName, createTable, insertPipeline, insertSchema } from 'src/specifications/queries/queries';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
export class DimensionService {
    constructor(@InjectDataSource() private dataSource: DataSource, private specService: GenericFunction) {
    }
    async createDimension(dimensionDTO) {
        const queryRunner = this.dataSource.createQueryRunner()
        let dbColumns = []
        let newObj = this.specService.convertKeysToLowerCase(dimensionDTO);
        if (dimensionDTO?.dimension_name.toLowerCase() == "") {
            return { "code": 400, "message": "Dimension Name cannot be empty" };
        }
        if (newObj?.ingestion_type == "") {
            return { "code": 400, "message": "Ingestion Type cannot be empty" };
        }
        let queryResult = checkName('dimension_name', "dimension");
        queryResult = queryResult.replace('$1', `${dimensionDTO?.dimension_name.toLowerCase()}`)
        const resultDname = await this.dataSource.query(queryResult);
        if (resultDname.length > 0) {
            return { "code": 400, "message": "Dimension Name already exists" };
        }
        else {
            await queryRunner.connect();
            let values = newObj?.input?.properties?.dimension;
            let duplicacyQuery = checkDuplicacy(['dimension_name', 'dimension_data'], 'dimension', ['dimension_data', 'input', 'properties', 'dimension'], JSON.stringify(values));
            const result = await queryRunner.query(duplicacyQuery);
            if (result.length == 0) //If there is no record in the DB then insert the first schema
            {
                await queryRunner.startTransaction();
                try {
                    let insertQuery = insertSchema(['dimension_name', 'dimension_data'], 'dimension');
                    insertQuery = insertQuery.replace('$1', `'${dimensionDTO.dimension_name.toLowerCase()}'`);
                    insertQuery = insertQuery.replace('$2', `'${JSON.stringify(newObj)}'`);
                    const insertResult = await queryRunner.query(insertQuery);
                    if (insertResult[0].pid) {
                        let dimension_pid = insertResult[0].pid;
                        const pipeline_name = dimensionDTO.dimension_name.toLowerCase() + 'pipeline';
                        let insertPipeLineQuery = insertPipeline(['pipeline_name', 'dimension_pid'], 'pipeline', [pipeline_name, dimension_pid]);
                        const insertPipelineResult = await queryRunner.query(insertPipeLineQuery);
                        if (insertPipelineResult[0].pid) {
                            let columnProperties = []
                            let columnNames = [];
                            columnNames.push(Object.keys(values?.properties));
                            columnProperties.push(Object.values(values?.properties))
                            dbColumns = this.specService.getDbColumnNames(columnProperties[0]);
                            let tbName: string = newObj?.ingestion_type;
                            let createQuery = createTable(tbName, columnNames[0], dbColumns);
                            const createResult = await queryRunner.query(createQuery);
                            await queryRunner.commitTransaction();
                            return { "code": 200, "message": "Dimension Spec Created Successfully", "dimension_name": dimensionDTO.dimension_name, "pid": insertResult[0].pid };
                        }
                    }
                    else {
                        await queryRunner.rollbackTransaction()
                        return { "code": 400, "message": "Something went wrong" };
                    }
                }catch (error) {
                    await queryRunner.rollbackTransaction()
                    return { "code": 400, "message": "something went wrong" }
                }
                finally {
                    await queryRunner.release();
                }
            }
            else {
                return { "code": 400, "message": "Duplicate dimension not allowed" }
            }
        }
    }
}
