import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaCursoDto } from './dto/create-categoria-curso.dto';
import { UpdateCategoriaCursoDto } from './dto/update-categoria-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaCurso } from './entities/categoria-curso.entity';
import { Repository } from 'typeorm';
import { Volume } from 'src/volume/entities/volume.entity';

@Injectable()
export class CategoriaCursosService {
  constructor(
    @InjectRepository(CategoriaCurso) private repo: Repository<CategoriaCurso>,
    @InjectRepository(Volume) private volumeRepo: Repository<Volume>
  ) { }
  
  async create (createDto: CreateCategoriaCursoDto) {
    const { urlImagem, ...dados } = createDto;
    
    // 1. Cria a categoria
    const categoria = this.repo.create(dados);
    const categoriaSalva = await this.repo.save(categoria);

    // 2. Se tiver imagem, cria o Volume e associa
    if (urlImagem) {
      const volume = this.volumeRepo.create({
        type: 'imagem',
        url: urlImagem,
        categoriaCurso: categoriaSalva 
      });
      const volumeSalvo = await this.volumeRepo.save(volume);
      
      categoriaSalva.volume = volumeSalvo;
      await this.repo.save(categoriaSalva);
    }

    return categoriaSalva;
  }

  async findAll () {
    return await this.repo.find({
      relations: ['volume'],
      order: { id: 'ASC' }
    });
  }

  async findOne (id: number) {
    const categoria = await this.repo.findOne({where: {id}, relations: ['volume']});
    if (!categoria) throw new NotFoundException(`Categoria ${id} não encontrada`);
    return categoria;
  }

  async update (id: number, updateDto: UpdateCategoriaCursoDto) {
    const { urlImagem, ...dados } = updateDto;

    const categoria = await this.repo.preload({
      id: id,
      ...dados
    });

    if (!categoria) throw new NotFoundException(`Categoria ${id} não encontrada`);

    const categoriaSalva = await this.repo.save(categoria);

    // Atualiza Imagem se fornecida
    if (urlImagem !== undefined) {
      // Busca a categoria novamente para garantir que temos o volume carregado
      const categoriaComVolume = await this.repo.findOne({where: {id}, relations: ['volume']});
      
      // CORREÇÃO: Verificamos se 'volume' existe E se NÃO é um número
      if (categoriaComVolume && categoriaComVolume.volume && typeof categoriaComVolume.volume !== 'number') {
        // Agora o TypeScript sabe que é um objeto Volume e deixa acessar .id
        await this.volumeRepo.update(categoriaComVolume.volume.id, { url: urlImagem });
      } else {
        // Se não tinha volume antes, cria um novo
        const novoVolume = this.volumeRepo.create({
            type: 'imagem',
            url: urlImagem,
            categoriaCurso: categoriaSalva
        });
        const vol = await this.volumeRepo.save(novoVolume);
        
        categoriaSalva.volume = vol;
        await this.repo.save(categoriaSalva);
      }
    }

    return categoriaSalva;
  }

  async remove (id: number) {
    const categoria = await this.findOne(id);
    return await this.repo.remove(categoria);
  }
}