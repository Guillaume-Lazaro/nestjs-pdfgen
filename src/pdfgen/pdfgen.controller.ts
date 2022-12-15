import { Body, Controller, Get, Post } from '@nestjs/common';
import { Pdfgen } from './interfaces/pdfgen.interface';
import { PdfgenService } from './pdfgen.service';

@Controller('pdfgen')
export class PdfgenController {
  constructor(private readonly pdfgenService: PdfgenService) {}

  @Get()
  findAll(): Pdfgen[] {
    return this.pdfgenService.findAll();
  }

  @Post()
  createPdfgen(@Body() newPdfgen) {
    console.log(newPdfgen);
    this.pdfgenService.create(newPdfgen);
  }
}
