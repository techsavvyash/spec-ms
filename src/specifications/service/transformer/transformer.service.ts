import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {GenericFunction} from '../genericFunction';
import {DataSource} from 'typeorm';
import {transformerSchemaData} from '../../../utils/spec-data';
import {TransformerType, TemplateType} from '../contsant'
import {HttpService} from '@nestjs/axios';
import {getdatasetName, getEventData, insertTransformer} from '../../queries/queries';
import {HttpCustomService} from '../httpservices';

@Injectable()
export class TransformerService {
    constructor(@InjectDataSource() private dataSource: DataSource, private gnFunction: GenericFunction, private http: HttpCustomService) {
    }

    async createTransformer(inputData) {
        try {
            const eventName = inputData.event_name;
            const datasetName = inputData.dataset_name;
            const transformerTypeInput = inputData.transformer_type;
            const template = inputData.template;
            const isValidSchema: any = await this.gnFunction.ajvValidator(transformerSchemaData.input, inputData);
            if (isValidSchema.errors) {
                return {"code": 400, error: isValidSchema.errors}
            } else {
                if (TransformerType.includes(transformerTypeInput)) {
                    if (TemplateType.includes(template)) {
                        const queryResult = await this.dataSource.query(getEventData(eventName));
                        if (queryResult?.length === 1) {
                            const result = await this.dataSource.query(getdatasetName(datasetName));
                            if (result.length === 1) {
                                const data = {
                                    "event": eventName,
                                    "dataset": datasetName,
                                    "template": template,
                                    "transformer_type": transformerTypeInput,
                                };
                                const apiGenerator = await this.generatorAPI(data);
                                if (apiGenerator) {
                                    try {
                                        const transResult: any = await this.dataSource.query(insertTransformer(apiGenerator.data.transformerFile));
                                        if (transResult) {
                                            return {
                                                "code": 200,
                                                "message": apiGenerator.data.Message,
                                                "pid": transResult[0].pid,
                                                "file": apiGenerator.data.transformerFile
                                            }
                                        }
                                    } catch (error) {
                                        console.error('transformer.service.createTransformer: ', error.message);
                                        return {code: 400, error: "something went wrong"}
                                    }
                                }
                            }
                            else {
                                return {"code": 400, error: "Invalid Dataset Name"}
                            }
                        }
                        else {
                            return {"code": 400, error: "Invalid Event Name"};
                        }
                    }
                    else {
                        return {"code": 400, error: "Invalid template Name"}
                    }

                }
                else {
                    return {"code": 400, error: "Invalid Transformer Type"}
                }

            }
        } catch (e) {
            console.error('transformer.service.ts.createTransformer: ', e.message);
            throw new Error(e);
        }
    }

    async generatorAPI(APIdata) {
        let url = `${process.env.FLASKAPI}/generator/transformer`;
        try {
            const result: any = await this.http.post(url, APIdata);
            if (result) {
                return result;
            }
        } catch (error) {
            console.error('transformer.service.ts.generatorAPI: ', error.message);
            return {code: 400, error: "could not create transformer"}
        }
    }
}