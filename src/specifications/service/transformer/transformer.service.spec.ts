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
          useClass:TransformerService
        },
        {
          provide: DataSource,
          useValue: {
            query: jest.fn(),
          }
        },
        {
          provide:GenericFunction,
          useClass:GenericFunction
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

  it('should call transformer api' ,async () =>{
    const transformerData= {
      "event_name": "student_attend",
      "dataset_name": "student_attendance_by_class",
      "template": "EventToCube-AggTemplate.py",
      "transformer_type":"EventToCube-agg"
    }
    
    let result ={
     "code": 400, "message": "Invalid Event Name"
    }
    expect(await service.createTransformer(transformerData)).toStrictEqual(result);
  })
});
