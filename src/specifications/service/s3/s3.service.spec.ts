import { HttpCustomService } from './../HttpCustomService';
import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { GenericFunction } from '../genericFunction';

describe('S3Service', () => {
  let service: S3Service;
  const mockHttpservice = {
    post: jest.fn().mockReturnValueOnce({ data: { component: { id: 2 } } }).mockReturnValue('response'),
    put: jest.fn(),
    get: jest.fn().mockReturnValueOnce({ data: { component: { id: 1 } } }).mockReturnValueOnce({
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
    }).mockReturnValueOnce({ data: { component: { id: 1 } } }).mockReturnValueOnce({
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
    }).mockReturnValueOnce({ data: { component: { id: 3 } } }).mockReturnValueOnce({ data: { processGroupFlow: { id: 4 } } }).mockReturnValueOnce({ data: { processGroupFlow: { id: 5 } } })
      .mockReturnValueOnce({ data: { processGroupFlow: { id: 6 } } }).mockReturnValueOnce({ data: { processGroupFlow: { id: 7 } } })
      .mockReturnValueOnce({
        data: {
          processGroupFlow: {
            flow: {
              processors: [{
                component: {
                  name: "generateFlowFile",
                  id: 1
                }
              }, { component: { name: "pythonCode", id: 2 } },
              { component: { name: "successLogMessage", id: 3 } }, {
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
              }, { component: { name: "pythonCode", id: 2 } },
              { component: { name: "successLogMessage", id: 3 } }, {
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
              }, { component: { name: "pythonCode", id: 2 } },
              { component: { name: "successLogMessage", id: 3 } }, {
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
              }, { component: { name: "pythonCode", id: 2 } },
              { component: { name: "successLogMessage", id: 3 } }, {
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
                component: { name: "pythonCode", id: 2 },
                revision: {
                  version: 1.1
                }
              },
              {
                component: { name: "successLogMessage", id: 3 },
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
      providers: [S3Service, HttpCustomService, GenericFunction,
        {
          provide: S3Service,
          useClass: S3Service
        },
        {
          provide: GenericFunction,
          useClass: GenericFunction
        },
        {
          provide: HttpCustomService,
          useValue: mockHttpservice
        },
      ]
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validation', async () => {
    let input = {

    }
    let result = {
      code: 400, error: [
        {
          "instancePath": "",
          "schemaPath": "#/required",
          "keyword": "required",
          "params": {
            "missingProperty": "scheduled_at"
          },
          "message": "must have required property 'scheduled_at'"
        }
      ]
    }

    expect(await service.uploadFile(input)).toStrictEqual(result);
  });

  it('cron validation', async () => {
    let input = {
      "scheduled_at": "gsdg "//giving wrong expression
    }
    let result = {
      code: 400, error: "Unexpected end of expression"
    }
    expect(await service.uploadFile(input)).toStrictEqual(result);
  });

  // it('schedule sucessfully', async () => {
  //   let input = {
  //     "scheduled_at": "0 0/2 * 1/1 * ? *"
  //   }
  //   let result = {
  //     code: 400, error: "Unexpected end of expression"
  //   }
  //   expect(await service.uploadFile(input)).toStrictEqual(result);
  // });

});
