import { Test, TestingModule } from '@nestjs/testing';
import { JspdfService } from './jspdf.service';

describe('JspdfService', () => {
  let service: JspdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JspdfService],
    }).compile();

    service = module.get<JspdfService>(JspdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
