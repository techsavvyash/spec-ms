import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationImplService } from './specification-impl.service';

describe('SpecificationImplService', () => {
  let service: SpecificationImplService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecificationImplService],
    }).compile();

    service = module.get<SpecificationImplService>(SpecificationImplService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
