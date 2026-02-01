import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { Curso } from './entities/curso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volume } from 'src/volume/entities/volume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curso, Volume])],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
