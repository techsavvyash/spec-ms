import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GenericFunction } from '../genericFunction';
import { DataSource } from 'typeorm';
import { specTransformer } from '../../../utils/specSchemaData';
import { TransformerType, TemplateType } from '../contsant'
@Injectable()
export class TransformerService {
    constructor(@InjectDataSource() private dataSource: DataSource, private gnFunction: GenericFunction) { }
    async createTransformer(inputData) {
        try {
            const transformerName = inputData.transformer_name;
            const eventName = inputData.event_name;
            const datasetName = inputData.dataset_name;
            const transformerTypeInput = inputData.transformer_type;
            const template = inputData.template;
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
                            if (result.length === 1) {
                                // actual code 
                                console.log('valid input Data');
                            }
                            else {
                                return { message: "Invalid Dataset Name" }
                            }
                        }
                        else {
                            return { message: "Invalid Event Name" };
                        }
                    }
                    else {
                        return { message: "The Transformer Name is alredy present" }
                    }
                }
                else {
                    return { message: "Invalid Input" }
                }
            } else {
                return {error: isValidSchema.errors }
            }
        } catch (e) {
            console.error('impl.: ', e.message);
            throw new Error(e);
        }
    }
}
