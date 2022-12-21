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

