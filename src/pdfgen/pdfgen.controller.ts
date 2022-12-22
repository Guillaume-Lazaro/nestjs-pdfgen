import { Body, Controller, Delete, Get, Param, Patch, Post, Render, Res } from '@nestjs/common';
import { doesNotMatch } from 'assert';
import { catchError, map, of } from 'rxjs';
import { CreatePdfgenDto } from './dto/create-pdfgen.dto';
import { Pdfgen } from './interfaces/pdfgen.interface';
import { Response } from 'express';
import { PdfgenService } from './pdfgen.service';
import { mockedReceipt } from './mocks/test.mock';

@Controller('pdfgen')
export class PdfgenController {
  constructor(private readonly pdfgenService: PdfgenService) {}

  // @Get()
  // findAll(): Pdfgen[] {
  //   return this.pdfgenService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pdfgenService.findOne(id);
  }

  @Get()
  @Render('html/html')
  getTestPdf() {
    // let b = this.pdfgenService.getTestPdf().subscribe(e => {
    //   console.log(e);
    //   return e;
    // })

    return mockedReceipt;

    // console.log(b);
    // return b;
  }

  @Get('pdf')
  getTestPdfStream(@Res() res: Response): any {
    return this.pdfgenService.getTestPdfStream().pipe(
      map((stream) => {
        res.setHeader('Content-Type', 'application/octet-stream');
        return stream.pipe(res);
      }),
      catchError((err) => {
        console.log(err);
        res.status(500).end(err.message);
        return of(err);
      }),
    )
  }


  //////
  // @Get('company/:id')
  // getCompanyOutcouponPdf(@Headers() headers: Headers, @Res() res: Response, @Param('id') id: string) {
  //   // Use this service function to generate the PDF file (named 'test.pdf') in this project root directory
  //   // return this.outcouponsService.getOutcouponPdfFile();
    
  //   return this.outcouponsService.getCompanyOutcouponPdfStream(headers, +id).pipe(
  //     map((stream) => {
  //       res.setHeader('Content-Type', 'application/octet-stream');
  //       return stream.pipe(res);
  //     }),
  //     catchError((err) => {
  //       this.logger.error(err.message);
  //       res.status(500).end(err.message);
  //       return of(err);
  //     }),
  //   );
  // }
  ///////


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
