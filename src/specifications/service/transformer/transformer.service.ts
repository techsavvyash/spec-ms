import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {GenericFunction} from '../genericFunction';
import {DataSource} from 'typeorm';
import {transformerSchemaData} from '../../../utils/spec-data';
import {TransformerType, TemplateType} from '../contsant'
import {HttpService} from '@nestjs/axios';
import {getdatasetName, getEventData, insertTransformer} from 'src/specifications/queries/queries';

@Injectable()
export class TransformerService {
    constructor(@InjectDataSource() private dataSource: DataSource, private gnFunction: GenericFunction, private http: HttpService) {
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
                        const quaryResult = await this.dataSource.query(getEventData(eventName));
                        if (quaryResult?.length === 1) {
                            const result = await this.dataSource.query(getdatasetName(datasetName));
                            if (result.length === 1) {
                                const data = {
                                    "event": eventName,
                                    "dataset": datasetName,
                                    "template": template,
                                    "transformer_type": transformerTypeInput,
                                };
                                const apiGenrator = await this.genratorAPI(data);
                                if (apiGenrator) {
                                    try {
                                        const transResult: any = await this.dataSource.query(insertTransformer(apiGenrator.data.transformerFile));
                                        if (transResult) {
                                            return {
                                                "code": 200,
                                                "message": apiGenrator.data.message,
                                                "pid": transResult[0].pid,
                                                "file": apiGenrator.data.transformerFile
                                            }
                                        }
                                    } catch (error) {
                                        console.log(error)
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

    async genratorAPI(data) {
        try {
            return new Promise<any>((resolve, reject) => {
                this.http.post<any>(`${process.env.FLASKAPI}/generator`, data, {headers: {"Content-Type": "application/json"}}).subscribe(async (res: any) => {
                    if (res) {
                        resolve(res)
                    }
                    else {
                        reject('Failed to create the Genrator')
                    }
                });
            });
        } catch (e) {
            console.error("transformer.service.ts.genratorAPI", e.message);
            throw new Error(e);
        }
    }
}
