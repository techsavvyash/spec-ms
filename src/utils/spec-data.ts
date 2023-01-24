export const dimensionSchemaData = {
    "type": "object",
    "properties": {
        "ingestion_type": {
            "type": "string",
            "pattern": "dimension",
            "shouldnotnull": true
        },
        "dimension_name": {
            "type": "string",
            "shouldnotnull": true
        },
        "input": {
            "type": "object",
            "shouldnotnull": true,
            "properties": {
                "type": {
                    "type": "string",
                    "pattern": "object",
                    "shouldnotnull": true
                },
                "properties": {
                    "type": "object",
                    "shouldnotnull": true,
                    "properties": {
                        "dimension_name": {
                            "type": "object",
                            "shouldnotnull": true,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": ["string", "number", "boolean","integer"],
                                    "shouldnotnull": true
                                }
                            },
                            "required": ["type"]
                        },
                        "dimension": {
                            "type": "object",
                            "shouldnotnull": true,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "pattern": "array",
                                    "shouldnotnull": true
                                },
                                "items": {
                                    "type": "object",
                                    "shouldnotnull": true,
                                    "properties": {
                                        "type": {
                                            "type": "string",
                                            "enum": ["object"],
                                            "shouldnotnull": true
                                        },
                                        "properties": {
                                            "type": "object",
                                            "shouldnotnull": true,
                                            "patternProperties": {
                                                "^[a-zA-Z_]*$": {
                                                    "type": "object",
                                                    "properties": {
                                                        "type": {
                                                            "type": "string",
                                                            "enum": ["string", "number", "boolean","integer"],
                                                            "shouldnotnull": true
                                                        }
                                                    },
                                                    "required": ["type"],
                                                    "shouldnotnull": true
                                                }
                                            }
                                        },
                                        "required": {
                                            "type": "array",
                                            "shouldnotnull": false
                                        }
                                    },
                                    "required": ["type", "properties", "required"],
                                    "additionalProperties": false
                                },
                                "required": {
                                    "type": "array",
                                    "shouldnotnull": false
                                }
                            },
                            "required": ["type", "items"],
                        }
                    },
                    "required": ["dimension_name", "dimension"]
                },
                "required": {
                    "type": "array",
                    "items": [{
                        "shouldnotnull": true,
                        "type": "string",
                        "pattern": "dimension_name"
                    }, {"shouldnotnull": true, "type": "string", "pattern": "dimension"}],
                    "shouldnotnull": true,
                    "minItems": 2,
                    "additionalItems": false
                }
            },
            "required": ["type", "properties", "required"],
            "additionalProperties": false
        }
    },
    "required": ["ingestion_type", "dimension_name", "input"],
    "additionalProperties": false
};

