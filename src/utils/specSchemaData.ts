export const eventSchemaData = {
    "ingestion_type": "event",
    "input": {
        "type": "object",
        "properties": {
            "event_name": {
                "type": "string"
            },
            "event": {
                "type": "object",
                "properties": {
                    "school_id": {
                        "type": "string"
                    },
                    "grade": {
                        "type": "string"
                    },
                    "count": {
                        "type": "string"
                    }
                },
                "required": [
                    "school_id",
                    "grade",
                    "count"
                ]
            }
        },
        "required": [
            "event_name",
            "event"
        ]
    }
}

export const specTransformer ={
    "ingestion_type": "transformer",
    "input": {
        "type": "object",
        "properties": {
            "transformer_name": {
                "type": "string"
            },
            "event_name": {
                "type": "string"
            },
            "dataset_name": {
                "type": "string"
            },
            "template": {
                "type": "string"
            },
            "function": {
                "type": "string"
            },
            "transformer_type": {
                "type": "string"
            },
        },
        "required": [
            "transformer_name",
            "event_name",
            "dataset_name",
            "template",
            "function",
            "transformer_type"
        ]
    }
}

