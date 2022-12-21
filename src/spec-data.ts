
  export const specSchema = 
   {
    "ingestion_type": "dimension",
    "input":{
    "type": "object",
    "properties": {
      "dimension_name": {
        "type": "string"
      },
      "dimension": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "district_id": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "district_id"
        ]
      }
    },
    "required": [
      "dimension_name",
      "dimension"
    ]
  }
  }

export const eventSchema = {
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
  