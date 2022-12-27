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
    transformer_name: string;
    event_name:  string;
    dataset_name:  string;
    template:  string;
    function:  string;
    transformer_type:string;
}
