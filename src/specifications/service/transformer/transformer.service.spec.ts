import { Test, TestingModule } from '@nestjs/testing';
import { TransformerService } from './transformer.service';
import { DataSource } from 'typeorm';
import { GenericFunction } from '../genericFunction';
import { HttpService } from '@nestjs/axios';

describe('TransformerService', () => {
  let service: TransformerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformerService,DataSource,GenericFunction,HttpService,
        {
          provide: TransformerService,
          useValue: {
            createTransformer: jest.fn(),
          }
        },
        {
          provide: DataSource,
          useValue: {
            query: jest.fn(dto => { dto }),
          }
        },
        {
          provide:GenericFunction,
          useValue: {
            convertKeysToLowerCase: jest.fn(dto => { dto }),
            getDbColumnNames: jest.fn(dto => { dto }),
          }
        },
        {
          provide: HttpService,
          useValue: {}
        },
  
      ]
    }).compile();

    service = module.get<TransformerService>(TransformerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call transformer api' ,() =>{
    const transformerData= {
      "event_name": "student_attendance",
      "dataset_name": "student_attendance_by_class",
      "template": "EventToCube-AggTemplate.py",
      "transformer_type":"EventToCube-agg"
    }
    expect(service.createTransformer(transformerData)).toBeCalled;
  })
});
