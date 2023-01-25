export class specDTO {
    dimension_name: string;
    dimension: JSON;
}

export class specEventDTO {
    event_name: string;
    dimensions: JSON;
    items: JSON
}

export class specTrasformer {
    transformer_name: string;
    event_name: string;
    dataset_name: string;
    template: string;
    function: string;
    transformer_type: string;
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

export class pipelineDto{
    pipeline_name: string;
    pipeline_type: string;
    pipeline: object[];
}

export class Result{
    code: number;
    message?: string;
    error?: string;
}

export class scheduleDto{
    pipeline_name?: string;
    scheduled_at?: string;
}