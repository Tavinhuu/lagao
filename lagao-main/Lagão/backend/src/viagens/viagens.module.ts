import { Module } from '@nestjs/common';
import { ViagensService } from './viagens.service';
import { ViagensController } from './viagens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viagem } from './entities/viagem.entity';
import { Volume } from 'src/volume/entities/volume.entity'; // <--- Importe isto

@Module({
  imports: [TypeOrmModule.forFeature([Viagem, Volume])], // <--- Adicione Volume aqui
  controllers: [ViagensController],
  providers: [ViagensService],
})
export class ViagensModule {}