export const eventSchemaData = {
    "type": "object",
    "properties": {
        "ingestion_type": {
            "type": "string",
            "pattern": "event",
            "shouldnotnull": true
        },
        "event_name": {
            "type": "string",
            "shouldnotnull": true
        },
        "input": {
            "type": "object",
            "shouldnotnull": true,
            "properties": {
                "type": {
                    "type": "string",
                    "pattern": "object",
                    "shouldnotnull": true
                },
                "properties": {
                    "type": "object",
                    "shouldnotnull": true,
                    "properties": {
                        "event_name": {
                            "type": "object",
                            "shouldnotnull": true,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": ["string", "number", "boolean","integer"],
                                    "shouldnotnull": true
                                }
                            },
                            "required": ["type"]
                        },
                        "event": {
                            "type": "object",
                            "shouldnotnull": true,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "pattern": "array",
                                    "shouldnotnull": true
                                },
                                "items": {
                                    "type": "object",
                                    "shouldnotnull": true,
                                    "properties": {
                                        "type": {
                                            "type": "string",
                                            "enum": ["object"],
                                            "shouldnotnull": true
                                        },
                                        "properties": {
                                            "type": "object",
                                            "shouldnotnull": true,
                                            "patternProperties": {
                                                "^[a-zA-Z_]*$": {
                                                    "type": "object",
                                                    "properties": {
                                                        "type": {
                                                            "type": "string",
                                                            "enum": ["string", "number", "boolean","integer"],
                                                            "shouldnotnull": true
                                                        }
                                                    },
                                                    "required": ["type"],
                                                    "shouldnotnull": true
                                                }
                                            }
                                        },
                                        "required": {
                                            "type": "array",
                                            "shouldnotnull": false
                                        }
                                    },
                                    "required": ["type", "properties", "required"],
                                    "additionalProperties": false
                                },
                                "required": {
                                    "type": "array",
                                    "shouldnotnull": false
                                }
                            },
                            "required": ["type", "items"],
                        }
                    },
                    "required": ["event_name", "event"],
                    "additionalProperties": false
                },
                "required": {
                    "type": "array",
                    "items": [{
                        "shouldnotnull": true,
                        "type": "string",
                        "pattern": "event_name"
                    }, {"shouldnotnull": true, "type": "string", "pattern": "event"}],
                    "shouldnotnull": true,
                    "minItems": 2,
                    "additionalItems": false
                }
            },
            "required": ["type", "properties", "required"],
            "additionalProperties": false
        }
    },
    "required": ["ingestion_type", "event_name", "input"],
    "additionalProperties": false
};

export const transformerSchemaData = {
    "ingestion_type": "transformer",
    "input": {
        "type": "object",
        "shouldnotnull": true,
        "properties": {
            "ingestion_name": {
                "type": "string",
                "shouldnotnull": true
            },
            "key_file": {
                "type": "string",
                "shouldnotnull": true
            },
            "program": {
                "type": "string",
                "shouldnotnull": true
            },
            "operation": {
                "type": "string",
                "shouldnotnull": true

            },
           
        },
        "required": [
            "ingestion_name",
            "key_file",
            "program",
            "operation"
        ]
    }
};
export const PipelineSchemaDimensiontoDB ={
    "type": "object",
    "properties": {
        "pipeline_name": {
            "type": "string",
            "shouldnotnull": true
        },
        "pipeline_type": {
            "type": "string",
            "shouldnotnull": true
        },
        "pipeline": {
            "type": "array",
            "shouldnotnull": true,
        
        "items": {
            "type": "object",
            "properties": {
                "transformer_name": {
                    "type": "string",
                    "shouldnotnull": true
                },
                "dimension_name": {
                    "type": "string",
                    "shouldnotnull": true
                }
            },
            "required": ["transformer_name","dimension_name"]
        }
    }
    },
    "required":["pipeline_name","pipeline_type","pipeline"]
}

export const PipelineSchemaDatasettoDB = {
    "type": "object",
    "properties": {
        "pipeline_name": {
            "type": "string",
            "shouldnotnull": true
        },
        "pipeline_type": {
            "type": "string",
            "shouldnotnull": true
        },
        "pipeline": {
            "type": "array",
            "shouldnotnull": true,
        
        "items": {
            "type": "object",
            "properties": {
                "transformer_name": {
                    "type": "string",
                    "shouldnotnull": true
                },
                "dataset_name": {
                    "type": "string",
                    "shouldnotnull": true
                }
            },
            "required": ["transformer_name","dataset_name"]
        }
    }
    },
    "required":["pipeline_name","pipeline_type","pipeline"]

}

