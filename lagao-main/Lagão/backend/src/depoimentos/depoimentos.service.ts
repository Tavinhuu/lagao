import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Depoimento } from './entities/depoimento.entity';
import { Repository } from 'typeorm';
import { Volume } from 'src/volume/entities/volume.entity';

@Injectable()
export class DepoimentosService {
  constructor(
    @InjectRepository(Depoimento) private repo: Repository<Depoimento>,
    @InjectRepository(Volume) private volumeRepo: Repository<Volume>
  ) {}

  async create(createDto: CreateDepoimentoDto) {
    const { urlImagem, ...dados } = createDto;
    
    const depoimento = this.repo.create(dados);
    const salvo = await this.repo.save(depoimento);

    if (urlImagem) {
      const volume = this.volumeRepo.create({
        type: 'imagem',
        url: urlImagem,
        depoimento: salvo
      });
      await this.volumeRepo.save(volume);
      
      // Atualiza a relação inversa se necessário, mas como Volume tem depoimento_id, já está ok.
      // Apenas retornamos o objeto atualizado
      return await this.findOne(salvo.id);
    }

    return salvo;
  }

  async findAll() {
    return await this.repo.find({
      relations: ['volume'],
      order: { id: 'DESC' }
    });
  }

  async findOne(id: number) {
    const depoimento = await this.repo.findOne({ where: { id }, relations: ['volume'] });
    if (!depoimento) throw new NotFoundException(`Depoimento ${id} não encontrado`);
    return depoimento;
  }

  async update(id: number, updateDto: UpdateDepoimentoDto) {
    const { urlImagem, ...dados } = updateDto;

    const depoimento = await this.repo.preload({
      id: id,
      ...dados
    });

    if (!depoimento) throw new NotFoundException(`Depoimento ${id} não encontrado`);

    const salvo = await this.repo.save(depoimento);

    if (urlImagem !== undefined) {
      await this.salvarImagem(salvo, urlImagem);
    }

    return await this.findOne(id);
  }

  async remove(id: number) {
    const depoimento = await this.findOne(id);
    return await this.repo.remove(depoimento);
  }

  private async salvarImagem(depoimento: Depoimento, url: string) {
    // Verifica se já existe volume para este depoimento
    const volumeExistente = await this.volumeRepo.findOne({
      where: { depoimento: { id: depoimento.id } }
    });

    if (url === "") {
        // Se a URL veio vazia, deletamos o volume (removemos a foto)
        if (volumeExistente) await this.volumeRepo.remove(volumeExistente);
        return;
    }

    if (volumeExistente) {
      volumeExistente.url = url;
      await this.volumeRepo.save(volumeExistente);
    } else {
      const novoVolume = this.volumeRepo.create({
        type: 'imagem',
        url: url,
        depoimento: depoimento
      });
      await this.volumeRepo.save(novoVolume);
    }
  }
}