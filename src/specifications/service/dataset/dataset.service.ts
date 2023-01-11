import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {checkDuplicacy, checkName, createTable, insertPipeline, insertSchema} from '../../queries/queries';
import {DataSource} from 'typeorm';
import {GenericFunction} from '../genericFunction';
import {datasetSchemaData} from "../../../utils/spec-data";
import {datasetResponse} from "../../dto/specData.dto";

@Injectable()
export class DatasetService {
    constructor(@InjectDataSource() private dataSource: DataSource, private specService: GenericFunction) {
    }

    async createDataset(datasetDTO) {
        const queryRunner = this.dataSource.createQueryRunner();
        let dbColumns = [];
        let newObj = this.specService.convertKeysToLowerCase(datasetDTO);

        const isValidSchema: any = await this.specService.ajvValidator(datasetSchemaData, datasetDTO);
        if (isValidSchema?.errors) {
            return {"code": 400, error: isValidSchema.errors}
        } else {
            let response: datasetResponse = await this.validateRequiredFields(isValidSchema);
            if (response.code == 400) {
                return {
                    code: 400,
                    error: response.error
                }
            } else {
                let queryResult = checkName('dataset_name', "dataset");
                queryResult = queryResult.replace('$1', `${datasetDTO?.dataset_name.toLowerCase()}`);
                const resultDname: any = await this.dataSource.query(queryResult);
                if (resultDname?.length > 0) {
                    return {"code": 400, "error": "Dataset name already exists"};
                }
                else {
                    await queryRunner.connect();
                    let values = newObj?.input?.properties?.dataset;
                    let duplicacyQuery = checkDuplicacy(['dataset_name', 'dataset_data'], 'dataset', ['dataset_data', "'input'->'properties'->'dataset'"], JSON.stringify(values));
                    const result: any = await this.dataSource.query(duplicacyQuery);
                    if (result?.length == 0) { //If there is no record in the DB then insert the first schema
                        await queryRunner.startTransaction();
                        try {
                            let insertQuery = insertSchema(['dataset_name', 'dataset_data'], 'dataset');
                            insertQuery = insertQuery.replace('$1', `'${datasetDTO.dataset_name.toLowerCase()}'`);
                            insertQuery = insertQuery.replace('$2', `'${JSON.stringify(newObj)}'`);
                            const insertResult = await queryRunner.query(insertQuery);
                            if (insertResult[0].pid) {
                                let dataset_pid = insertResult[0].pid;
                                const pipeline_name = datasetDTO.dataset_name.toLowerCase() + 'pipeline';
                                let insertPipeLineQuery = insertPipeline(['pipeline_name', 'dataset_pid'], 'pipeline', [pipeline_name, dataset_pid]);
                                const insertPipelineResult = await queryRunner.query(insertPipeLineQuery);
                                if (insertPipelineResult[0].pid) {
                                    let columnProperties = [];
                                    let columnNames = [];
                                    columnNames.push(Object.keys(values?.properties?.items?.items?.properties));
                                    columnProperties.push(Object.values(values?.properties?.items?.items?.properties));
                                    dbColumns = this.specService.getDbColumnNames(columnProperties[0]);
                                    let tbName: string = newObj?.dataset_name;
                                    let createQuery = createTable(tbName, columnNames[0], dbColumns);
                                    await queryRunner.query(createQuery);
                                    await queryRunner.commitTransaction();
                                    return {
                                        "code": 200,
                                        "message": "Dataset spec created successfully",
                                        "dataset_name": datasetDTO.dataset_name,
                                        "pid": insertResult[0].pid
                                    };
                                } else {
                                    await queryRunner.rollbackTransaction();
                                    return {"code": 400, "error": "Unable to insert into spec pipeline table"};
                                }
                            } else {
                                await queryRunner.rollbackTransaction();
                                return {"code": 400, "error": "Dataset spec was not added"};
                            }
                        } catch (error) {
                            await queryRunner.rollbackTransaction();
                            return {"code": 400, "error": error.message}
                        } finally {
                            await queryRunner.release();
                        }
                    }
                    else {
                        return {"code": 400, "error": "Duplicate dataset not allowed"}
                    }
                }
            }
        }
    }

    async validateRequiredFields(inputData) {
        let responseObj = {
            code: 200,
            error: ""
        };
        if (inputData?.input?.properties?.dataset?.properties?.items?.items?.required && inputData?.input?.properties?.dataset?.properties?.items?.items?.required?.length > 0) {
            inputData?.input?.properties?.dataset?.properties?.items?.items?.required?.map((key) => {
                if (!Object.keys(inputData?.input?.properties?.dataset?.properties?.items?.items?.properties).includes(key)) {
                    responseObj = {
                        "code": 400,
                        "error": 'One/more invalid required fields'
                    }
                }
            })
        }
        return responseObj;
    }
}
