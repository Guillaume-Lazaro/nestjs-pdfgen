import { Test, TestingModule } from '@nestjs/testing';
import { PdfgenController } from './pdfgen.controller';

describe('PdfgenController', () => {
  let controller: PdfgenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfgenController],
    }).compile();

    controller = module.get<PdfgenController>(PdfgenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
