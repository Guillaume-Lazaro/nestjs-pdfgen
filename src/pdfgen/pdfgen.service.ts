import { Injectable, NotFoundException } from '@nestjs/common';
import { PdfService } from '../pdf/pdf.service';
import { CreatePdfgenDto } from './dto/create-pdfgen.dto';
import { Pdfgen } from './interfaces/pdfgen.interface';
import { Observable } from 'rxjs';
import { FileInfo } from 'html-pdf';
import { Readable } from 'stream';
import { mockedReceipt } from './mocks/test.mock';
import { JspdfController } from 'src/jspdf/jspdf.controller';
import { JspdfService } from 'src/jspdf/jspdf.service';

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

  constructor(private readonly pdfService: PdfService, private readonly jspdfService: JspdfService) {};

  findAll(): Pdfgen[] {
    return this.pdfgens;
  }

  findOne(id: string): Pdfgen {
    return this.pdfgens.find(pdfgen => pdfgen.id === Number(id));
  }

  create(pdfgen: CreatePdfgenDto) {
    this.pdfgens = [...this.pdfgens, pdfgen];
  }

  update(id: string, pdfgen: Pdfgen) {
    // Retrouver le bon pdfgen
    const pdfgenToUpdate = this.pdfgens.find(pdfgen => pdfgen.id === +id);
    if(!pdfgenToUpdate) {
      return new NotFoundException('Id non trouvé')
    }

    // Appliquer les modifications
    if(pdfgen.hasOwnProperty('done')) {
      pdfgenToUpdate.done = pdfgen.done; 
    }
    if(pdfgen.title) {
      pdfgenToUpdate.title = pdfgen.title; 
    }
    if(pdfgen.description) {
      pdfgenToUpdate.description = pdfgen.description; 
    }
    if(pdfgen.id) {
      pdfgenToUpdate.id = pdfgen.id; 
    }

    const updatedPdfgens = this.pdfgens.map(pdfgen => pdfgen.id !== +id ? pdfgen : pdfgenToUpdate);
    this.pdfgens = [...updatedPdfgens]
    return { updatedPdfgen: 1, pdfgens: pdfgenToUpdate};
  }

  delete(id: string) {
    const nbOfPdfgensBeforeDelete = this.pdfgens.length;
    // On remplit le nouveau tableau contenant uniquement les éléments ne correspondant PAS à l'id à supprimer
    this.pdfgens = [...this.pdfgens.filter(pdfgen => pdfgen.id !== +id)]
    if(this.pdfgens.length < nbOfPdfgensBeforeDelete) {
      return { deletedPdfgens: 1, nbPdfgens: this.pdfgens.length };
    } else {
      return { deletedPdfgens: 0, nbPdfgens: this.pdfgens.length };
    }
  }

  // PDF génération
  public getTestPdfFile(): Observable<FileInfo> {
    let localData = mockedReceipt;
    let chartSvgString = this.jspdfService.getChartSvgString()

    localData.image = chartSvgString;

    let a = this.pdfService.generatePdfFile(
      'html',
      {
        locals: localData,
        format: 'A4',
        header: {
          height: '75px',
        },
        footer: {
          height: '100px',
        },
        orientation: 'portrait',
      },
      'test de fichier crée (FileInfo).pdf',
    );

    return a;
  };

  // Stream
  public getTestPdfStream() : Observable<Readable> {
    return this.pdfService.generatePdfStream(
      'html',
      {
        locals: mockedReceipt,
        format: 'A4',
        header: {
          height: '75px',
        },
        footer: {
          height: '100px',
        },
        orientation: 'portrait',
      },
    );
  };
}
