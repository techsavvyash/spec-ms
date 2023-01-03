import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GenericFunction } from '../genericFunction';
import { DataSource } from 'typeorm';
import { specTransformer } from '../../../utils/specSchemaData';
import { TransformerType, TemplateType } from '../contsant'
import { HttpService } from '@nestjs/axios';
import { getdatasetName, getEventData, insertTransformer } from '../../queries/queries';
import { specTrasformer } from '../../dto/specData.dto';
@Injectable()
export class TransformerService {
    constructor(@InjectDataSource() private dataSource: DataSource, private gnFunction: GenericFunction, private http: HttpService) { }
    async createTransformer(inputData:specTrasformer) {
        try {
            const eventName = inputData.event_name;
            const datasetName = inputData.dataset_name;
            const transformerTypeInput = inputData.transformer_type;
            const template = inputData.template;
            const isValidSchema: any = await this.gnFunction.ajvValidator(specTransformer.input, inputData);
            if (!isValidSchema.errors) {
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
                                }
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
                                        return { code: 400, message: "something went wrong" }
                                    }
                                }
                            }
                            else {
                                return { "code": 400, message: "Invalid Dataset Name" }
                            }
                        }
                        else {
                            return { "code": 400, message: "Invalid Event Name" };
                        }
                    }
                    else {
                        return { "code": 400, message: "Invalid template Name" }
                    }

                }
                else {
                    return { "code": 400, message: "Invalid Transformer Type" }
                }
            } else {
                return { "code": 404, error: isValidSchema.errors }
            }
        } catch (e) {
            console.error('transformer.service.ts.createTransformer: ', e.message);
            throw new Error(e);
        }
    }
    async genratorAPI(data) {
        try {
            return new Promise<any>((resolve, reject) => {
                this.http.post<any>(`${process.env.FLASKAPI}/generator`, data, { headers: { "Content-Type": "application/json" } }).subscribe(async (res: any) => {
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
