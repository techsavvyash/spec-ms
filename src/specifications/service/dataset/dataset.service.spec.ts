import { Test, TestingModule } from '@nestjs/testing';
import { DatasetService } from './dataset.service';
import { DataSource } from 'typeorm';
import { GenericFunction } from '../genericFunction';

let inputData = {
    "ingestion_type": "dataset",
    "dataset_name": "SAC_students_average_attendance_by_state",
    "input": {
        "type": "object",
        "properties": {
            "dataset_name": {
                "type": "string"
            },
            "dimensions": {
                "type": "object",
                "properties": {
                    "table": "ingestion.dimension_master",
                    "column": [
                        "district_id",
                        "state_id"
                    ],
                    "merge_on_col": "district_id"
                },
                "required": [
                    "table",
                    "column",
                    "merge_on_col"
                ]
            },
            "dataset": {
                "type": "object",
                "properties": {
                    "items": {
                        "type": "array",
                        "shouldnotnull": true,
                        "items": {
                            "type": "object",
                            "properties": {
                                "date": {
                                    "type": "string",
                                    "shouldnotnull": true,
                                    "format": "date"
                                },
                                "state_id": {
                                    "type": "integer",
                                    "shouldnotnull": true,
                                    "minimum": 1,
                                    "maximum": 99
                                },
                                "sum_students_marked_present": {
                                    "type": "integer",
                                    "shouldnotnull": true
                                },
                                "sum_students_attendance_marked": {
                                    "type": "integer",
                                    "shouldnotnull": true
                                },
                                "percentage": {
                                    "type": "number",
                                    "shouldnotnull": true
                                }
                            },
                            "required": [
                                "date",
                                "state_id",
                                "sum_students_marked_present",
                                "sum_students_attendance_marked",
                                "percentage"
                            ]
                        }
                    },
                    "group_by": [
                        "date",
                        "state_id"
                    ],
                    "aggregate": {
                        "type": "object",
                        "properties": {
                            "function": [
                                "sum"
                            ],
                            "target_table": "ingestion.SAC_students_average_attendance_by_state",
                            "numerator_col": "sum_students_marked_present",
                            "denominator_col": "sum_students_attendance_marked",
                            "update_cols": [
                                "sum_students_marked_present",
                                "sum_students_attendance_marked",
                                "percentage"
                            ],
                            "columns": {
                                "type": "array",
                                "shouldnotnull": true,
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "table": "ingestion.SAC_students_average_attendance_by_district",
                                        "column": [
                                            "sum_students_marked_present",
                                            "sum_students_attendance_marked"
                                        ]
                                    },
                                    "required": [
                                        "column"
                                    ]
                                }
                            }
                        },
                        "required": [
                            "function",
                            "target_table",
                            "numerator_col",
                            "denominator_col",
                            "update_cols",
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
            "dataset"
        ]
    }

}


describe('DatasetService', () => {
    let service: DatasetService;
    const mockTransacation = {
        createQueryRunner: jest.fn().mockImplementation(() => ({
            connect: jest.fn(),
            startTransaction: jest.fn(),
            release: jest.fn(),
            rollbackTransaction: jest.fn(),
            commitTransaction: jest.fn(),
            query: jest.fn().mockReturnValueOnce([{ pid: 1 }]).mockReturnValueOnce([{ pid: 1 }])
        })),
        query: jest.fn().mockReturnValueOnce([{ length: 1 }]).mockReturnValueOnce([]).mockReturnValueOnce([{ length: 1 }]).mockReturnValueOnce([])
            .mockReturnValueOnce([])
    };
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
            "dataset_name": "students_attendance_compliance_by_school",
            "input": {
                "type": "object",
                "properties": {
                    "dataset_name": {
                        "type": "string"
                    },
                    "dimensions": {
                        "type": "object",
                        "properties": {
                            "table": "ingestion.school_details",
                            "column": [
                                "school_id", "werwer"
                            ],
                            "merge_on_col": "school_id"
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
                                            "shouldnotnull": true,
                                            "format": "date"
                                        },
                                        "school_id": {
                                            "type": "integer",
                                            "shouldnotnull": true,
                                            "minimum": 1000000000,
                                            "maximum": 9999999999
                                        },
                                        "sum_students_attendance_marked": {
                                            "type": "integer",
                                            "shouldnotnull": true
                                        },
                                        "sum_total_students": {
                                            "type": "integer",
                                            "shouldnotnull": true
                                        },
                                        "percentage": {
                                            "type": "number",
                                            "shouldnotnull": true
                                        }
                                    },
                                    "required": [
                                        "date",
                                        "school_id",
                                        "sum_students_attendance_marked",
                                        "sum_total_students",
                                        "percentage"
                                    ]
                                }
                            },
                            "group_by": [
                                "date",
                                "school_id"
                            ],
                            "aggregate": {
                                "type": "object",
                                "properties": {
                                    "function": [
                                        "sum"
                                    ],
                                    "target_table": "ingestion.students_attendance_compliance_by_school",
                                    "numerator_col": "students_attendance_marked",
                                    "denominator_col": "total_students",
                                    "update_cols": [
                                        "sum_students_attendance_marked",
                                        "sum_total_students",
                                        "percentage"
                                    ],
                                    "columns": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "column": [
                                                    "students_attendance_marked",
                                                    "total_students"
                                                ],
                                                "table": "ingestion.students_attendance_compliance_by_school"
                                            }
                                        }
                                    },
                                    "filters": {
                                        "type": "object",
                                        "properties": {
                                            "filter_col": "percentage",
                                            "filter_type": "=",
                                            "filter": "50"
                                        }
                                    },
                                    "required": [
                                        "function",
                                        "targetTable",
                                        "update_cols",
                                        "columns",
                                        "filters"
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
                        "dataset"
                    ]
                }
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
        };
        expect(await service.createDataset(dimensionData)).toStrictEqual(resultData)
    });


    it('invalid request body', async () => {
        let inputData = {
            "ingestion_type": "dataset",
            "dataset_name": "SAC_students_average_attendance_by_state",
            "input": {
                "type": "object",
                "properties": {
                    "dataset_name": {
                        "type": "string"
                    },
                    "dimensions": {
                        "type": "object",
                        "properties": {
                            "table": "ingestion.dimension_master",
                            "column": [
                                "district_id",
                                "state_id"
                            ],
                            "merge_on_col": "district_id"
                        },
                        "required": [
                            "table",
                            "column",
                            "merge_on_col"
                        ]
                    },
                    "dataset": {
                        "type": "object",
                        "properties": {
                            "items": {
                                "type": "array",
                                "shouldnotnull": true,
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        // "date": {
                                        //     "type": "string",
                                        //     "shouldnotnull": true,
                                        //     "format": "date"
                                        // },
                                        "state_id": {
                                            "type": "integer",
                                            "shouldnotnull": true,
                                            "minimum": 1,
                                            "maximum": 99
                                        },
                                        "sum_students_marked_present": {
                                            "type": "integer",
                                            "shouldnotnull": true
                                        },
                                        "sum_students_attendance_marked": {
                                            "type": "integer",
                                            "shouldnotnull": true
                                        },
                                        "percentage": {
                                            "type": "number",
                                            "shouldnotnull": true
                                        }
                                    },
                                    "required": [
                                        "date",
                                        "state_id",
                                        "sum_students_marked_present",
                                        "sum_students_attendance_marked",
                                        "percentage"
                                    ]
                                }
                            },
                            "group_by": [
                                "date",
                                "state_id"
                            ],
                            "aggregate": {
                                "type": "object",
                                "properties": {
                                    "function": [
                                        "sum"
                                    ],
                                    "target_table": "ingestion.SAC_students_average_attendance_by_state",
                                    "numerator_col": "sum_students_marked_present",
                                    "denominator_col": "sum_students_attendance_marked",
                                    "update_cols": [
                                        "sum_students_marked_present",
                                        "sum_students_attendance_marked",
                                        "percentage"
                                    ],
                                    "columns": {
                                        "type": "array",
                                        "shouldnotnull": true,
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "table": "ingestion.SAC_students_average_attendance_by_district",
                                                "column": [
                                                    "sum_students_marked_present",
                                                    "sum_students_attendance_marked"
                                                ]
                                            },
                                            "required": [
                                                "column"
                                            ]
                                        }
                                    }
                                },
                                "required": [
                                    "function",
                                    "target_table",
                                    "numerator_col",
                                    "denominator_col",
                                    "update_cols",
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
            "dataset_name": "SAC_students_average_attendance_by_state",
            "input": {
                "type": "object",
                "properties": {
                    "dataset_name": {
                        "type": "string"
                    },
                    "dimensions": {
                        "type": "object",
                        "properties": {
                            "table": "ingestion.dimension_master",
                            "column": [
                                "district_id",
                                "state_id"
                            ],
                            "merge_on_col": "district_id"
                        },
                        "required": [
                            "table",
                            "column",
                            "merge_on_col"
                        ]
                    },
                    "dataset": {
                        "type": "object",
                        "properties": {
                            "items": {
                                "type": "array",
                                "shouldnotnull": true,
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "date": {
                                            "type": "string",
                                            "shouldnotnull": true,
                                            "format": "date"
                                        },
                                        "state_id": {
                                            "type": "integer",
                                            "shouldnotnull": true,
                                            "minimum": 1,
                                            "maximum": 99
                                        },
                                        "sum_students_marked_present": {
                                            "type": "integer",
                                            "shouldnotnull": true
                                        },
                                        "sum_students_attendance_marked": {
                                            "type": "integer",
                                            "shouldnotnull": true
                                        },
                                        "percentage": {
                                            "type": "number",
                                            "shouldnotnull": true
                                        }
                                    },
                                    "required": [
                                        "date",
                                        "state_id",
                                        "sum_students_marked_present",
                                        "sum_students_attendance_marked",
                                        "percentage"
                                    ]
                                }
                            },
                            "group_by": [
                                "date",
                                "state_id"
                            ],
                            "aggregate": {
                                "type": "object",
                                "properties": {
                                    "function": [
                                        "sum"
                                    ],
                                    "target_table": "ingestion.SAC_students_average_attendance_by_state",
                                    "numerator_col": "sum_students_marked_present",
                                    "denominator_col": "sum_students_attendance_marked",
                                    "update_cols": [
                                        "sum_students_marked_present",
                                        "sum_students_attendance_marked",
                                        "percentage"
                                    ],
                                    "columns": {
                                        "type": "array",
                                        "shouldnotnull": true,
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "table": "ingestion.SAC_students_average_attendance_by_district",
                                                "column": [
                                                    "sum_students_marked_present",
                                                    "sum_students_attendance_marked"
                                                ]
                                            },
                                            "required": [
                                                "column"
                                            ]
                                        }
                                    }
                                },
                                "required": [
                                    "function",
                                    "target_table",
                                    "numerator_col",
                                    "denominator_col",
                                    "update_cols",
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
                    "dataset"
                ]
            }

        }

        let result = {
            "code": 400, "error": "Dataset name already exists"
        }
        expect(await service.createDataset(inputData)).toStrictEqual(result)
    });

    it('Duplicate Dataset not allowed', async () => {
        let inputData = {
            "ingestion_type": "dataset",
            "dataset_name": "SAC_students_average_attendance_by_state",
            "input": {
                "type": "object",
                "properties": {
                    "dataset_name": {
                        "type": "string"
                    },
                    "dimensions": {
                        "type": "object",
                        "properties": {
                            "table": "ingestion.dimension_master",
                            "column": [
                                "district_id",
                                "state_id"
                            ],
                            "merge_on_col": "district_id"
                        },
                        "required": [
                            "table",
                            "column",
                            "merge_on_col"
                        ]
                    },
                    "dataset": {
                        "type": "object",
                        "properties": {
                            "items": {
                                "type": "array",
                                "shouldnotnull": true,
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "date": {
                                            "type": "string",
                                            "shouldnotnull": true,
                                            "format": "date"
                                        },
                                        "state_id": {
                                            "type": "integer",
                                            "shouldnotnull": true,
                                            "minimum": 1,
                                            "maximum": 99
                                        },
                                        "sum_students_marked_present": {
                                            "type": "integer",
                                            "shouldnotnull": true
                                        },
                                        "sum_students_attendance_marked": {
                                            "type": "integer",
                                            "shouldnotnull": true
                                        },
                                        "percentage": {
                                            "type": "number",
                                            "shouldnotnull": true
                                        }
                                    },
                                    "required": [
                                        "date",
                                        "state_id",
                                        "sum_students_marked_present",
                                        "sum_students_attendance_marked",
                                        "percentage"
                                    ]
                                }
                            },
                            "group_by": [
                                "date",
                                "state_id"
                            ],
                            "aggregate": {
                                "type": "object",
                                "properties": {
                                    "function": [
                                        "sum"
                                    ],
                                    "target_table": "ingestion.SAC_students_average_attendance_by_state",
                                    "numerator_col": "sum_students_marked_present",
                                    "denominator_col": "sum_students_attendance_marked",
                                    "update_cols": [
                                        "sum_students_marked_present",
                                        "sum_students_attendance_marked",
                                        "percentage"
                                    ],
                                    "columns": {
                                        "type": "array",
                                        "shouldnotnull": true,
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "table": "ingestion.SAC_students_average_attendance_by_district",
                                                "column": [
                                                    "sum_students_marked_present",
                                                    "sum_students_attendance_marked"
                                                ]
                                            },
                                            "required": [
                                                "column"
                                            ]
                                        }
                                    }
                                },
                                "required": [
                                    "function",
                                    "target_table",
                                    "numerator_col",
                                    "denominator_col",
                                    "update_cols",
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
                    "dataset"
                ]
            }

        }
        let result = {
            "code": 400, "error": "Duplicate dataset not allowed"
        }

        expect(await service.createDataset(inputData)).toStrictEqual(result)
    });

    it('dataset created successfully', async () => {
        let result = {
            "code": 200,
            "message": "Dataset spec created successfully",
            "dataset_name": "SAC_students_average_attendance_by_state",
            "pid": 1
        };
        expect(await service.createDataset(inputData)).toStrictEqual(result)
    });

    it('Dataset spec was not added', async () => {

        const mockTransaction = {
            createQueryRunner: jest.fn().mockImplementation(() => ({
                connect: jest.fn(),
                startTransaction: jest.fn(),
                release: jest.fn(),
                rollbackTransaction: jest.fn(),
                commitTransaction: jest.fn(),
                query: jest.fn().mockReturnValueOnce([{}])
            })),
            query: jest.fn().mockReturnValueOnce([]).mockReturnValueOnce([])
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [DatasetService, DataSource, GenericFunction,
                {
                    provide: DatasetService,
                    useClass: DatasetService
                },
                {
                    provide: DataSource,
                    useValue: mockTransaction
                },
                {
                    provide: GenericFunction,
                    useClass: GenericFunction
                },
            ],

        }).compile();

        let localService: DatasetService = module.get<DatasetService>(DatasetService);
        let result = { "code": 400, "error": "Dataset spec was not added" };
        expect(await localService.createDataset(inputData)).toStrictEqual(result)
    });

    it('Unable to insert into spec pipeline table', async () => {

        const mockTransaction = {
            createQueryRunner: jest.fn().mockImplementation(() => ({
                connect: jest.fn(),
                startTransaction: jest.fn(),
                release: jest.fn(),
                rollbackTransaction: jest.fn(),
                commitTransaction: jest.fn(),
                query: jest.fn().mockReturnValueOnce([{ pid: 1 }]).mockReturnValueOnce([{}])
            })),
            query: jest.fn().mockReturnValueOnce([]).mockReturnValueOnce([])
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [DatasetService, DataSource, GenericFunction,
                {
                    provide: DatasetService,
                    useClass: DatasetService
                },
                {
                    provide: DataSource,
                    useValue: mockTransaction
                },
                {
                    provide: GenericFunction,
                    useClass: GenericFunction
                },
            ],

        }).compile();

        let localService: DatasetService = module.get<DatasetService>(DatasetService);
        let result = { "code": 400, "error": "Unable to insert into spec pipeline table" };
        expect(await localService.createDataset(inputData)).toStrictEqual(result)
    });
});
