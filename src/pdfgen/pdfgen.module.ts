import { Module } from '@nestjs/common';
import { PdfgenController } from './pdfgen.controller';
import { PdfgenService } from './pdfgen.service';

@Module({
  controllers: [PdfgenController],
  providers: [PdfgenService]
})
export class PdfgenModule {}
