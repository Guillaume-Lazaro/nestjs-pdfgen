import { Injectable, NotFoundException } from '@nestjs/common';
import { PdfService } from '../pdf/pdf.service';
import { CreatePdfgenDto } from './dto/create-pdfgen.dto';
import { Pdfgen } from './interfaces/pdfgen.interface';
import { Observable } from 'rxjs';
import { FileInfo } from 'html-pdf';

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

  constructor(private readonly pdfService: PdfService) {};

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
  public getTestPdf(): Observable<FileInfo> {
    return this.pdfService.generatePdfFile(
      'test',
      {
        locals: this.mockedReceipt,
        format: 'A4',
        header: {
          height: '75px',
        },
        footer: {
          height: '100px',
        },
        orientation: 'portrait',
      },
      'test.pdf',
    );
  };

  public mockedReceipt = {
    date: '14 octobre 2021',
    defReceiptDest: {
      title: 'SARL',
      fullname: 'RUIZ ET FILS',
      address: {
        street: '3625 CHEMIN DE RICAUD',
        zip: '11400',
        city: 'MAS SAINTES PUELLES',
        label: 'Backstage-Label'
      },
    },
    title:
      '<p class="ql-align-center"><strong class="ql-size-large"><u>APPEL DE COTISATION﻿</u></strong></p><p class="ql-align-center"><strong>Valant quittance après paiement</strong></p>',
      // headerText:
      // '<p>Nous vous prions de trouver ci-dessous, le détail de vos <span style="color: rgb(255, 153, 0);">primes</span> <span style="color: rgb(255, 153, 0);">d’assurance</span> arrivées à échéance.</p>',
    headerText: '<p>Ceci est un test de note externe</p>',
    company: 'AXA',
    contract: '10230330004',
    category: 'Multirisque Professionnelle',
    externalNote: null,
    startDate: '25/05/2018',
    endDate: '30/06/2018',
    premiumAti: '520,76',
    premiumEt: '427,65',
    taxes: '93,11',
    subscriptionTax: '85,53',
    naturalDisaster: '20',
    expenses: '1 380,10',
    serviceFeeAti: null,
    serviceFeeTax: null,
    deposit: '100',
    totalAti: '420,76',
    showDeposit: true,
    footerText:
      '<p class="ql-align-right"><span class="ql-size-small">Ceci est le footerText</span></p><p>Nous vous remercions de bien vouloir virer la somme du montant total TTC ci-dessus à l\'ordre de :</p><ul><li><strong>Toulouse Saint-Agne Assurances</strong></li><li><strong>IBAN : FR76 3000 4023 2200 0100 5036 544</strong></li><li><strong>﻿BIC : BNPAFRPPXXX</strong></li></ul><p class="ql-align-center">Nous vous remercions d\'adresser votre courrier au <strong>2 Rue de Dunkerque – BP31451 11494 CASTELNAUDARY Cedex</strong></p><p><strong><em>Informations</em></strong></p><ol><li>Les cotisations d’assurances sont exonérées de TVA (Art. 261 C2 du Code Général des Impôts).Si votre contrat comporte une garantie catastrophes naturelles, les documents contractuels qui vous ont été remis lors de la souscription du contrat définissent les conditions d’indemnisation et les modalités d’évolution des franchises (fixées par arrêté ministériel). Vous pouvez en obtenir une copie sur simple demande auprès de votre agent.Pour vos contrats auto : lorsque votre véhicule a subi un dommage garanti par le contrat, vous avez la faculté de choisir le réparateur professionnel auquel vous souhaitez recourir.Votre contrat est renouvelé chaque année automatiquement, par tacite reconduction. Si vous souhaitez ne pas le reconduire, vous disposez, quelles que soient les dispositions de votre contrat, d’un délai de vingt jours suivant l’envoi du présent avis d’échéance annuelle, le cachet de La Poste faisant foi. Votre demande doit nous être adressée par lettre recommandée.Cette disposition ne s’applique pas en cas de rappel de cotisation.</li><li>De plus, pour les contrats auto et habitation, vous pouvez, à l’expiration d’un délai d’un an à compter de la première souscription, résilier votre contrat sans frais ni pénalités. La résiliation prend effet un mois après que nous en aurons reçu notification par lettre recommandée de votre nouvel assureur pour les contrats auto ou contrats habitation de locataire, par lettre ou tout autre support durable pour les contrats habitation (co)propriétaire.Ces dispositions s’appliquent aux contrats couvrant les personnes physiques en dehors de leurs activités professionnelles. Si votre contrat englobe d’une part la couverture de vos risques professionnels, d’autre part la couverture de votre personne physique à des fins non professionnelles, vous bénéficiez du droit de résiliation mentionné ci-dessus.</li></ol>'
  };
}
