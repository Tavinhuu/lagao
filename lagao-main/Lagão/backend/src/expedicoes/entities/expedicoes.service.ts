import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volume } from 'src/volume/entities/volume.entity';
import { CreateExpedicaoDto } from './dto/create-expedicao.dto';
import { Expedicao } from './expedicao.entity';
import { UpdateExpedicaoDto } from './dto/update-expedicao.dto';

@Injectable()
export class ExpedicoesService {
  constructor(
    @InjectRepository(Expedicao) private repo: Repository<Expedicao>,
    @InjectRepository(Volume) private volumeRepo: Repository<Volume>
  ) {}

  async create(createDto: CreateExpedicaoDto) {
    const { urlImagem, ...dados } = createDto;
    const expedicao = this.repo.create(dados);
    const salva = await this.repo.save(expedicao);

    if (urlImagem) {
      await this.volumeRepo.save(this.volumeRepo.create({
        type: 'imagem', url: urlImagem, expedicao: salva
      }));
    }
    return salva;
  }

  async findAll() {
    return await this.repo.find({ 
        relations: ['volume'], 
        order: { dataInicio: 'ASC' } // Próximas primeiro
    });
  }

  async findOne(id: number) {
    const expedicao = await this.repo.findOne({ where: { id }, relations: ['volume'] });
    if (!expedicao) throw new NotFoundException(`Expedição ${id} não encontrada`);
    return expedicao;
  }

  async update(id: number, updateDto: UpdateExpedicaoDto) {
    const { urlImagem, ...dados } = updateDto;
    const expedicao = await this.repo.preload({ id, ...dados });
    if (!expedicao) throw new NotFoundException(`Expedição ${id} não encontrada`);
    
    const salva = await this.repo.save(expedicao);
    
    if (urlImagem !== undefined) {
      // Lógica simplificada para atualizar imagem
      const vol = await this.volumeRepo.findOne({ where: { expedicao: { id } } });
      if (vol) {
         vol.url = urlImagem;
         await this.volumeRepo.save(vol);
      } else if (urlImagem) {
         await this.volumeRepo.save(this.volumeRepo.create({ type: 'imagem', url: urlImagem, expedicao: salva }));
      }
    }
    return salva;
  }

  async remove(id: number) {
    const exp = await this.repo.findOne({ where: { id } });
    if(exp) return await this.repo.remove(exp);
  }
}