import { Module } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { VolumeController } from './volume.controller';
import { Volume } from './entities/volume.entity';
import { Curso } from 'src/cursos/entities/curso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Volume, Curso])],
  controllers: [VolumeController],
  providers: [VolumeService],
})
export class VolumeModule {}
