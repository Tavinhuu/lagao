import { Module } from '@nestjs/common';
import { ViagensService } from './viagens.service';
import { ViagensController } from './viagens.controller';
import { Viagem } from './entities/viagem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volume } from 'src/volume/entities/volume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viagem, Volume])],
  controllers: [ViagensController],
  providers: [ViagensService],
})
export class ViagensModule {}
