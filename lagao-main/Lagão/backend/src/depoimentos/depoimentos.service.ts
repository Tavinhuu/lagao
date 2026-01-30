import { Injectable } from '@nestjs/common';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';

@Injectable()
export class DepoimentosService {
  create(createDepoimentoDto: CreateDepoimentoDto) {
    return 'This action adds a new depoimento';
  }

  findAll() {
    // return `This action returns all depoimentos`;
    return[
    //   { nome: "Pedro Coelho", data:"18/05/2024", local:"Brasilia - DF", titulo:"Experiência Incrível", texto: "Fazer o curso de mergulho foi uma experiência incrível! No início, senti receio, mas os instrutores foram atenciosos...", volume: { id: 12, url: 'https://s3-alpha-sig.figma.com/img/41c9/c6c6/246551212df398fbcb25621c02067f40?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EeSC5KMsscyp~QyodPmKPoQph4bIQARo~S~q5nNTVp-gcfM1CzzZs2Hu9rZauQ1ZE48MOFCCIhilpqA4kzUKoprWnsNzAQgdM1SWcT2zcLDenHSRXMsVaC6FKmNZp2pIB2mTA9ECwpcnoaV80CmdwwDjJjLTKK-jGc7Ex3bOu6etjcJq4lsO61ptDCYt~XYc5GTCq00Q1tIt0uulq8I9B9PdEMvmLubOfIUF5hJJ~feIVeihfx~tK8k5v7ha8Hpq1DfGz4JmOhLxGhafJ-JKhHUzDUfQ6wNTV6cW71Y4lpDkf9mrOdlEkVkfSK7NRL9V0gEvU5IQ6LhhEZlFjlirZg__' }, rating: 4 },
    //   { nome: "Tulio Carvalho", data:"23/02/2023", local:"São Paulo - SP", titulo:"Super recomendo", texto: "O curso de mergulho superou minhas expectativas! Os instrutores foram excelentes...", volume: { id: 12, url: 'https://picsum.photos/80/80' }, rating: 5 },
    //   { nome: "Kesley Araújo", data:"15/02/2025", local:"Brasilia - DF", titulo:"Amei a sensação", texto: "Fazer o curso de mergulho foi uma experiência incrível! Aprendi a mergulhar com segurança...", volume: { id: 12, url: 'https://picsum.photos/80/80' }, rating: 3 }
    ]
  }

  findOne(id: number) {
    return `This action returns a #${id} depoimento`;
  }

  update(id: number, updateDepoimentoDto: UpdateDepoimentoDto) {
    return `This action updates a #${id} depoimento`;
  }

  remove(id: number) {
    return `This action removes a #${id} depoimento`;
  }
}
