import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from './entities/loja.entity';
import { Volume } from 'src/volume/entities/volume.entity';
import { LojaController } from './entities/loja.controller';
import { LojaService } from './entities/loja.service';

@Module({
  imports: [TypeOrmModule.forFeature([Loja, Volume])],
  controllers: [LojaController],
  providers: [LojaService],
})
export class LojaModule {}