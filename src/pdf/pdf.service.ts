import { FileInfo } from 'html-pdf';
import { Injectable } from '@nestjs/common';
import { PDFOptions, PDFService } from '@t00nday/nestjs-pdf';
import { Observable, catchError } from 'rxjs';
import { Readable } from 'stream';

@Injectable()
export class PdfService {
  constructor(private readonly pdfService: PDFService) {}

  public generatePdfFile(
    template: string,
    options: PDFOptions,
    filename: string,
  ): Observable<FileInfo> {
    return this.pdfService.toFile(template, filename, options);
  }

  public generatePdfArrayBufferFromStream(
    template: string,
    options?: PDFOptions,
  ): Observable<ArrayBuffer> {
    return new Observable((observer) => {
      this.pdfService.toStream(template, options).subscribe((stream) => {
        const chunks = [];
        stream.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });
        stream.on('end', () => {
          const buffer: Buffer = Buffer.concat(chunks);

          // ArrayBuffer convertion

          // See : https://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer/31394257#31394257
          // const arrayBuffer: ArrayBuffer = buffer.buffer.slice(
          //   buffer.byteOffset,
          //   buffer.byteOffset + buffer.byteLength,
          // );

          const arrayBuffer = new ArrayBuffer(buffer.length);
          const view = new Uint8Array(arrayBuffer);
          let i = 0;
          for (i = 0; i < buffer.length; ++i) {
            view[i] = buffer[i];
          }

          observer.next(arrayBuffer);
          observer.complete();
        });
        stream.on('error', (error) => {
          observer.error(error);
          observer.complete();
        });
      });
    });
  }

  public generatePdfStream(
    template: string,
    options?: PDFOptions,
  ): Observable<Readable> {
    return this.pdfService.toStream(template, options);
  }
}
