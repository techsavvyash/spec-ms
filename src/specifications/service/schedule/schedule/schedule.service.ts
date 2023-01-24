import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { scheduleDto } from '../../../dto/specData.dto';
import { checkName } from '../../../queries/queries';
import { scheduleSchema } from '../../../../utils/spec-data';
import { DataSource } from 'typeorm';
import { GenericFunction } from '../../genericFunction';
import { HttpCustomService } from '../../HttpCustomService';
import { PipelineService } from '../../pipeline/pipeline.service'
var cronValidator = require('cron-expression-validator');

@Injectable()
export class ScheduleService {
    constructor(@InjectDataSource() private dataSource: DataSource, private specService: GenericFunction, private pipelineService: PipelineService) {
    }

    async schedulePipeline(scheduleData: scheduleDto) {
        let isValidSchema: any;
        const queryRunner = this.dataSource.createQueryRunner();
        isValidSchema = await this.specService.ajvValidator(scheduleSchema, scheduleData);
        if (isValidSchema.errors) {
            return { code: 400, error: isValidSchema.errors }
        }
        else {
            var result = cronValidator.isValidCronExpression(scheduleData.scheduled_at, { error: true });
            if (result.errorMessage) {
                return { code: 400, error: result.errorMessage }
            }
            else {
                let queryResult = checkName('pipeline_name', "pipeline");
                queryResult = queryResult.replace('$1', `${scheduleData?.pipeline_name?.toLowerCase()}`);
                const resultPipeName = await queryRunner.query(queryResult);
                if (resultPipeName.length === 1) {
                    this.pipelineService.CreatePipeline(queryRunner, scheduleData?.pipeline_name, scheduleData?.scheduled_at)
                    return {code: 200, message: "Pipeline has been successfully scheduled"}
                }
                else {
                    return {code: 400, error: "Pipeline name not Found"}
                }
            }
        }
    }
}
