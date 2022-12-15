import { Injectable } from '@nestjs/common';
import { PDFOptions, PDFService } from '@t00nday/nestjs-pdf';
import { Observable } from 'rxjs';
import { Readable } from 'stream';

@Injectable()
export class AppService {
  constructor(private readonly pdfService: PDFService) {}

  getHello(): string {
    return 'Hello World!';
  }

  generatePDFToFile(
    template: string,
    filename: string,
    options?: PDFOptions,
  ) {
    this.pdfService.toFile(template, filename, options);
  }

  generatePDFToStream(template: string, options?: PDFOptions) {
    this.pdfService.toStream(template, options);
  }

  generatePDFToBuffer(template: string, options?: PDFOptions) {
    this.pdfService.toBuffer(template, options);
  }

  public generatePdfStream(
    template: string,
    options?: PDFOptions,
  ): Observable<Readable> {
    return this.pdfService.toStream(template, options);
  }
}
