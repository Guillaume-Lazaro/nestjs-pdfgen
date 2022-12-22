import { Module } from '@nestjs/common';
import { PdfgenController } from './pdfgen.controller';
import { PdfgenService } from './pdfgen.service';
import { PDFModule } from '@t00nday/nestjs-pdf';
import { PdfService } from 'src/pdf/pdf.service';

@Module({
  controllers: [PdfgenController],
  imports: [PDFModule.register({
    view: {
      root: 'templates',
      engine: 'pug',
    },
  })],
  providers: [PdfgenService, PdfService]
})
export class PdfgenModule {}
