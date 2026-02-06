import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parceiro } from './entities/parceiro.entity';
import { Volume } from 'src/volume/entities/volume.entity';
import { CreateParceiroDto } from './entities/dto/create-parceiro.dto';

@Injectable()
export class ParceirosService {
  constructor(
    @InjectRepository(Parceiro) private repo: Repository<Parceiro>,
    @InjectRepository(Volume) private volumeRepo: Repository<Volume>
  ) {}

  async create(dto: CreateParceiroDto) {
    const { urlLogo, ...dados } = dto;
    const parceiro = this.repo.create(dados);
    const salvo = await this.repo.save(parceiro);

    if (urlLogo) {
      await this.volumeRepo.save(this.volumeRepo.create({
        type: 'imagem', url: urlLogo, parceiro: salvo
      }));
    }
    return salvo;
  }

  async findAll() {
    return await this.repo.find();
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}