import { Test, TestingModule } from '@nestjs/testing';
import { DatasetService } from './dataset.service';
import { DataSource } from 'typeorm';
import { GenericFunction } from '../genericFunction';
describe('DatasetService', () => {
  let service: DatasetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatasetService,DataSource,GenericFunction,
        {
          provide: DatasetService,
          useValue: {
            createDataset: jest.fn(dto => { dto }),
          }
        },
        {
          provide: DataSource,
          useValue: {
            query: jest.fn(dto => { dto }),
          }
        },
        {
          provide: GenericFunction,
          useValue: {
            convertKeysToLowerCase: jest.fn(dto => { dto }),
            getDbColumnNames: jest.fn(dto => { dto }),
          }
        },
      ],

    }).compile();

    service = module.get<DatasetService>(DatasetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
