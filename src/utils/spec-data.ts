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
                                    "enum": ["string", "number", "boolean"],
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
                                                            "enum": ["string", "number", "boolean"],
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
                            "additionalProperties": false
                        }
                    },
                    "required": ["dimension_name", "dimension"],
                    "additionalProperties": false
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
                                    "enum": ["string", "number", "boolean"],
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
                                                            "enum": ["string", "number", "boolean"],
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
                            "additionalProperties": false
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
                                        "boolean"
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
                                                                        "boolean"
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
                                        },
                                        "column": {
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
                                                                                "boolean"
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
                                        "merge_on_col": {
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
                                                                        "boolean"
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
                                                                                "boolean"
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
                                                                                "boolean"
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
                                                                                                "boolean"
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
                                                        "target_table": {
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
                                                                                        "boolean"
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
                                                        },
                                                        "update_cols": {
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
                                                                                                "boolean"
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
                                                        "columns": {
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
                                                                            "properties": {
                                                                                "column": {
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
                                                                                                                        "boolean"
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
                                                                                "table": {
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
                                                                                                                "boolean"
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
                                                                                "column"
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
                                                                "type",
                                                                "items"
                                                            ]
                                                        },
                                                        "filters": {
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
                                                                            "properties": {
                                                                                "column": {
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
                                                                                                    "shouldnotnull": true,
                                                                                                    "properties": {
                                                                                                        "type": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                "string",
                                                                                                                "number",
                                                                                                                "boolean"
                                                                                                            ],
                                                                                                            "shouldnotnull": true
                                                                                                        }
                                                                                                    },
                                                                                                    "required": [
                                                                                                        "type"
                                                                                                    ]
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    "required": [
                                                                                        "type",
                                                                                        "properties"
                                                                                    ]
                                                                                },
                                                                                "filter": {
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
                                                                                                                "boolean"
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
                                                                                },
                                                                                "filter_type": {
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
                                                                                                                "boolean"
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
                                                                                "column",
                                                                                "filter",
                                                                                "filter_type"
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
                                                                "type",
                                                                "items"
                                                            ]
                                                        }
                                                    },
                                                    "required": [
                                                        "function",
                                                        "target_table",
                                                        "columns"
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
                                        "items",
                                        "group_by",
                                        "aggregate"
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
                        "dataset_name",
                        "dimensions",
                        "dataset"
                    ]
                }
            },
            "required": [
                "type",
                "properties"
            ],
            "additionalProperties": true
        }
    },
    "required": [
        "ingestion_type",
        "dataset_name",
        "input"
    ],
    "additionalProperties": false
};

export const transformerSchemaData = {
    "ingestion_type": "transformer",
    "input": {
        "type": "object",
        "properties": {
            "event_name": {
                "type": "string"
            },
            "dataset_name": {
                "type": "string"
            },
            "template": {
                "type": "string"
            },
            "transformer_type": {
                "type": "string"
            },
        },
        "required": [
            "event_name",
            "dataset_name",
            "template",
            "transformer_type"
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
