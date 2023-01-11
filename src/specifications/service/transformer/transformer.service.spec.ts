import { Test, TestingModule } from '@nestjs/testing';
import { TransformerService } from './transformer.service';
import { DataSource } from 'typeorm';
import { GenericFunction } from '../genericFunction';
import { transformerSchemaData } from '../../../utils/spec-data';
import { HttpCustomService } from '../HttpCustomService';
import { async } from 'rxjs';

describe('TransformerService', () => {
    let service: TransformerService;
    const mockTransacation = {
        createQueryRunner: jest.fn().mockImplementation(() => ({
            connect: jest.fn(),
            startTransaction: jest.fn(),
            release: jest.fn(),
            rollbackTransaction: jest.fn(),
            commitTransaction: jest.fn(),
            query: jest.fn().mockReturnValueOnce([{ pid: 1 }])
        })),
        query: jest.fn().mockReturnValueOnce(0).mockReturnValueOnce([]).mockReturnValueOnce([{ length: 1 }])

    }


    let apiDta = {
        data: { TransformerFile: "test", Message: "Transformer created succesfully", }
    };

    const mockHttpservice = {
        post: jest.fn().mockReturnValueOnce(apiDta),
    };
 
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TransformerService, DataSource, GenericFunction, HttpCustomService,
                {
                    provide: TransformerService,
                    useClass: TransformerService
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

            ]
        }).compile();

        service = module.get<TransformerService>(TransformerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('validation', async () => {
        const transformerData = {

            // "event_name":"students_attendance",
            "key_file": "transformer_dataset_maping.csv",
            "program": "SAC"
        };
        let result = {
            "code": 400, error: [
                {
                    "instancePath": "",
                    "keyword": "required",
                    "message": "must have required property 'event_name'",
                    "params": {
                        "missingProperty": "event_name",
                    },
                    "schemaPath": "#/required",
                },
            ]
        };
        expect(await service.createTransformer(transformerData)).toStrictEqual(result);
    });

    it('invalid event name ', async () => {
        const transformerData = {
            "event_name": "students_attendance11",
            "key_file": "transformer_dataset_maping.csv",
            "program": "SAC"
        };
        let result = {
            "code": 400, error: "Invalid event name"
        };
        expect(await service.createTransformer(transformerData)).toStrictEqual(result);
    });


    // it(' create a transformer', async () => {
    //     const transformerData = {
    //         "event_name": "students_attendance",
    //         "key_file": "transformer_dataset_maping.csv",
    //         "program": "SAC"
    //     };
    //     let result = {
    //         "code": 200,
    //         "file": "test",
    //         "message": "Transformer created succesfully",
    //         "pid": 1,
    //     }
    //     expect(await service.createTransformer(transformerData)).toStrictEqual(result)
    // })
});