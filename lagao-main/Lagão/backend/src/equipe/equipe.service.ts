import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipe } from './entities/equipe.entity';
import { Repository } from 'typeorm';
import { Volume } from 'src/volume/entities/volume.entity';

@Injectable()
export class EquipeService {
  constructor(
    @InjectRepository(Equipe) private repo: Repository<Equipe>,
    @InjectRepository(Volume) private volumeRepo: Repository<Volume>
  ) {}

  async create(createDto: CreateEquipeDto) {
    const { urlImagem, ...dados } = createDto;
    
    const membro = this.repo.create(dados);
    const salvo = await this.repo.save(membro);

    if (urlImagem) {
      const volume = this.volumeRepo.create({
        type: 'imagem',
        url: urlImagem,
        equipe: salvo
      });
      await this.volumeRepo.save(volume);
      return await this.findOne(salvo.id);
    }
    return salvo;
  }

  async findAll() {
    return await this.repo.find({ 
      relations: ['volume'], 
      order: { ordem: 'ASC', id: 'ASC' }
    });
  }

  async findOne(id: number) {
    const membro = await this.repo.findOne({ where: { id }, relations: ['volume'] });
    if (!membro) throw new NotFoundException(`Membro ${id} não encontrado`);
    return membro;
  }

  async update(id: number, updateDto: any) { // Usando any para simplificar, mas ideal é UpdateDto
    const { urlImagem, ...dados } = updateDto;
    const membro = await this.repo.preload({ id, ...dados });
    if (!membro) throw new NotFoundException(`Membro ${id} não encontrado`);

    const salvo = await this.repo.save(membro);

    if (urlImagem !== undefined) {
      await this.salvarImagem(salvo, urlImagem);
    }
    return await this.findOne(id);
  }

  async remove(id: number) {
    const membro = await this.findOne(id);
    return await this.repo.remove(membro);
  }

  private async salvarImagem(equipe: Equipe, url: string) {
    const volumeExistente = await this.volumeRepo.findOne({ where: { equipe: { id: equipe.id } } });
    
    if (url === "") {
        if (volumeExistente) await this.volumeRepo.remove(volumeExistente);
        return;
    }

    if (volumeExistente) {
      volumeExistente.url = url;
      await this.volumeRepo.save(volumeExistente);
    } else {
      const novoVolume = this.volumeRepo.create({ type: 'imagem', url, equipe });
      await this.volumeRepo.save(novoVolume);
    }
  }
}