import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CursosService {
  constructor(@InjectRepository(Curso) private repo:Repository<Curso>){}
  create(createCursoDto: CreateCursoDto) {
    return 'This action adds a new curso';
  }

  findAll() {
    // return this.repo.find();
    return [
      // {
      //   id: 1,
      //   nome: 'Snorkeling',
      //   imagens: [
      //     {
      //       categoriaId: 1,
      //       imagens: [
      //         'https://picsum.photos/seed/snorkel1/800/400',
      //         'https://picsum.photos/seed/snorkel2/800/400'
      //       ]
      //     }
      //   ],
      //   categorias: [
      //     {
      //       categoriaId: 1,
      //       titulo: 'Snorkeling - Iniciante',
      //       descricao: 'Introdução ao mergulho de superfície com snorkel.',
      //       volume: {
      //         id: 1,
      //         nome: 'Snorkeling',
      //         descricao: 'Volume básico de snorkeling',
      //         cursos: []
      //       }
      //     }
      //   ]
      // },
    
      // {
      //   id: 2,
      //   nome: 'Freediving',
      //   imagens: [
      //     {
      //       categoriaId: 1,
      //       imagens: [
      //         'https://picsum.photos/seed/freedive1/800/400',
      //         'https://picsum.photos/seed/freedive2/800/400'
      //       ]
      //     },
      //     {
      //       categoriaId: 2,
      //       imagens: [
      //         'https://picsum.photos/seed/freedive3/800/400'
      //       ]
      //     }
      //   ],
      //   categorias: [
      //     {
      //       categoriaId: 1,
      //       titulo: 'Freediving - Iniciante',
      //       descricao: 'Aprenda técnicas básicas de apneia e segurança.',
      //       volume: {
      //         id: 2,
      //         nome: 'Freediving',
      //         descricao: 'Curso básico de freediving',
      //         cursos: []
      //       }
      //     },
      //     {
      //       categoriaId: 2,
      //       titulo: 'Freediving - Intermediário',
      //       descricao: 'Aprofunde-se nas técnicas de respiração e resistência.',
      //       volume: {
      //         id: 2,
      //         nome: 'Freediving',
      //         descricao: 'Curso intermediário de freediving',
      //         cursos: []
      //       }
      //     }
      //   ]
      // },
    
      // {
      //   id: 3,
      //   nome: 'Open Water Scuba Diver',
      //   imagens: [
      //     {
      //       categoriaId: 1,
      //       imagens: [
      //         'https://picsum.photos/seed/open1/800/400'
      //       ]
      //     },
      //     {
      //       categoriaId: 2,
      //       imagens: [
      //         'https://picsum.photos/seed/open2/800/400'
      //       ]
      //     },
      //     {
      //       categoriaId: 3,
      //       imagens: [
      //         'https://picsum.photos/seed/open3/800/400'
      //       ]
      //     }
      //   ],
      //   categorias: [
      //     {
      //       categoriaId: 1,
      //       titulo: 'Open Water - Iniciante',
      //       descricao: 'Curso básico para mergulho com cilindro.',
      //       volume: {
      //         id: 3,
      //         nome: 'Open Water Scuba Diver',
      //         descricao: 'Volume básico de mergulho com cilindro',
      //         cursos: []
      //       }
      //     },
      //     {
      //       categoriaId: 2,
      //       titulo: 'Open Water - Intermediário',
      //       descricao: 'Expanda seu conhecimento em ambientes mais complexos.',
      //       volume: {
      //         id: 3,
      //         nome: 'Open Water Scuba Diver',
      //         descricao: 'Volume intermediário de mergulho com cilindro',
      //         cursos: []
      //       }
      //     },
      //     {
      //       categoriaId: 3,
      //       titulo: 'Open Water - Avançado',
      //       descricao: 'Domine técnicas avançadas de navegação e flutuabilidade.',
      //       volume: {
      //         id: 3,
      //         nome: 'Open Water Scuba Diver',
      //         descricao: 'Volume avançado de mergulho com cilindro',
      //         cursos: []
      //       }
      //     }
      //   ]
      // },
    
      // {
      //   id: 4,
      //   nome: 'Rescue Diver',
      //   imagens: [
      //     {
      //       categoriaId: 1,
      //       imagens: [
      //         'https://picsum.photos/seed/rescue1/800/400'
      //       ]
      //     },
      //     {
      //       categoriaId: 2,
      //       imagens: [
      //         'https://picsum.photos/seed/rescue2/800/400'
      //       ]
      //     },
      //     {
      //       categoriaId: 3,
      //       imagens: [
      //         'https://picsum.photos/seed/rescue3/800/400'
      //       ]
      //     },
      //     {
      //       categoriaId: 4,
      //       imagens: [
      //         'https://picsum.photos/seed/rescue4/800/400'
      //       ]
      //     }
      //   ],
      //   categorias: [
      //     {
      //       categoriaId: 1,
      //       titulo: 'Rescue Diver - Iniciante',
      //       descricao: 'Noções básicas de primeiros socorros e auto-resgate.',
      //       volume: {
      //         id: 4,
      //         nome: 'Rescue Diver',
      //         descricao: 'Curso básico de Rescue Diver',
      //         cursos: []
      //       }
      //     },
      //     {
      //       categoriaId: 2,
      //       titulo: 'Rescue Diver - Intermediário',
      //       descricao: 'Identificação de riscos e suporte a mergulhadores.',
      //       volume: {
      //         id: 4,
      //         nome: 'Rescue Diver',
      //         descricao: 'Curso intermediário de Rescue Diver',
      //         cursos: []
      //       }
      //     },
      //     {
      //       categoriaId: 3,
      //       titulo: 'Rescue Diver - Avançado',
      //       descricao: 'Simulações práticas e trabalho em equipe subaquático.',
      //       volume: {
      //         id: 4,
      //         nome: 'Rescue Diver',
      //         descricao: 'Curso avançado de Rescue Diver',
      //         cursos: []
      //       }
      //     },
      //     {
      //       categoriaId: 4,
      //       titulo: 'Rescue Diver - Profissional',
      //       descricao: 'Preparação para liderança e resposta em emergências.',
      //       volume: {
      //         id: 4,
      //         nome: 'Rescue Diver',
      //         descricao: 'Curso profissional de Rescue Diver',
      //         cursos: []
      //       }
      //     }
      //   ]
      // }
    ];
  }

  async findByCategory(idCategoria){
    return await this.repo.find({where:{categoriaCurso:idCategoria}})
  }

  findOne(id: number) {
    return `This action returns a #${id} curso`;
  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return `This action updates a #${id} curso`;
  }

  remove(id: number) {
    return `This action removes a #${id} curso`;
  }
}
