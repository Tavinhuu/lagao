import { Module } from '@nestjs/common';
import { DepoimentosService } from './depoimentos.service';
import { DepoimentosController } from './depoimentos.controller';
import { Depoimento } from './entities/depoimento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Depoimento])],
  controllers: [DepoimentosController],
  providers: [DepoimentosService],
})
export class DepoimentosModule {}
