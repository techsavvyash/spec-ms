import {Test, TestingModule} from '@nestjs/testing';
import {TransformerService} from './transformer.service';
import {DataSource} from 'typeorm';
import {GenericFunction} from '../genericFunction';
import {transformerSchemaData} from '../../../utils/spec-data';
import {HttpCustomService} from '../HttpCustomService';

describe('TransformerService', () => {
    let service: TransformerService;

    const mockQuaryService = {
        query: jest.fn().mockReturnValueOnce(0).mockReturnValueOnce([{data: "data"}]).mockReturnValueOnce(0).mockReturnValueOnce([{data: "data"}])
            .mockReturnValueOnce([{data: "data"}]).mockReturnValueOnce([{pid: 1}])
    };

    let apiDta = {
        data: {transformerFile: "test", Message: "Transformer created successfully",}
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
                    useValue: mockQuaryService
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

            "dataset_name": "student_attendance_by_class",
            "template": "EventToCube-AggTemplate.py",
            "transformer_type": "EventToCube-agg"
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
            "event_name": "",
            "dataset_name": "student_attendance_by_class",
            "template": "EventToCube-AggTemplate.py",
            "transformer_type": "EventToCube-agg"
        };

        let result = {
            "code": 400, "error": "Invalid event name"
        };
        expect(await service.createTransformer(transformerData)).toStrictEqual(result);
    });

    it('invalid dataset name ', async () => {
        const transformerData = {
            "event_name": "student_attendence",
            "dataset_name": "student_attendance_by",//passing invalid name
            "template": "EventToCube-AggTemplate.py",
            "transformer_type": "EventToCube-agg"
        };

        let result = {
            "code": 400, "error": "Invalid dataset name"
        };
        expect(await service.createTransformer(transformerData)).toStrictEqual(result);
    });

    it('transformer added sucessfully ', async () => {
        const transformerData = {
            "event_name": "student_attendance",
            "dataset_name": "student_attendance_by_class",
            "template": "EventToCube-AggTemplate.py",
            "transformer_type": "EventToCube-agg"
        };
        let result = {
            "code": 200,
            "message": "Transformer created successfully",
            "pid": 1,
            "file": "test"
        };
        expect(await service.createTransformer(transformerData)).toStrictEqual(result)
    })


    it('invalid template name ' ,async () =>{
      const transformerData= {
        "event_name": "student_attendence",
        "dataset_name": "student_attendance_by_class",
        "template": "EventToCube-AggTemplate", //passing invalid name
        "transformer_type":"EventToCube-agg"
      }

      let result ={
       "code": 400, "error": "Invalid template name"
      }
      expect(await service.createTransformer(transformerData)).toStrictEqual(result);
    })

    it('invalid transformer_type name ' ,async () =>{
      const transformerData= {
        "event_name": "student_attendence",
        "dataset_name": "student_attendance_by_class",
        "template": "EventToCube-AggTemplate.py",
        "transformer_type":"EventToCfff" //passing invalid name
      }

      let result ={
       "code": 400, "error": "Invalid transformer type"
      }
      expect(await service.createTransformer(transformerData)).toStrictEqual(result);
    })
});