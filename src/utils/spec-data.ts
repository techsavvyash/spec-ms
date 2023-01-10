export const dimensionSchemaData = {
    "type": "object",
    "properties": {
        "ingestion_type": {
            "type": "string",
            "pattern": "dimension",
            "shouldNotNull": true
        },
        "dimension_name": {
            "type": "string",
            "shouldNotNull": true
        },
        "input": {
            "type": "object",
            "shouldNotNull": true,
            "properties": {
                "type": {
                    "type": "string",
                    "pattern": "object",
                    "shouldNotNull": true
                },
                "properties": {
                    "type": "object",
                    "shouldNotNull": true,
                    "properties": {
                        "dimension_name": {
                            "type": "object",
                            "shouldNotNull": true,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": ["string", "number", "boolean"],
                                    "shouldNotNull": true
                                }
                            },
                            "required": ["type"]
                        },
                        "dimension": {
                            "type": "object",
                            "shouldNotNull": true,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "pattern": "array",
                                    "shouldNotNull": true
                                },
                                "items": {
                                    "type": "object",
                                    "shouldNotNull": true,
                                    "properties": {
                                        "type": {
                                            "type": "string",
                                            "enum": ["object"],
                                            "shouldNotNull": true
                                        },
                                        "properties": {
                                            "type": "object",
                                            "shouldNotNull": true,
                                            "patternProperties": {
                                                "^[a-zA-Z_]*$": {
                                                    "type": "object",
                                                    "properties": {
                                                        "type": {
                                                            "type": "string",
                                                            "enum": ["string", "number", "boolean"],
                                                            "shouldNotNull": true
                                                        }
                                                    },
                                                    "required": ["type"],
                                                    "shouldNotNull": true
                                                }
                                            }
                                        },
                                        "required": {
                                            "type": "array",
                                            "shouldNotNull": false
                                        }
                                    },
                                    "required": ["type", "properties", "required"],
                                    "additionalProperties": false
                                },
                                "required": {
                                    "type": "array",
                                    "shouldNotNull": false
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
                        "shouldNotNull": true,
                        "type": "string",
                        "pattern": "dimension_name"
                    }, {"shouldNotNull": true, "type": "string", "pattern": "dimension"}],
                    "shouldNotNull": true,
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
            "shouldNotNull": true
        },
        "event_name": {
            "type": "string",
            "shouldNotNull": true
        },
        "input": {
            "type": "object",
            "shouldNotNull": true,
            "properties": {
                "type": {
                    "type": "string",
                    "pattern": "object",
                    "shouldNotNull": true
                },
                "properties": {
                    "type": "object",
                    "shouldNotNull": true,
                    "properties": {
                        "event_name": {
                            "type": "object",
                            "shouldNotNull": true,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": ["string", "number", "boolean"],
                                    "shouldNotNull": true
                                }
                            },
                            "required": ["type"]
                        },
                        "event": {
                            "type": "object",
                            "shouldNotNull": true,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "pattern": "array",
                                    "shouldNotNull": true
                                },
                                "items": {
                                    "type": "object",
                                    "shouldNotNull": true,
                                    "properties": {
                                        "type": {
                                            "type": "string",
                                            "enum": ["object"],
                                            "shouldNotNull": true
                                        },
                                        "properties": {
                                            "type": "object",
                                            "shouldNotNull": true,
                                            "patternProperties": {
                                                "^[a-zA-Z_]*$": {
                                                    "type": "object",
                                                    "properties": {
                                                        "type": {
                                                            "type": "string",
                                                            "enum": ["string", "number", "boolean"],
                                                            "shouldNotNull": true
                                                        }
                                                    },
                                                    "required": ["type"],
                                                    "shouldNotNull": true
                                                }
                                            }
                                        },
                                        "required": {
                                            "type": "array",
                                            "shouldNotNull": false
                                        }
                                    },
                                    "required": ["type", "properties", "required"],
                                    "additionalProperties": false
                                },
                                "required": {
                                    "type": "array",
                                    "shouldNotNull": false
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
                        "shouldNotNull": true,
                        "type": "string",
                        "pattern": "event_name"
                    }, {"shouldNotNull": true, "type": "string", "pattern": "event"}],
                    "shouldNotNull": true,
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
            "shouldNotNull": true
        },
        "dataset_name": {
            "type": "string",
            "shouldNotNull": true
        },
        "input": {
            "type": "object",
            "shouldNotNull": true,
            "properties": {
                "type": {
                    "type": "string",
                    "pattern": "object",
                    "shouldNotNull": true
                },
                "properties": {
                    "type": "object",
                    "shouldNotNull": true,
                    "properties": {
                        "dataset_name": {
                            "type": "object",
                            "shouldNotNull": true,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "pattern": "string",
                                    "enum": [
                                        "string",
                                        "number",
                                        "boolean"
                                    ],
                                    "shouldNotNull": true
                                }
                            }
                        },
                        "dimensions": {
                            "type": "object",
                            "shouldNotNull": true,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "pattern": "object",
                                    "shouldNotNull": true
                                },
                                "properties": {
                                    "type": "object",
                                    "shouldNotNull": true,
                                    "properties": {
                                        "table": {
                                            "type": "object",
                                            "shouldNotNull": true,
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "pattern": "object",
                                                    "shouldNotNull": true
                                                },
                                                "properties": {
                                                    "type": "object",
                                                    "shouldNotNull": true,
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
                                                                    "shouldNotNull": true
                                                                }
                                                            },
                                                            "required": [
                                                                "type"
                                                            ],
                                                            "shouldNotNull": true
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
                                            "shouldNotNull": true,
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "pattern": "array",
                                                    "shouldNotNull": true
                                                },
                                                "items": {
                                                    "type": "object",
                                                    "shouldNotNull": true,
                                                    "properties": {
                                                        "type": {
                                                            "type": "string",
                                                            "pattern": "object",
                                                            "shouldNotNull": true
                                                        },
                                                        "properties": {
                                                            "type": "object",
                                                            "shouldNotNull": true,
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
                                                                            "shouldNotNull": true
                                                                        }
                                                                    },
                                                                    "required": [
                                                                        "type"
                                                                    ],
                                                                    "shouldNotNull": true
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
                                            "shouldNotNull": true,
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "pattern": "object",
                                                    "shouldNotNull": true
                                                },
                                                "properties": {
                                                    "type": "object",
                                                    "shouldNotNull": true,
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
                                                                    "shouldNotNull": true
                                                                }
                                                            },
                                                            "required": [
                                                                "type"
                                                            ],
                                                            "shouldNotNull": true
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
                            "shouldNotNull": true,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "pattern": "object",
                                    "shouldNotNull": true
                                },
                                "properties": {
                                    "type": "object",
                                    "shouldNotNull": true,
                                    "properties": {
                                        "items": {
                                            "type": "object",
                                            "shouldNotNull": true,
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "pattern": "array",
                                                    "shouldNotNull": true
                                                },
                                                "items": {
                                                    "type": "object",
                                                    "shouldNotNull": true,
                                                    "properties": {
                                                        "type": {
                                                            "type": "string",
                                                            "pattern": "object",
                                                            "shouldNotNull": true
                                                        },
                                                        "properties": {
                                                            "type": "object",
                                                            "shouldNotNull": true,
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
                                                                            "shouldNotNull": true
                                                                        }
                                                                    },
                                                                    "required": [
                                                                        "type"
                                                                    ],
                                                                    "shouldNotNull": true
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
                                            "shouldNotNull": true,
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "pattern": "array",
                                                    "shouldNotNull": true
                                                },
                                                "items": {
                                                    "type": "object",
                                                    "shouldNotNull": true,
                                                    "properties": {
                                                        "type": {
                                                            "type": "string",
                                                            "pattern": "object",
                                                            "shouldNotNull": true
                                                        },
                                                        "properties": {
                                                            "type": "object",
                                                            "shouldNotNull": true,
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
                                                                            "shouldNotNull": true
                                                                        }
                                                                    },
                                                                    "required": [
                                                                        "type"
                                                                    ],
                                                                    "shouldNotNull": true
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
                                            "shouldNotNull": true,
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "pattern": "object",
                                                    "shouldNotNull": true
                                                },
                                                "properties": {
                                                    "type": "object",
                                                    "shouldNotNull": true,
                                                    "properties": {
                                                        "function": {
                                                            "type": "object",
                                                            "shouldNotNull": true,
                                                            "properties": {
                                                                "type": {
                                                                    "type": "string",
                                                                    "pattern": "array",
                                                                    "shouldNotNull": true
                                                                },
                                                                "items": {
                                                                    "type": "object",
                                                                    "shouldNotNull": true,
                                                                    "properties": {
                                                                        "type": {
                                                                            "type": "string",
                                                                            "pattern": "object",
                                                                            "shouldNotNull": true
                                                                        },
                                                                        "properties": {
                                                                            "type": "object",
                                                                            "shouldNotNull": true,
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
                                                                                            "shouldNotNull": true
                                                                                        }
                                                                                    },
                                                                                    "required": [
                                                                                        "type"
                                                                                    ],
                                                                                    "shouldNotNull": true
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
                                                            "shouldNotNull": true,
                                                            "properties": {
                                                                "type": {
                                                                    "type": "string",
                                                                    "pattern": "object",
                                                                    "shouldNotNull": true
                                                                },
                                                                "properties": {
                                                                    "type": "object",
                                                                    "shouldNotNull": true,
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
                                                                                    "shouldNotNull": true
                                                                                }
                                                                            },
                                                                            "required": [
                                                                                "type"
                                                                            ],
                                                                            "shouldNotNull": true
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
                                                            "shouldNotNull": true,
                                                            "properties": {
                                                                "type": {
                                                                    "type": "string",
                                                                    "pattern": "array",
                                                                    "shouldNotNull": true
                                                                },
                                                                "items": {
                                                                    "type": "object",
                                                                    "shouldNotNull": true,
                                                                    "properties": {
                                                                        "type": {
                                                                            "type": "string",
                                                                            "pattern": "object",
                                                                            "shouldNotNull": true
                                                                        },
                                                                        "properties": {
                                                                            "type": "object",
                                                                            "shouldNotNull": true,
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
                                                                                            "shouldNotNull": true
                                                                                        }
                                                                                    },
                                                                                    "required": [
                                                                                        "type"
                                                                                    ],
                                                                                    "shouldNotNull": true
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
                                                            "shouldNotNull": true,
                                                            "properties": {
                                                                "type": {
                                                                    "type": "string",
                                                                    "pattern": "array",
                                                                    "shouldNotNull": true
                                                                },
                                                                "items": {
                                                                    "type": "object",
                                                                    "shouldNotNull": true,
                                                                    "properties": {
                                                                        "type": {
                                                                            "type": "string",
                                                                            "pattern": "object",
                                                                            "shouldNotNull": true
                                                                        },
                                                                        "properties": {
                                                                            "type": "object",
                                                                            "shouldNotNull": true,
                                                                            "properties": {
                                                                                "column": {
                                                                                    "type": "object",
                                                                                    "shouldNotNull": true,
                                                                                    "properties": {
                                                                                        "type": {
                                                                                            "type": "string",
                                                                                            "pattern": "array",
                                                                                            "shouldNotNull": true
                                                                                        },
                                                                                        "items": {
                                                                                            "type": "object",
                                                                                            "shouldNotNull": true,
                                                                                            "properties": {
                                                                                                "type": {
                                                                                                    "type": "string",
                                                                                                    "pattern": "object",
                                                                                                    "shouldNotNull": true
                                                                                                },
                                                                                                "properties": {
                                                                                                    "type": "object",
                                                                                                    "shouldNotNull": true,
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
                                                                                                                    "shouldNotNull": true
                                                                                                                }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                "type"
                                                                                                            ],
                                                                                                            "shouldNotNull": true
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
                                                                                    "shouldNotNull": true,
                                                                                    "properties": {
                                                                                        "type": {
                                                                                            "type": "string",
                                                                                            "pattern": "object",
                                                                                            "shouldNotNull": true
                                                                                        },
                                                                                        "properties": {
                                                                                            "type": "object",
                                                                                            "shouldNotNull": true,
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
                                                                                                            "shouldNotNull": true
                                                                                                        }
                                                                                                    },
                                                                                                    "required": [
                                                                                                        "type"
                                                                                                    ],
                                                                                                    "shouldNotNull": true
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
                                                            "shouldNotNull": true,
                                                            "properties": {
                                                                "type": {
                                                                    "type": "string",
                                                                    "pattern": "array",
                                                                    "shouldNotNull": true
                                                                },
                                                                "items": {
                                                                    "type": "object",
                                                                    "shouldNotNull": true,
                                                                    "properties": {
                                                                        "type": {
                                                                            "type": "string",
                                                                            "pattern": "object",
                                                                            "shouldNotNull": true
                                                                        },
                                                                        "properties": {
                                                                            "type": "object",
                                                                            "shouldNotNull": true,
                                                                            "properties": {
                                                                                "filter_col": {
                                                                                    "type": "object",
                                                                                    "shouldNotNull": true,
                                                                                    "properties": {
                                                                                        "type": {
                                                                                            "type": "string",
                                                                                            "pattern": "object",
                                                                                            "shouldNotNull": true
                                                                                        },
                                                                                        "properties": {
                                                                                            "type": "object",
                                                                                            "shouldNotNull": true,
                                                                                            "patternProperties": {
                                                                                                "^[a-zA-Z_]*$": {
                                                                                                    "type": "object",
                                                                                                    "shouldNotNull": true,
                                                                                                    "properties": {
                                                                                                        "type": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                "string",
                                                                                                                "number",
                                                                                                                "boolean"
                                                                                                            ],
                                                                                                            "shouldNotNull": true
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
                                                                                    "shouldNotNull": true,
                                                                                    "properties": {
                                                                                        "type": {
                                                                                            "type": "string",
                                                                                            "pattern": "object",
                                                                                            "shouldNotNull": true
                                                                                        },
                                                                                        "properties": {
                                                                                            "type": "object",
                                                                                            "shouldNotNull": true,
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
                                                                                                            "shouldNotNull": true
                                                                                                        }
                                                                                                    },
                                                                                                    "required": [
                                                                                                        "type"
                                                                                                    ],
                                                                                                    "shouldNotNull": true
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
                                                                                    "shouldNotNull": true,
                                                                                    "properties": {
                                                                                        "type": {
                                                                                            "type": "string",
                                                                                            "pattern": "object",
                                                                                            "shouldNotNull": true
                                                                                        },
                                                                                        "properties": {
                                                                                            "type": "object",
                                                                                            "shouldNotNull": true,
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
                                                                                                            "shouldNotNull": true
                                                                                                        }
                                                                                                    },
                                                                                                    "required": [
                                                                                                        "type"
                                                                                                    ],
                                                                                                    "shouldNotNull": true
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
                                                                                "filter_col",
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
        "shouldNotNull": true,
        "properties": {
            "event_name": {
                "type": "string",
                "shouldNotNull": true
            },
            "key_file": {
                "type": "string",
                "shouldNotNull": true
            },
            "program": {
                "type": "string",
                "shouldNotNull": true
            },
           
        },
        "required": [
            "event_name",
            "key_file",
            "program",
        ]
    }
};
export const PipelineSchemaDimensiontoDB ={
    "type": "object",
    "properties": {
        "pipeline_name": {
            "type": "string",
            "shouldNotNull": true
        },
        "pipeline_type": {
            "type": "string",
            "shouldNotNull": true
        },
        "pipeline": {
            "type": "array",
            "shouldNotNull": true,
        
        "items": {
            "type": "object",
            "properties": {
                "transformer_name": {
                    "type": "string",
                    "shouldNotNull": true
                },
                "dimension_name": {
                    "type": "string",
                    "shouldNotNull": true
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
            "shouldNotNull": true
        },
        "pipeline_type": {
            "type": "string",
            "shouldNotNull": true
        },
        "pipeline": {
            "type": "array",
            "shouldNotNull": true,
        
        "items": {
            "type": "object",
            "properties": {
                "transformer_name": {
                    "type": "string",
                    "shouldNotNull": true
                },
                "dataset_name": {
                    "type": "string",
                    "shouldNotNull": true
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
            "shouldNotNull": true
        },
        "pipeline_type": {
            "type": "string",
            "shouldNotNull": true
        },
        "pipeline": {
            "type": "array",
            "shouldNotNull": true,
        
        "items": {
            "type": "object",
            "properties": {
                "transformer_name": {
                    "type": "string",
                    "shouldNotNull": true
                },
                "dataset_name": {
                    "type": "string",
                    "shouldNotNull": true
                },
                "dimension_name": {
                    "type": "string",
                    "shouldNotNull": true
                },
                "event_name": {
                    "type": "string",
                    "shouldNotNull": true
                },

            },
            "required": ["transformer_name","dataset_name","dimension_name"]
        }
    }
    },
    "required":["pipeline_name","pipeline_type","pipeline"]

}
