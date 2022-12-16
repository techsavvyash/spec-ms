
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
  