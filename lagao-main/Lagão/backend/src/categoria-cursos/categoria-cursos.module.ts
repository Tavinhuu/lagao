import { Module } from '@nestjs/common';
import { CategoriaCursosService } from './categoria-cursos.service';
import { CategoriaCursosController } from './categoria-cursos.controller';
import { CategoriaCurso } from './entities/categoria-curso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from 'src/cursos/entities/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaCurso, Curso])],
  controllers: [CategoriaCursosController],
  providers: [CategoriaCursosService],
})
export class CategoriaCursosModule {}
