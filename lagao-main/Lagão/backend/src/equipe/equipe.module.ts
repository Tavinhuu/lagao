import { Module } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeController } from './equipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipe } from './entities/equipe.entity';
import { Volume } from 'src/volume/entities/volume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipe, Volume])],
  controllers: [EquipeController],
  providers: [EquipeService],
})
export class EquipeModule {}