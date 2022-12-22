import { Module } from '@nestjs/common';
import { PDFModule } from '@t00nday/nestjs-pdf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfgenService } from './pdfgen/pdfgen.service';
import { PdfgenModule } from './pdfgen/pdfgen.module';
import { PdfService } from './pdf/pdf.service';

@Module({
  imports: [
    PDFModule.register({
      view: {
        root: '/path/to/template',
        engine: 'pug',
      },
    }),
    PdfgenModule,
  ],
  controllers: [AppController],
  providers: [AppService, PdfgenService, PdfService],
})
export class AppModule {}
