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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PipelineService,DataSource,GenericFunction,HttpCustomService,
        {
          provide: DataSource,
          useValue:{}
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
});
