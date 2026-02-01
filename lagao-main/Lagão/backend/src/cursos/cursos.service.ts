import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';
import { Volume } from 'src/volume/entities/volume.entity';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso) private repo: Repository<Curso>,
    @InjectRepository(Volume) private volumeRepo: Repository<Volume>
  ) {}

  async create(createCursoDto: CreateCursoDto) {
    // Cria a entidade com base nos dados recebidos
    const { urlImagem, ...dadosCurso } = createCursoDto;

    const curso = this.repo.create(dadosCurso);
    const cursoSalvo = await this.repo.save(curso);

    if (urlImagem) {
        const volume = this.volumeRepo.create({
            type: 'imagem',
            url: urlImagem,
            curso: cursoSalvo // Associa ao curso criado
        });
        await this.volumeRepo.save(volume);
    }

    return cursoSalvo;
  }

  async findAll() {
    return await this.repo.find({
      relations: [
        'categoriaCurso', // Isso garante que a categoria venha junto
        'volume', 
        'volumeTeorico', 
        'volumeAguasAbertas', 
        'volumeAguasConfinadas'
      ],
      order: {
        id: 'ASC'
      }
    });
  }

  async findByCategory(idCategoria: any) {
    return await this.repo.find({
      where: { categoriaCurso: { id: idCategoria } },
      relations: ['volume', 'categoriaCurso']
    });
  }

  async findOne(id: number) {
    const curso = await this.repo.findOne({
      where: { id },
      relations: ['categoriaCurso', 'volume']
    });
    
    if (!curso) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }
    
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    // 1. Separa a URL da imagem do resto dos dados
    const { urlImagem, ...dadosCurso } = updateCursoDto;

    // 2. Prepara o curso para atualização
    const curso = await this.repo.preload({
      id: id,
      ...dadosCurso,
    });

    if (!curso) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }

    // 3. Salva as alterações do curso
    const cursoAtualizado = await this.repo.save(curso);

    // 4. Lógica para Atualizar a Imagem (Volume)
    if (urlImagem) {
      // Procura se já existe volume (imagem) para este curso
      const volumeExistente = await this.volumeRepo.findOne({
        where: { curso: { id: id } }
      });

      if (volumeExistente) {
        // Se existe, atualiza a URL
        volumeExistente.url = urlImagem;
        await this.volumeRepo.save(volumeExistente);
      } else {
        // Se não existe, cria um novo
        const novoVolume = this.volumeRepo.create({
          type: 'imagem',
          url: urlImagem,
          curso: cursoAtualizado
        });
        await this.volumeRepo.save(novoVolume);
      }
    }

    return cursoAtualizado;
  }

  async remove(id: number) {
    const curso = await this.findOne(id);
    return await this.repo.remove(curso);
  }
}