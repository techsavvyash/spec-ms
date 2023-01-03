import { Test, TestingModule } from '@nestjs/testing';
import { Connection, DataSource, QueryRunner } from 'typeorm';
import { GenericFunction } from '../genericFunction';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let connection: Connection;
  const qr = {
    manager: {}
    
  } as QueryRunner;

  class ConnectionMock {

    createQueryRunner(mode?: "master" | "slave"): QueryRunner {
      return qr;
    }
  }
  beforeEach(async () => {

    // qr.connect = jest.fn();
    // qr.release = jest.fn();
    // qr.startTransaction = jest.fn();
    // qr.commitTransaction = jest.fn();
    // qr.rollbackTransaction = jest.fn();
    // qr.release = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService,DataSource,GenericFunction,
        {
          provide: EventService,
          useClass:EventService
        },
        {
          provide: DataSource,
          useValue:{}
        },
        {
          provide:GenericFunction,
         useClass:GenericFunction
        }
      ],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call an event api' ,async ()=> {
    let eventData ={
      "ingestion_type": "event",
      "event_name": "student_attendance",
      "input": {
        "type": "object",
        "properties": {
          "event_name": {
            "type": "string"
          },
          "event": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string"
                },
                "school_id": {
                  "type": "number"
                },
                "grade": {
                  "type": "number"
                },
                "total_students": {
                  "type": "number"
                },
                "students_attendance_marked": {
                  "type": "number"
                }
              },
              "required": [
                "date",
                "school_id",
                "grade",
                "total_students",
                "students_attendance_marked"
              ]
            }
          }
        },
        "required": [
          "event_name",
          "event"
        ]
      }
    }
    let resultData={}
    // expect(await service.createEvent(eventData)).toBe(1)
  })

});
