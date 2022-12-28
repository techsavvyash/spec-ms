import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { checkDuplicacy, checkName, createTable, insertPipeline, insertSchema } from 'src/specifications/queries/queries';
import { DataSource } from 'typeorm';
import { GenericFunction } from '../genericFunction';
@Injectable()
export class DatasetService {
 constructor(@InjectDataSource() private dataSource: DataSource,private specService: GenericFunction){
 }
async createDataset(datasetDTO) {
    const queryRunner = this.dataSource.createQueryRunner()
    let dbColumns = []
    let newObj = this.specService.convertKeysToLowerCase(datasetDTO);
    if (datasetDTO?.dataset_name.toLowerCase() == "") {
        return { "code": 400, "message": "Dataset Name cannot be empty" };
    }
    if (newObj?.ingestion_type == "") {
        return { "code": 400, "message": "Ingestion Type cannot be empty" };
    }
    let queryResult = checkName('dataset_name', "dataset");
    queryResult = queryResult.replace('$1', `${datasetDTO?.dataset_name.toLowerCase()}`)
    const resultDname = await this.dataSource.query(queryResult);
    if (resultDname.length > 0) {
        return { "code": 400, "message": "Dataset Name already exists" };
    }
    else {
        console.log("name duplicacy passed");
        await queryRunner.connect();
        let values = newObj?.input?.properties?.dataset;
        let duplicacyQuery = checkDuplicacy(['dataset_name', 'dataset_data'], 'dataset', ['dataset_data', 'input', 'properties', 'dataset'], JSON.stringify(values));
        const result = await queryRunner.query(duplicacyQuery);
        if (result.length == 0) //If there is no record in the DB then insert the first schema
        {
            await queryRunner.startTransaction();
            try {
                let insertQuery = insertSchema(['dataset_name', 'dataset_data'], 'dataset');
                insertQuery = insertQuery.replace('$1', `'${datasetDTO.dataset_name.toLowerCase()}'`);
                insertQuery = insertQuery.replace('$2', `'${JSON.stringify(newObj)}'`);
                const insertResult = await queryRunner.query(insertQuery);
                if (insertResult[0].pid) {
                    console.log("The spec dataset pid is:",insertResult[0].pid);
                    let dataset_pid = insertResult[0].pid;
                    const pipeline_name = datasetDTO.dataset_name.toLowerCase() + 'pipeline';
                    let insertPipeLineQuery = insertPipeline(['pipeline_name', 'dataset_pid'], 'pipeline', [pipeline_name, dataset_pid]);
                    const insertPipelineResult = await queryRunner.query(insertPipeLineQuery);
                    if (insertPipelineResult[0].pid) {
                        console.log("The spec pipeline pid is:",insertPipelineResult[0].pid);
                        let columnProperties = []
                        let columnNames = [];
                        columnNames.push(Object.keys(values?.properties));
                        columnProperties.push(Object.values(values?.properties))
                        dbColumns = this.specService.getDbColumnNames(columnProperties[0]);
                        let tbName: string = newObj?.ingestion_type;
                        let createQuery = createTable(tbName, columnNames[0], dbColumns);
                        const createResult = await queryRunner.query(createQuery);
                        console.log("The result is:", createResult);
                        await queryRunner.commitTransaction();
                        return { "code": 200, "message": "Dataset Spec Created Successfully", "dataset_name": datasetDTO.dataset_name, "pid": insertResult[0].pid };
                    }
                }
                else {
                    await queryRunner.rollbackTransaction()
                    return { "code": 400, "message": "Something went wrong" };
                }
            } catch (error) {
                await queryRunner.rollbackTransaction()
                return { "code": 400, "message": "something went wrong" }
            }finally {
                await queryRunner.release();
            }
        }
        else {
            return { "code": 400, "message": "Duplicate Dataset not allowed" }
        }
    }
}
}
