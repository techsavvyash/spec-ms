import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GenericFunction } from '../genericFunction';
import { DataSource } from 'typeorm';
import { specTransformer } from '../../../utils/specSchemaData';
import { TransformerType, TemplateType } from '../contsant'
import { HttpService } from '@nestjs/axios';
import { insertTransformer } from 'src/specifications/queries/queries';

@Injectable()
export class TransformerService {
    constructor(@InjectDataSource() private dataSource: DataSource, private gnFunction: GenericFunction, private http: HttpService) { }
    async createTransformer(inputData) {
        try {
            const transformerName = inputData.transformer_name;
            const eventName = inputData.event_name;
            const datasetName = inputData.dataset_name;
            const transformerTypeInput = inputData.transformer_type;
            const template = inputData.template;
            const transformerFunction = inputData.function
            const isValidSchema: any = await this.gnFunction.ajvValidator(specTransformer.input, inputData);
            if (!isValidSchema.errors) {
                if (TransformerType.includes(transformerTypeInput) && TemplateType.includes(template)) {
                    let queryStr = `SELECT event_name FROM spec.event WHERE event_name = '${eventName}'`;
                    const quaryResult = await this.dataSource.query(queryStr);
                    let quaryTransformer = `SELECT transformer_file FROM spec.transformer WHERE transformer_file = '${transformerName}'`
                    const transformerResult = await this.dataSource.query(quaryTransformer);
                    if (transformerResult.length != 1) {
                        if (quaryResult?.length === 1) {
                            let quaryDataset = `SELECT dataset_name FROM spec.dataset where dataset_name= '${datasetName}'`;
                            const result = await this.dataSource.query(quaryDataset);
                            const data = {
                                "event": eventName,
                                "dataset": datasetName,
                                "template": template,
                                "transformer_type": transformerTypeInput,
                            }
                            if (result.length === 1) {
                                const apiGenrator = await this.genratorAPI(data);
                                if (apiGenrator) {
                                    const transResult:any = await this.dataSource.query(insertTransformer(transformerName,transformerFunction));
                                    if (transResult) {
                                        return {
                                            "code":200,
                                            "message": "Transformer Spec Created Successfully",
                                            "pid":transResult[0].pid,
                                            "transformer_name": transformerName
                                        }
                                    }
                                }
                            }
                            else {
                                return {"code":400, message: "Invalid Dataset Name" }
                            }
                        }
                        else {
                            return {"code":400, message: "Invalid Event Name" };
                        }
                    }
                    else {
                        return {"code":400, message: "The Transformer Name is alredy present" }
                    }
                }
                else {
                    return {"code":400, message: "Invalid Input" }
                }
            } else {
                return {"code":404, error: isValidSchema.errors }
            }
        } catch (e) {
            console.error('impl.: ', e.message);
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
        } catch (error) {
            console.error("error imple genrator api", error)
        }


    }
}
