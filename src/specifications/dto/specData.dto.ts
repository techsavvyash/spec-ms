export class specDTO{
    dimension_name: string;
    dimension:JSON;
}

export class specEventDTO{
    event_name:string;
    dimensions:JSON;
    items:JSON
}

export class specTrasformer{
    event_name:  string;
    dataset_name:  string;
    template:  string;
    transformer_type:string;
}
