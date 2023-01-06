import { Test, TestingModule } from '@nestjs/testing';
import { DatasetService } from './dataset.service';
import { DataSource } from 'typeorm';
import { GenericFunction } from '../genericFunction';
import { async } from 'rxjs';
describe('DatasetService', () => {
  let service: DatasetService;
  const mockTransacation = {
    createQueryRunner: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      startTransaction: jest.fn(),
      release: jest.fn(),
      rollbackTransaction: jest.fn(), 
      commitTransaction:jest.fn(),
      query: jest.fn().mockReturnValueOnce([{pid:1}]).mockReturnValueOnce([{pid:1}])
    })),
    query: jest.fn().mockReturnValueOnce([{length: 1}]).mockReturnValueOnce([]).mockReturnValueOnce([{length: 1}]).mockReturnValueOnce([]).mockReturnValueOnce([])
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatasetService, DataSource, GenericFunction,
        {
          provide: DatasetService,
          useClass: DatasetService
        },
        {
          provide: DataSource,
          useValue: mockTransacation
        },
        {
          provide: GenericFunction,
          useClass: GenericFunction
        },
      ],

    }).compile();

    service = module.get<DatasetService>(DatasetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validation', async () => {
    let dimensionData = {
      // "ingestion_type": "dataset",
      "dataset_name": "student_attendance_by_class",
      "input": {
        "type": "object",
        "properties": {
          "dataset_name": {
            "type": "string"
          },
          "dimensions": {
            "type": "object",
            "properties": {
              "table": {
                "type": "object",
                "properties": {
                  "ingestion.student_attendance": {
                    "type": "string"
                  }
                }
              },
              "column": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "school_id": {
                      "type": "string"
                    },
                    "cluster_id": {
                      "type": "string"
                    }
                  }
                }
              },
              "merge_On_Col": {
                "type": "object",
                "properties": {
                  "school_id": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "dataset": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string"
                    },
                    "school_id": {
                      "type": "string"
                    },
                    "grade": {
                      "type": "string"
                    },
                    "count": {
                      "type": "number"
                    },
                    "sum": {
                      "type": "number"
                    },
                    "percentage": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "date",
                    "school_id",
                    "grade",
                    "count",
                    "sum",
                    "percentage"
                  ]
                }
              },
              "groupBy": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string"
                    },
                    "school_id": {
                      "type": "string"
                    },
                    "grade": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "date",
                    "school_id",
                    "grade"
                  ]
                }
              },
              "aggregate": {
                "type": "object",
                "properties": {
                  "function": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "sum": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "targetTable": {
                    "type": "object",
                    "properties": {
                      "ingestion.student_attendance_by_class": {
                        "type": "string"
                      }
                    }
                  },
                  "updateCols": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "sum": {
                          "type": "number"
                        },
                        "count": {
                          "type": "number"
                        },
                        "percentage": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  "columns": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "column": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "students_attendance_marked": {
                                "type": "string"
                              },
                              "total_students": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "required": [
                  "function",
                  "targetTable",
                  "columns"
                ]
              }
            },
            "required": [
              "items"
            ]
          }
        },
        "required": [
          "dataset_name",
          "dimensions",
          "dataset"
        ]
      }
    }
    let resultData = {
      "code": 400, "error": [
        {
            "instancePath": "",
            "schemaPath": "#/required",
            "keyword": "required",
            "params": {
                "missingProperty": "ingestion_type"
            },
            "message": "must have required property 'ingestion_type'"
        }
    ]
    }
    expect(await service.createDataset(dimensionData)).toStrictEqual(resultData)
  }); 

  it('invalid request body', async () => {
    let inputData = {
      "ingestion_type": "dataset",
      "dataset_name": "student_attendance_by_classs",
      "input": {
        "type": "object",
        "properties": {
          "dataset_name": {
            "type": "string"
          },
          "dimensions": {
            "type": "object",
            "properties": {
              "table": {
                "type": "object",
                "properties": {
                  "ingestion.student_attendance": {
                    "type": "string"
                  }
                }
              },
              "column": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "school_id": {
                      "type": "string"
                    }
                  }
                }
              },
              "merge_on_col": {
                "type": "object",
                "properties": {
                  "school_id": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "dataset": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string",
                      "shouldNotNull": true,
                      "format": "date"
                    },
                    "school_id": {
                      "type": "number",
                      "shouldNotNull": true,
                      "pattern": "^[0-9]{10}$"
                    },
                    "grade": {
                      "type": "number",
                      "shouldNotNull": true,
                      "minimum": 1,
                      "maximum": 12
                    },
                    // "count": {
                    //   "type": "number",
                    //   "shouldNotNull": true
                    // },
                    "sum": {
                      "type": "number",
                      "shouldNotNull": true
                    },
                    "percentage": {
                      "type": "number",
                      "shouldNotNull": true
                    }
                  },
                  "required": [
                    "date",
                    "school_id",
                    "grade",
                    "count",
                    "sum",
                    "percentage"
                  ]
                }
              },
              "group_by": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string"
                    },
                    "school_id": {
                      "type": "string"
                    },
                    "grade": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "date",
                    "school_id",
                    "grade"
                  ]
                }
              },
              "aggregate": {
                "type": "object",
                "properties": {
                  "function": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "sum": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "target_table": {
                    "type": "object",
                    "properties": {
                      "ingestion.student_attendance_by_class": {
                        "type": "string"
                      }
                    }
                  },
                  "update_cols": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "sum": {
                          "type": "number"
                        },
                        "count": {
                          "type": "number"
                        },
                        "percentage": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  "columns": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "column": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "students_attendance_marked": {
                                "type": "string"
                              },
                              "total_students": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "required": [
                  "function",
                  "target_table",
                  "columns",
                  "update_cols"
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
          "dataset_name",
          "dimensions",
          "dataset"
        ]
      }
    }
    let result = {
      "code": 400, "error": 'One/more invalid required fields'
    }

    expect(await service.createDataset(inputData)).toStrictEqual(result)
  });

  it('Dataset Name already exists', async () => {
    let inputData = {
      "ingestion_type": "dataset",
      "dataset_name": "student_attendance_by_class",
      "input": {
        "type": "object",
        "properties": {
          "dataset_name": {
            "type": "string"
          },
          "dimensions": {
            "type": "object",
            "properties": {
              "table": {
                "type": "object",
                "properties": {
                  "ingestion.student_attendance": {
                    "type": "string"
                  }
                }
              },
              "column": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "school_id": {
                      "type": "string"
                    }
                  }
                }
              },
              "merge_on_col": {
                "type": "object",
                "properties": {
                  "school_id": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "dataset": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string",
                      "shouldNotNull": true,
                      "format": "date"
                    },
                    "school_id": {
                      "type": "number",
                      "shouldNotNull": true,
                      "pattern": "^[0-9]{10}$"
                    },
                    "grade": {
                      "type": "number",
                      "shouldNotNull": true,
                      "minimum": 1,
                      "maximum": 12
                    },
                    "count": {
                      "type": "number",
                      "shouldNotNull": true
                    },
                    "sum": {
                      "type": "number",
                      "shouldNotNull": true
                    },
                    "percentage": {
                      "type": "number",
                      "shouldNotNull": true
                    }
                  },
                  "required": [
                    "date",
                    "school_id",
                    "grade",
                    "count",
                    "sum",
                    "percentage"
                  ]
                }
              },
              "group_by": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string"
                    },
                    "school_id": {
                      "type": "string"
                    },
                    "grade": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "date",
                    "school_id",
                    "grade"
                  ]
                }
              },
              "aggregate": {
                "type": "object",
                "properties": {
                  "function": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "sum": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "target_table": {
                    "type": "object",
                    "properties": {
                      "ingestion.student_attendance_by_class": {
                        "type": "string"
                      }
                    }
                  },
                  "update_cols": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "sum": {
                          "type": "number"
                        },
                        "count": {
                          "type": "number"
                        },
                        "percentage": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  "columns": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "column": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "students_attendance_marked": {
                                "type": "string"
                              },
                              "total_students": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "required": [
                  "function",
                  "target_table",
                  "columns",
                  "update_cols"
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
          "dataset_name",
          "dimensions",
          "dataset"
        ]
      }
    }

    let result = {
      "code": 400, "error": "Dataset Name already exists"
    }
    expect(await service.createDataset(inputData)).toStrictEqual(result)
  });

  it('Duplicate Dataset not allowed', async () => {
    let inputData = {
      "ingestion_type": "dataset",
      "dataset_name": "student_attendance_by_class",
      "input": {
        "type": "object",
        "properties": {
          "dataset_name": {
            "type": "string"
          },
          "dimensions": {
            "type": "object",
            "properties": {
              "table": {
                "type": "object",
                "properties": {
                  "ingestion.student_attendance": {
                    "type": "string"
                  }
                }
              },
              "column": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "school_id": {
                      "type": "string"
                    }
                  }
                }
              },
              "merge_on_col": {
                "type": "object",
                "properties": {
                  "school_id": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "dataset": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string",
                      "shouldNotNull": true,
                      "format": "date"
                    },
                    "school_id": {
                      "type": "number",
                      "shouldNotNull": true,
                      "pattern": "^[0-9]{10}$"
                    },
                    "grade": {
                      "type": "number",
                      "shouldNotNull": true,
                      "minimum": 1,
                      "maximum": 12
                    },
                    "count": {
                      "type": "number",
                      "shouldNotNull": true
                    },
                    "sum": {
                      "type": "number",
                      "shouldNotNull": true
                    },
                    "percentage": {
                      "type": "number",
                      "shouldNotNull": true
                    }
                  },
                  "required": [
                    "date",
                    "school_id",
                    "grade",
                    "count",
                    "sum",
                    "percentage"
                  ]
                }
              },
              "group_by": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string"
                    },
                    "school_id": {
                      "type": "string"
                    },
                    "grade": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "date",
                    "school_id",
                    "grade"
                  ]
                }
              },
              "aggregate": {
                "type": "object",
                "properties": {
                  "function": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "sum": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "target_table": {
                    "type": "object",
                    "properties": {
                      "ingestion.student_attendance_by_class": {
                        "type": "string"
                      }
                    }
                  },
                  "update_cols": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "sum": {
                          "type": "number"
                        },
                        "count": {
                          "type": "number"
                        },
                        "percentage": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  "columns": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "column": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "students_attendance_marked": {
                                "type": "string"
                              },
                              "total_students": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "required": [
                  "function",
                  "target_table",
                  "columns",
                  "update_cols"
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
          "dataset_name",
          "dimensions",
          "dataset"
        ]
      }
    }
    let result = {
      "code": 400, "error": "Duplicate Dataset not allowed"
    }

    expect(await service.createDataset(inputData)).toStrictEqual(result)
  });

  it('dataset created successfully', async () => {
    let inputData = {
      "ingestion_type": "dataset",
      "dataset_name": "student_attendance_by_class",
      "input": {
        "type": "object",
        "properties": {
          "dataset_name": {
            "type": "string"
          },
          "dimensions": {
            "type": "object",
            "properties": {
              "table": {
                "type": "object",
                "properties": {
                  "ingestion.student_attendance": {
                    "type": "string"
                  }
                }
              },
              "column": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "school_id": {
                      "type": "string"
                    }
                  }
                }
              },
              "merge_on_col": {
                "type": "object",
                "properties": {
                  "school_id": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "dataset": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string",
                      "shouldNotNull": true,
                      "format": "date"
                    },
                    "school_id": {
                      "type": "number",
                      "shouldNotNull": true,
                      "pattern": "^[0-9]{10}$"
                    },
                    "grade": {
                      "type": "number",
                      "shouldNotNull": true,
                      "minimum": 1,
                      "maximum": 12
                    },
                    "count": {
                      "type": "number",
                      "shouldNotNull": true
                    },
                    "sum": {
                      "type": "number",
                      "shouldNotNull": true
                    },
                    "percentage": {
                      "type": "number",
                      "shouldNotNull": true
                    }
                  },
                  "required": [
                    "date",
                    "school_id",
                    "grade",
                    "count",
                    "sum",
                    "percentage"
                  ]
                }
              },
              "group_by": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string"
                    },
                    "school_id": {
                      "type": "string"
                    },
                    "grade": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "date",
                    "school_id",
                    "grade"
                  ]
                }
              },
              "aggregate": {
                "type": "object",
                "properties": {
                  "function": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "sum": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "target_table": {
                    "type": "object",
                    "properties": {
                      "ingestion.student_attendance_by_class": {
                        "type": "string"
                      }
                    }
                  },
                  "update_cols": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "sum": {
                          "type": "number"
                        },
                        "count": {
                          "type": "number"
                        },
                        "percentage": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  "columns": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "column": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "students_attendance_marked": {
                                "type": "string"
                              },
                              "total_students": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "required": [
                  "function",
                  "target_table",
                  "columns",
                  "update_cols"
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
          "dataset_name",
          "dimensions",
          "dataset"
        ]
      }
    }
    let result = {
      "code": 200,
      "message": "Dataset Spec Created Successfully",
      "dataset_name": "student_attendance_by_class",
      "pid": 1
    }
    expect(await service.createDataset(inputData)).toStrictEqual(result)

  });

});
