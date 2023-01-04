import { Test, TestingModule } from '@nestjs/testing';
import { JspdfController } from './jspdf.controller';

describe('JspdfController', () => {
  let controller: JspdfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JspdfController],
    }).compile();

    controller = module.get<JspdfController>(JspdfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
