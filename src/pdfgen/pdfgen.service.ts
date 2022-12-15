import { Injectable } from '@nestjs/common';
import { PDFOptions, PDFService } from '@t00nday/nestjs-pdf';
import { Pdfgen } from './interfaces/pdfgen.interface';

@Injectable()
export class PdfgenService {

  pdfgens: Pdfgen[] = [
    {
      id: 1,
      title: 'pdfgen1',
      done: true,
      description: '1st pdfgen'
    }, 
    {
      id: 2,
      title: 'pdfgen2',
      done: false,
      description: '2nd pdfgen'
    }
  ]

  // constructor(private readonly pdfService: PDFService);

  findAll(): Pdfgen[] {
    return this.pdfgens;
  }

  create(pdfgen: Pdfgen) {
    this.pdfgens = [...this.pdfgens, pdfgen];
  }
}
