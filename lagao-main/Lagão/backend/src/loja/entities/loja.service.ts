import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volume } from 'src/volume/entities/volume.entity';
import { CreateLojaDto } from './dto/create-loja.dto';
import { Loja } from './loja.entity';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(Loja) private repo: Repository<Loja>,
    @InjectRepository(Volume) private volumeRepo: Repository<Volume>
  ) {}

  // Pega a loja principal (ID 1)
  async findOne() {
    const loja = await this.repo.findOne({ where: { id: 1 }, relations: ['galeria'] });
    if (!loja) {
      // Se não existir, cria uma vazia
      return await this.repo.save(this.repo.create({ id: 1, endereco: '', linkMapa: '' }));
    }
    return loja;
  }

  // Atualiza dados de texto
  async update(dto: CreateLojaDto) {
    const loja = await this.findOne();
    this.repo.merge(loja, dto);
    return await this.repo.save(loja);
  }

  // Adiciona uma foto à galeria
  async addFoto(url: string) {
    const loja = await this.findOne();
    const novaFoto = this.volumeRepo.create({
      type: 'imagem',
      url: url,
      loja: loja
    });
    return await this.volumeRepo.save(novaFoto);
  }

  // Remove uma foto
  async removeFoto(idVolume: number) {
    return await this.volumeRepo.delete(idVolume);
  }
}