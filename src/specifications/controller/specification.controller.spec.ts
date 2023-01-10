import { PipelineService } from './../service/pipeline/pipeline.service';
import { Test, TestingModule } from '@nestjs/testing';
import { DatasetService } from '../service/dataset/dataset.service';
import { DimensionService } from '../service/dimension/dimension.service';
import { EventService } from '../service/event/event.service';
import { TransformerService } from '../service/transformer/transformer.service';
import { SpecificationController } from './specification.controller';

describe('SpecificationController', () => {
  let controller: SpecificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecificationController],
      providers:[DimensionService,EventService,TransformerService,DatasetService,PipelineService,
        {
          provide: DimensionService,
          useValue: {
            createDimension: jest.fn(dto =>{dto}),
          }
        },
        {
          provide: EventService,
          useValue: {
            createEvent: jest.fn(dto =>{dto}),
          }
        },
        {
          provide: TransformerService,
          useValue: {
            createTransformer: jest.fn(dto =>{dto}),
          }
        },
        {
          provide: DatasetService,
          useValue: {
            createTransformer: jest.fn(dto =>{dto}),
          }
        },
        {
          provide: PipelineService,
          useValue: {
            createSpecPipeline: jest.fn(dto =>{dto})
          }
        },
      
      ]
    }).compile();

    controller = module.get<SpecificationController>(SpecificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