export const PipelineSchemaIngesttoDB = {
    "type": "object",
    "properties": {
        "pipeline_name": {
            "type": "string",
            "shouldnotnull": true
        },
        "pipeline_type": {
            "type": "string",
            "shouldnotnull": true
        },
        "pipeline": {
            "type": "array",
            "shouldnotnull": true,
        
        "items": {
            "type": "object",
            "properties": {
                "transformer_name": {
                    "type": "string",
                    "shouldnotnull": true
                },
                "dataset_name": {
                    "type": "string",
                    "shouldnotnull": true
                },
                "dimension_name": {
                    "type": "string",
                    "shouldnotnull": true
                },
                "event_name": {
                    "type": "string",
                    "shouldnotnull": true
                },

            },
            "required": ["transformer_name","dataset_name","dimension_name"]
        }
    }
    },
    "required":["pipeline_name","pipeline_type","pipeline"]

}

export const datasetSchemaData = {
    
        "type": "object",
        "properties": {
            "ingestion_type": {
                "type": "string",
                "pattern": "dataset",
                "shouldnotnull": true
            },
            "dataset_name": {
                "type": "string",
                "shouldnotnull": true
            },
            "input": {
                "type": "object",
                "shouldnotnull": true,
                "properties": {
                    "type": {
                        "type": "string",
                        "pattern": "object",
                        "shouldnotnull": true
                    },
                    "properties": {
                        "type": "object",
                        "shouldnotnull": true,
                        "properties": {
                            "dataset_name": {
                                "type": "object",
                                "shouldnotnull": true,
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "pattern": "string",
                                        "enum": [
                                            "string",
                                            "number",
                                            "boolean",
                                            "integer"
                                        ],
                                        "shouldnotnull": true
                                    }
                                }
                            },
                            "dimensions": {
                                "type": "object",
                                "shouldnotnull": true,
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "pattern": "object",
                                        "shouldnotnull": true
                                    },
                                    "properties": {
                                        "type": "object",
                                        "shouldnotnull": true,
                                        "properties": {
                                            "table": {
                                                "type": "string",
                                                "shouldnotnull": true
                                            },
                                            "column": {
                                                "type": "array",
                                                "shouldnotnull": true,
                                                "items": {
                                                    "type": "string",
                                                    "shouldnotnull": true
                                                }
                                            },
                                            "merge_on_col": {
                                                "type": "string",
                                                "shouldnotnull": true
                                            }
                                        },
                                        "required": [
                                            "table",
                                            "column",
                                            "merge_on_col"
                                        ]
                                    }
                                },
                                "required": [
                                    "type",
                                    "properties"
                                ]
                            },
                            "dataset": {
                                "type": "object",
                                "shouldnotnull": true,
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "pattern": "object",
                                        "shouldnotnull": true
                                    },
                                    "properties": {
                                        "type": "object",
                                        "shouldnotnull": true,
                                        "properties": {
                                            "items": {
                                                "type": "object",
                                                "shouldnotnull": true,
                                                "properties": {
                                                    "type": {
                                                        "type": "string",
                                                        "pattern": "array",
                                                        "shouldnotnull": true
                                                    },
                                                    "items": {
                                                        "type": "object",
                                                        "shouldnotnull": true,
                                                        "properties": {
                                                            "type": {
                                                                "type": "string",
                                                                "pattern": "object",
                                                                "shouldnotnull": true
                                                            },
                                                            "properties": {
                                                                "type": "object",
                                                                "shouldnotnull": true,
                                                                "patternProperties": {
                                                                    "^[a-zA-Z_]*$": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                            "type": {
                                                                                "type": "string",
                                                                                "enum": [
                                                                                    "string",
                                                                                    "number",
                                                                                    "boolean",
                                                                                    "integer"
                                                                                ],
                                                                                "shouldnotnull": true
                                                                            }
                                                                        },
                                                                        "required": [
                                                                            "type"
                                                                        ],
                                                                        "shouldnotnull": true
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "required": [
                                                            "type",
                                                            "properties"
                                                        ]
                                                    }
                                                },
                                                "required": [
                                                    "type",
                                                    "items"
                                                ]
                                            },
                                            "group_by": {
                                                "type": "array",
                                                "shouldnotnull": true,
                                                "items": {
                                                    "type": "string",
                                                    "shouldnotnull": true
                                                }
                                            },
                                            "aggregate": {
                                                "type": "object",
                                                "shouldnotnull": true,
                                                "properties": {
                                                    "type": {
                                                        "type": "string",
                                                        "pattern": "object",
                                                        "shouldnotnull": true
                                                    },
                                                    "properties": {
                                                        "type": "object",
                                                        "shouldnotnull": true,
                                                        "properties": {
                                                            "function": {
                                                                "type": "array",
                                                                "shouldnotnull": true,
                                                                "items": {
                                                                    "type": "string",
                                                                    "shouldnotnull": true
                                                                }
                                                            },
                                                            "target_table": {
                                                                "type": "string",
                                                                "shouldnotnull": true
                                                            },
                                                            "numerator_col": {
                                                                "type": "string",
                                                                "shouldnotnull": true
                                                            },
                                                            "denominator_col": {
                                                                "type": "string",
                                                                "shouldnotnull": true
                                                            },
                                                            "update_cols": {
                                                                "type": "array",
                                                                "shouldnotnull": true,
                                                                "items": {
                                                                    "type": "string",
                                                                    "shouldnotnull": true
                                                                }
                                                            },
                                                            "columns": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "type": {
                                                                        "type": "string",
                                                                        "pattern": "array",
                                                                        "shouldnotnull": true
                                                                    },
                                                                    "items": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                            "type": {
                                                                                "type": "string",
                                                                                "shouldnotnull": true
                                                                            },
                                                                            "properties": {
                                                                                "type": "object",
                                                                                "shouldnotnull": true,
                                                                                "properties": {
                                                                                    "column": {
                                                                                        "type": "array",
                                                                                        "shouldnotnull": true,
                                                                                        "items": {
                                                                                            "type": "string",
                                                                                            "shouldnotnull": true
                                                                                        }
                                                                                    },
                                                                                    "table": {
                                                                                        "type": "string",
                                                                                        "shouldnotnull": true
                                                                                    }
                                                                                },
                                                                                "required": [
                                                                                    "column"
                                                                                ]
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            "filters": {
                                                                "type": "object",
                                                                "shouldnotnull": true,
                                                                "properties": {
                                                                    "type": {
                                                                        "type": "string",
                                                                        "shouldnotnull": true
                                                                    },
                                                                    "properties": {
                                                                        "type": "object",
                                                                        "shouldnotnull": true,
                                                                        "properties": {
                                                                            "type": {
                                                                                "type": "string",
                                                                                "pattern": "object",
                                                                                "shouldnotnull": true
                                                                            },
                                                                            "filter_col": {
                                                                                "type": "string",
                                                                                "shouldnotnull": true
                                                                            },
                                                                            "filter_type": {
                                                                                "type": "string",
                                                                                "shouldnotnull": true
                                                                            },
                                                                            "filter": {
                                                                                "type": "string",
                                                                                "shouldnotnull": true
                                                                            }
                                                                        },
                                                                        "required": [
                                                                            "filter_col",
                                                                            "filter_type",
                                                                            "filter"
                                                                        ]
                                                                    }
                                                                },
                                                                "required": [
                                                                    "type",
                                                                    "properties"
                                                                ]
                                                            }
                                                        },
                                                        "required": [
                                                            "function",
                                                            "target_table",
                                                            "columns"
                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        "required": [
                                            "items"
                                        ]
                                    }
                                }
                            }
                        },
                        "required": [
                            "dataset_name",
                            "dimensions",
                            "dataset"
                        ]
                    }
                }
            }
        },
        "required": [
            "ingestion_type",
            "dataset_name",
            "input"
        ],
        "additionalProperties": false
    
    };
export const scheduleSchema = {
    "type": "object",
    "properties": {
        "pipeline_name": {
            "type": "string",
            "shouldnotnull": true
        },
        "scheduled_at": {
            "type": "string",
            "shouldnotnull": true
        }
    }
}
