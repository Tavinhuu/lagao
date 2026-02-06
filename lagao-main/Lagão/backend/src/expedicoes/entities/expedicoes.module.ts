import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpedicoesService } from './expedicoes.service';
import { ExpedicoesController } from './expedicoes.controller';
import { Volume } from 'src/volume/entities/volume.entity';
import { Expedicao } from './expedicao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expedicao, Volume])],
  controllers: [ExpedicoesController],
  providers: [ExpedicoesService],
})

export class ExpedicoesModule {}