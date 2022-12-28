import { Body, Controller, Delete, Get, Param, Patch, Post, Render, Res } from '@nestjs/common';
import { doesNotMatch } from 'assert';
import { catchError, map, of } from 'rxjs';
import { CreatePdfgenDto } from './dto/create-pdfgen.dto';
import { Pdfgen } from './interfaces/pdfgen.interface';
import { Response } from 'express';
import { PdfgenService } from './pdfgen.service';
import { mockedReceipt } from './mocks/test.mock';
import { FileInfo } from 'html-pdf';

@Controller('pdfgen')
export class PdfgenController {
  constructor(private readonly pdfgenService: PdfgenService) {}

  // @Get()
  // findAll(): Pdfgen[] {
  //   return this.pdfgenService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pdfgenService.findOne(id);
  // }

  @Get()
  @Render('html/html')
  getTestPdf() {
    // let b = this.pdfgenService.getTestPdf().subscribe(e => {
    //   return e;
    // })

    return mockedReceipt;
  }

  // Génération d'un pdf de test via Observale<Readable>, Stream et Response : marche pas 
  @Get('/stream')
  getTestPdfStream(@Res({ passthrough: true }) res): any {
    console.log("Je passe par là !");
    return this.pdfgenService.getTestPdfStream().pipe(
      map((stream) => {
        res.setHeader('Content-Type', 'application/octet-stream');
        return stream.pipe(res);
      })
    )
  }

  // Génération d'un pdf de test via Observable<FileInfo> à la racine + Affichage via @Render
  @Get('/file')
  @Render('html/html')
  root() {
    console.log("Je passe par testPdfFile");
    this.pdfgenService.getTestPdfFile().subscribe(res => {
      console.log("Fichier créé avec succés");  // 1er accés: rien | après refresh : 2 fois le message
      return res;
    });

    // Pour que @Render ait accés aux variables, il faut les retourner dans root()
    return mockedReceipt;
  }

  /////////////////
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
