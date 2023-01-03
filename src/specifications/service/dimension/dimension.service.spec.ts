import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { GenericFunction } from '../genericFunction';
import { DimensionService } from './dimension.service';

describe('DimensionService', () => {
  let service: DimensionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DimensionService, DataSource, GenericFunction,
        {
          provide: DimensionService,
          useValue: {
            createDimension: jest.fn(dto => { dto }),
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
        }
      ]
        }).compile();

    service = module.get<DimensionService>(DimensionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
