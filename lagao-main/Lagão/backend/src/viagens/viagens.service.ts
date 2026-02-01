import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateViagenDto } from './dto/create-viagen.dto';
import { UpdateViagenDto } from './dto/update-viagen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Viagem } from './entities/viagem.entity';
import { Repository } from 'typeorm';
import { Volume } from 'src/volume/entities/volume.entity';

@Injectable()
export class ViagensService {
  constructor(
    @InjectRepository(Viagem) private repo: Repository<Viagem>,
    @InjectRepository(Volume) private volumeRepo: Repository<Volume>
  ) {}

  async create(createDto: CreateViagenDto) {
    const { urlImagem, ...dados } = createDto;
    
    // Cria a viagem
    const viagem = this.repo.create(dados);
    const viagemSalva = await this.repo.save(viagem);

    // Salva a imagem se existir
    if (urlImagem) {
      const volume = this.volumeRepo.create({
        type: 'imagem',
        url: urlImagem,
        viagem: viagemSalva // Associa à viagem criada
      });
      await this.volumeRepo.save(volume);
    }

    return viagemSalva;
  }

  async findAll() {
    return await this.repo.find({
      relations: ['volume'], // Traz a imagem junto
      order: { inicioViagem: 'ASC' }
    });
  }

  async findOne(id: number) {
    const viagem = await this.repo.findOne({ where: { id }, relations: ['volume'] });
    if (!viagem) throw new NotFoundException(`Viagem ${id} não encontrada`);
    return viagem;
  }

  async update(id: number, updateDto: UpdateViagenDto) {
    const { urlImagem, ...dados } = updateDto;

    const viagem = await this.repo.preload({
      id: id,
      ...dados
    });

    if (!viagem) throw new NotFoundException(`Viagem ${id} não encontrada`);

    const viagemSalva = await this.repo.save(viagem);

    // Atualiza imagem
    if (urlImagem !== undefined) {
      await this.salvarImagem(viagemSalva, urlImagem);
    }

    return viagemSalva;
  }

  async remove(id: number) {
    const viagem = await this.findOne(id);
    return await this.repo.remove(viagem);
  }

  // Auxiliar para salvar imagem
  private async salvarImagem(viagem: Viagem, url: string) {
    if (!url) return;

    const volumeExistente = await this.volumeRepo.findOne({
      where: { viagem: { id: viagem.id } }
    });

    if (volumeExistente) {
      volumeExistente.url = url;
      await this.volumeRepo.save(volumeExistente);
    } else {
      const novoVolume = this.volumeRepo.create({
        type: 'imagem',
        url: url,
        viagem: viagem
      });
      await this.volumeRepo.save(novoVolume);
    }
  }
}