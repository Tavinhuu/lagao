import { Module } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { Agenda } from './entities/agenda.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda])],
  controllers: [AgendaController],
  providers: [AgendaService],
})
export class AgendaModule {}
