import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePdfgenDto } from './dto/create-pdfgen.dto';
import { Pdfgen } from './interfaces/pdfgen.interface';
import { PdfgenService } from './pdfgen.service';

@Controller('pdfgen')
export class PdfgenController {
  constructor(private readonly pdfgenService: PdfgenService) {}

  @Get()
  findAll(): Pdfgen[] {
    return this.pdfgenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pdfgenService.findOne(id);
  }

  @Post()
  createPdfgen(@Body() newPdfgen: CreatePdfgenDto) {
    this.pdfgenService.create(newPdfgen);
  }

  @Patch(':id')
  updatePdfgen(@Param('id') id: string, @Body() pdfgen: CreatePdfgenDto) {
    return this.pdfgenService.update(id, pdfgen)
  }

  @Delete(':id')
  deletePdfgen(@Param('id') id: string) {
    return this.pdfgenService.delete(id);
  }
}
