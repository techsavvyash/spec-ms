import { pipelineDto } from 'src/specifications/dto/specData.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { GenericFunction } from '../genericFunction';
import { HttpCustomService } from '../HttpCustomService';
import { PipelineService } from './pipeline.service';

describe('PipelineService', () => {
  let service: PipelineService;
  const mockHttpservice = {
    post: jest.fn().mockReturnValueOnce({data: {component: {id: 2}}}).mockReturnValue('response'),
    put: jest.fn(),
    get: jest.fn().mockReturnValueOnce({data: {component: {id: 1}}}).mockReturnValueOnce({
        data: {
            processGroupFlow: {
                flow: {
                    processGroups: [{
                        component: {
                            id: 123,
                            name: "asd"
                        }
                    }]
                }
            }
        }
    }).mockReturnValueOnce({data: {component: {id: 1}}}).mockReturnValueOnce({
        data: {
            processGroupFlow: {
                flow: {
                    processGroups: [{
                        component: {
                            id: 123,
                            name: "abc"
                        }
                    }]
                }
            }
        }
    }).mockReturnValueOnce({data: {component: {id: 3}}}).mockReturnValueOnce({data: {processGroupFlow: {id: 4}}}).mockReturnValueOnce({data: {processGroupFlow: {id: 5}}})
        .mockReturnValueOnce({data: {processGroupFlow: {id: 6}}}).mockReturnValueOnce({data: {processGroupFlow: {id: 7}}})
        .mockReturnValueOnce({
            data: {
                processGroupFlow: {
                    flow: {
                        processors: [{
                            component: {
                                name: "generateFlowFile",
                                id: 1
                            }
                        }, {component: {name: "pythonCode", id: 2}},
                            {component: {name: "successLogMessage", id: 3}}, {
                                component: {
                                    name: "failedLogMessage",
                                    id: 4
                                }
                            }]
                    }
                }
            }
        })
        .mockReturnValueOnce({
            data: {
                processGroupFlow: {
                    flow: {
                        processors: [{
                            component: {
                                name: "generateFlowFile",
                                id: 1
                            }
                        }, {component: {name: "pythonCode", id: 2}},
                            {component: {name: "successLogMessage", id: 3}}, {
                                component: {
                                    name: "failedLogMessage",
                                    id: 4
                                }
                            }]
                    }
                }
            }
        })
        .mockReturnValueOnce({
            data: {
                processGroupFlow: {
                    flow: {
                        processors: [{
                            component: {
                                name: "generateFlowFile",
                                id: 1
                            }
                        }, {component: {name: "pythonCode", id: 2}},
                            {component: {name: "successLogMessage", id: 3}}, {
                                component: {
                                    name: "failedLogMessage",
                                    id: 4
                                }
                            }]
                    }
                }
            }
        })
        .mockReturnValueOnce({
            data: {
                processGroupFlow: {
                    flow: {
                        processors: [{
                            component: {
                                name: "generateFlowFile",
                                id: 1
                            }
                        }, {component: {name: "pythonCode", id: 2}},
                            {component: {name: "successLogMessage", id: 3}}, {
                                component: {
                                    name: "failedLogMessage",
                                    id: 4
                                }
                            }]
                    }
                }
            }
        }).mockReturnValue({
            data: {
                processGroupFlow: {
                    id: 1,
                    flow: {
                        processors: [{
                            component: {
                                name: "generateFlowFile",
                                id: 1
                            },
                            revision: {
                                version: 1.1
                            }
                        }, {
                            component: {name: "pythonCode", id: 2},
                            revision: {
                                version: 1.1
                            }
                        },
                            {
                                component: {name: "successLogMessage", id: 3},
                                revision: {
                                    version: 1.1
                                }
                            }, {
                                component: {
                                    name: "failedLogMessage",
                                    id: 4
                                },
                                revision: {
                                    version: 1.1
                                }
                            }]
                    }
                }
            }
        })
};

const mockTransacation = {
  createQueryRunner: jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    startTransaction: jest.fn(),
    release: jest.fn(),
    rollbackTransaction: jest.fn(),
    commitTransaction:jest.fn(),
    query: jest.fn()
    // mockReturnValueOnce([{pid:1}]).mockReturnValueOnce([{pid:1}])
  })),
  query: jest.fn().mockReturnValueOnce([{length:1}]).mockReturnValueOnce([]).mockReturnValueOnce([])
  // mockReturnValueOnce([]).mockReturnValueOnce([{length: 1}]).mockReturnValueOnce([]).mockReturnValueOnce([])
}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PipelineService,DataSource,GenericFunction,HttpCustomService,
        {
          provide: DataSource,
          useValue:mockTransacation
        },
        {
          provide:GenericFunction,
         useClass:GenericFunction
        },
        {
          provide: HttpCustomService,
          useValue: mockHttpservice
      },
    ]}).compile();

    service = module.get<PipelineService>(PipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Invalid Pipeline Type', async ()=>{
    let inputData = {
      "pipeline_type":"",
      "pipeline_name":"student_attendance_by_class",
      "pipeline": [
        {
          "event_name": "student_attendance",
          "dataset_name": "student_attendance_by_class",
          "dimension_name": "student_attendance",
          "transformer_name": "student_attendance_by_class.py"
        
        }
      ]
    }
    let result = {code:400, error:"Invalid pipeline type"}
    expect(await service.createSpecPipeline(inputData)).toStrictEqual(result);
  })

  it('pipeline Name already exists',async ()=>{
    let inputData = {
      "pipeline_type":"ingest_to_db",
      "pipeline_name":"student_attendance_by_class",
      "pipeline": [
       {
         "event_name": "student_attendance",
         "dataset_name": "student_attendance_by_class",
         "dimension_name": "student_attendance",
         "transformer_name": "student_attendance_by_class_1.py"
       
       }
     ]
    }
    let result = {
      "code": 400, "error": "Pipeline name already exists"
    }
    expect(await service.createSpecPipeline(inputData)).toStrictEqual(result)

  })

  

  it("transformer Not found", async()=>{
    let inputData =  {
      "pipeline_type":"ingest_to_db",
      "pipeline_name":"student_attendance_by_class_1",
      "pipeline": [
        {
          "event_name": "student_attendance",
          "dataset_name": "student_attendance_by_class",
          "dimension_name": "student_attendance",
          "transformer_name": "student_attendance_by_class_1.py"
        
        }
      ]
    }
    let result = {code:400, error:"Transformer not found"}
    expect(await service.createSpecPipeline(inputData)).toStrictEqual(result);

  })

  // it('Processor group exists', async()=>{
  //   let inputData ={
  //     "pipeline_type":"ingest_to_db",
  //     "pipeline_name":"student_attendance_by_class",
  //     "pipeline": [
  //       {
  //         "event_name": "student_attendance",
  //         "dataset_name": "student_attendance_by_class",
  //         "dimension_name": "student_attendance",
  //         "transformer_name": "student_attendance_by_class.py"
        
  //       }
  //     ]
  //   }
  //   let result  = {code:200,error:"Processor group running successfully"}
  //   expect(await service.createSpecPipeline(inputData)).toStrictEqual(result);
  // },7000);

  // it("Processor group created", async()=>{
  //   let inputData ={
  //     "pipeline_type":"ingest_to_db",
  //     "pipeline_name":"student_attendance_by_class",
  //     "pipeline": [
  //       {
  //         "event_name": "student_attendance",
  //         "dataset_name": "student_attendance_by_class",
  //         "dimension_name": "student_attendance",
  //         "transformer_name": "student_attendance_by_class.py"
        
  //       }
  //     ]
  //   }
  //   let result  = {code:200,error:"Processor group running successfully"}
  //   expect(await service.createSpecPipeline(inputData)).toStrictEqual(result);
  // },7000)
});
