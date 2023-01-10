import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GenericFunction } from '../genericFunction';
import { DataSource } from 'typeorm';
import { transformerSchemaData } from '../../../utils/spec-data';
import { getEventData, insertTransformer } from '../../queries/queries';
import { HttpCustomService } from '../HttpCustomService';
@Injectable()
export class TransformerService {
    constructor(@InjectDataSource() private dataSource: DataSource, private gnFunction: GenericFunction,private http:HttpCustomService) {
    }

    async createTransformer(inputData) {
        const queryRunner: any = this.dataSource.createQueryRunner();
        try {
            const eventName = inputData.event_name;
            const keyFileName = inputData.key_file;
            const programName = inputData.programName;
            const isValidSchema: any = await this.gnFunction.ajvValidator(transformerSchemaData.input, inputData);
            if (isValidSchema.errors) {
                return { "code": 400, error: isValidSchema.errors }
            } else {
                const queryResult = await this.dataSource.query(getEventData(eventName));
                if (queryResult?.length === 1) {
                    await queryRunner.connect();
                    const data = {
                        "event": eventName,
                        "key_file": keyFileName,
                        "program": programName
                    };
                    const apiGenerator: any = await this.generatorAPI(data);
                    console.log('datdas',apiGenerator);
                    if (apiGenerator) {
                        await queryRunner.startTransaction();
                        try {
                            const transResult: any = await queryRunner.query(insertTransformer(apiGenerator.transformerFile));
                            if (transResult[0].pid && apiGenerator.transformerFile) {
                                await queryRunner.commitTransaction();
                                return {
                                    "code": 200,
                                    "message": apiGenerator.Message,
                                    "pid": transResult[0].pid,
                                    "file": apiGenerator.transformerFile
                                }
                            }
                            else {
                                await queryRunner.rollbackTransaction();
                                return { "code": 400, "error": "Unable to insert transformer" }
                            }
                        } catch (error) {
                            console.error('transformer.service.createTransformer: ', error.message);
                        }
                    }
                }
                else {
                    return { "code": 400, error: "Invalid event name" };
                }

            }
        } catch (e) {
            console.error('transformer.service.ts.createTransformer: ', e.message);
            throw new Error(e);
        }
    }

    async generatorAPI(APIdata) {
        // let url = `${process.env.FLASKAPI}/generator/transformer`;
        // try {
        //     const result: any = await this.http.post(url, APIdata);
        //     if (result) {
        //         return result;
        //     }
        // } catch (error) {
        //     console.error('transformer.service.ts.generatorAPI: ', error.message);
        //     return { code: 400, error: "could not create transformer" }
        // }
        let result ={"Message" : "succussfully" ,"transformerFile":"dsjfbjhad.py" }
        return result
    }
}