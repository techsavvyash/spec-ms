import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { GenericFunction } from '../genericFunction';
import { HttpCustomService } from '../HttpCustomService';
import { PipelineService } from '../pipeline/pipeline.service';
import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  let service: ScheduleService;

  const mockTransacation = {
    createQueryRunner: jest.fn().mockImplementation(() => ({
      query: jest.fn().mockReturnValue([])
    })),
  };

  const mockHttpservice = {
    post: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleService, DataSource, GenericFunction, PipelineService, HttpCustomService,
        {
          provide: PipelineService,
          useClass: PipelineService
        },
        {
          provide: ScheduleService,
          useClass: ScheduleService
        },
        {
          provide: DataSource,
          useValue: mockTransacation
        },
        {
          provide: GenericFunction,
          useClass: GenericFunction
        },
        {
          provide: HttpCustomService,
          useValue: mockHttpservice
        },
      ],
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("validator",async () => {
    let input = {
      // "pipeline_name": "student_count_pipe",
      "scheduled_at": "0 6 13 ? * *"
    }
    let result = { "code": 400, "error": [
      {
          "instancePath": "",
          "schemaPath": "#/required",
          "keyword": "required",
          "params": {
              "missingProperty": "pipeline_name"
          },
          "message": "must have required property 'pipeline_name'"
      }
  ] }
    expect(await service.schedulePipeline(input)).toStrictEqual(result)

  });

  it('cron expression validation  ', async () => {
    let input = {
      "pipeline_name": "student_count_pipe",
      "scheduled_at": "0hg"
    }
    let result = { "code": 400, "error": "Unexpected end of expression" }
    expect(await service.schedulePipeline(input)).toStrictEqual(result)
  });

  it('Pipeline Not found ', async () => {
    let input = {
      "pipeline_name": "student_count_pipe",
      "scheduled_at": "0 6 13 ? * *"
    }
    let result = { code: 400, error: "Pipeline name not Found" }
    expect(await service.schedulePipeline(input)).toStrictEqual(result)
  });

  it('Pipeline has been successfully scheduled',async () => {
    const mockTransacation1 = {
      createQueryRunner: jest.fn().mockImplementation(() => ({
        query: jest.fn().mockReturnValue([{length:1}])
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleService, DataSource, GenericFunction, PipelineService, HttpCustomService,
        {
          provide: PipelineService,
          useValue: {
            CreatePipeline:jest.fn()
          }
        },
        {
          provide: ScheduleService,
          useClass: ScheduleService
        },
        {
          provide: DataSource,
          useValue: mockTransacation1
        },
        {
          provide: GenericFunction,
          useClass: GenericFunction
        },
        {
          provide: HttpCustomService,
          useValue: mockTransacation1
        },
      ],
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
    let input = {
      "pipeline_name": "student_count_pipe",
      "scheduled_at": "0 6 13 ? * *"
    }
    let result = { code: 200, "message": "Pipeline has been successfully scheduled" }
    expect(await service.schedulePipeline(input)).toStrictEqual(result)
  });
});
