import { Test, TestingModule } from '@nestjs/testing';
import { PdfgenService } from './pdfgen.service';

describe('PdfgenService', () => {
  let service: PdfgenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfgenService],
    }).compile();

    service = module.get<PdfgenService>(PdfgenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
