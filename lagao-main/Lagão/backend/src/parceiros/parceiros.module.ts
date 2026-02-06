import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParceirosService } from './parceiros.service';
import { ParceirosController } from './parceiros.controller';
import { Parceiro } from './entities/parceiro.entity';
import { Volume } from 'src/volume/entities/volume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parceiro, Volume])],
  controllers: [ParceirosController],
  providers: [ParceirosService],
})
export class ParceirosModule {}