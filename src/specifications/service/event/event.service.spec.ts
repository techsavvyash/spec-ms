import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { GenericFunction } from '../genericFunction';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService,DataSource,GenericFunction,
        {
          provide: EventService,
          useValue: {
            createEvent: jest.fn(dto => { dto }),
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
      ],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
