import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {GenericFunction} from '../genericFunction';
import {DataSource} from 'typeorm';
import {transformerSchemaData} from '../../../utils/spec-data';
import {checkName, getdatasetName, getEventData, insertTransformer} from '../../queries/queries';
import {HttpCustomService} from '../HttpCustomService';

@Injectable()
export class TransformerService {
    constructor(@InjectDataSource() private dataSource: DataSource, private gnFunction: GenericFunction, private http: HttpCustomService) {
    }

    async createTransformer(inputData) {
        const queryRunner: any = this.dataSource.createQueryRunner();
        try {
            const ingestionName = inputData.ingestion_name;
            const keyFileName = inputData?.key_file;
            const programName = inputData?.program;
            const operation = inputData.operation;
            const isValidSchema: any = await this.gnFunction.ajvValidator(transformerSchemaData.input, inputData);
            if (isValidSchema.errors) {
                return {"code": 400, error: isValidSchema.errors}
            } else {
                let apiData;
                let queryResult;
                if(operation === 'dimension')
                {
                    let checkDimensionName = checkName('dimension_name','dimension');
                    checkDimensionName = checkDimensionName.replace('$1',`${ingestionName}`);
                    queryResult  = this.dataSource.query(checkDimensionName);
                }
                else if(operation === 'dataset')
                {
                    let checkEventName = checkName('event_name', "event");
                    checkEventName = checkEventName.replace('$1',`${ingestionName}`)
                    queryResult = await this.dataSource.query(checkEventName);
                }
                if (queryResult?.length === 1) {
                    await queryRunner.connect();
                         apiData = {
                            "ingestion_name": ingestionName,
                            "key_file": keyFileName,
                            "program": programName,
                            "operation": operation
                        };
                   
                    const apiGenerator: any = await this.generatorAPI(apiData);

                    if (apiGenerator.data.code === 200) {
                        await queryRunner.startTransaction();
                        try {
                            let pidData = [];
                            for (let generator of apiGenerator.data.TransformerFiles) {
                                const transResult: any = await queryRunner.query(insertTransformer(generator.filename));
                                pidData.push({pid: transResult[0].pid, filename: generator.filename})
                            }
                            if (pidData.length > 0) {
                                await queryRunner.commitTransaction();
                                return {
                                    "code": 200,
                                    "message": apiGenerator.data.Message,
                                    "response": pidData,
                                }
                            }
                            else {
                                await queryRunner.rollbackTransaction();
                                return {"code": 400, "error": "unable to create a transformer"}
                            }
                        } catch (error) {
                            await queryRunner.rollbackTransaction();
                            console.error('transformer.service.createTransformer: ', error.message);
                        }
                        finally {
                            await queryRunner.release();
                        }
                    }
                    else {
                        return {"code": 400, "error": apiGenerator.data.Message}
                    }
                }
                else {
                    return {"code": 400, error: `Invalid ${operation} name`};
                }
            }
        } catch (e) {
            console.error('transformer.service.ts.createTransformer: ', e.message);
        }
    }

    async generatorAPI(APIdata) {
        let url = `${process.env.URL}/generator`;
        try {
            const result: any = await this.http.post(url, APIdata);
            if (result) {
                return result;
            }
        } catch (error) {
            console.error('transformer.service.ts.generatorAPI: ', error.message);
            return {"code": 400, "error": "Error occured during creating transformer"}
        }

    }
} 