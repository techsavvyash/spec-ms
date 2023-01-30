import { ApiProperty } from "@nestjs/swagger";

export class specDimensionDTO {
    @ApiProperty()
    ingestion_type: string;
    @ApiProperty()
    dimension_name: string;
    @ApiProperty()
    input: JSON
}

export class specDataset{
    @ApiProperty()
    ingestion_type: string;
    @ApiProperty()
    dataset_name: string;
    @ApiProperty()
    input: JSON
}

export class specEventDTO {
    @ApiProperty()
    ingestion_type: string;
    @ApiProperty()
    event_name: JSON;
    @ApiProperty()
    input: JSON
}

export class specTrasformer {
    @ApiProperty()
    ingestion_name: string;
    @ApiProperty()
    key_file: string;
    @ApiProperty()
    program: string;
    @ApiProperty()
    operation: string;
}

export class eventResponse {
    code: number;
    error?: string;
}

export class dimensionResponse {
    code: number;
    error?: string;
}

export class datasetResponse {
    code: number;
    error?: string;
}

export class pipelineDto {
    @ApiProperty()
    pipeline_name: string;
    @ApiProperty()
    pipeline_type: string;
    @ApiProperty()
    pipeline: object[];
}

export class Result {
    code: number;
    message?: string;
    error?: string;
}

export class scheduleDto {
    @ApiProperty()
    pipeline_name?: string;
    @ApiProperty()
    scheduled_at?: string;
}
