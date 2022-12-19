import { Module } from '@nestjs/common';
import { PdfgenController } from './pdfgen.controller';
import { PdfgenService } from './pdfgen.service';
import { PDFModule } from '@t00nday/nestjs-pdf';

@Module({
  controllers: [PdfgenController],
  imports: [PDFModule.register({
    view: {
      root:'/path/to/template',
      engine: 'pug'
    },
  })],
  providers: [PdfgenService]
})
export class PdfgenModule {}
