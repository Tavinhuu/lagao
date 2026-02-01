import { Module } from '@nestjs/common';
import { CategoriaCursosService } from './categoria-cursos.service';
import { CategoriaCursosController } from './categoria-cursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaCurso } from './entities/categoria-curso.entity';
// 1. Importar a entidade Volume
import { Volume } from 'src/volume/entities/volume.entity'; 

@Module({
  // 2. Adicionar Volume dentro do array forFeature
  imports: [TypeOrmModule.forFeature([CategoriaCurso, Volume])], 
  controllers: [CategoriaCursosController],
  providers: [CategoriaCursosService],
})
export class CategoriaCursosModule {}