import { Module } from '@nestjs/common';
import { DepoimentosService } from './depoimentos.service';
import { DepoimentosController } from './depoimentos.controller';
import { Depoimento } from './entities/depoimento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volume } from 'src/volume/entities/volume.entity'; // <--- Importe isto

@Module({
  imports: [TypeOrmModule.forFeature([Depoimento, Volume])], // <--- Adicione Volume
  controllers: [DepoimentosController],
  providers: [DepoimentosService],
})
export class DepoimentosModule {}