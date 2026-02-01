import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agenda } from './entities/agenda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda) private repo: Repository<Agenda>
  ) {}

  async create(createDto: CreateAgendaDto) {
    const { cursoId, viagemId, data, titulo, descricao, local } = createDto;

    const agenda = this.repo.create({
      data,
      titulo,
      descricao,
      local,
      curso: cursoId ? { id: cursoId } : null,
      viagem: viagemId ? { id: viagemId } : null
    } as any);

    return await this.repo.save(agenda);
  }

  async findAll() {
    return await this.repo.find({
      relations: ['curso', 'viagem'],
      order: { data: 'ASC' }
    });
  }

  async findOne(id: number) {
    const agenda = await this.repo.findOne({ where: { id }, relations: ['curso', 'viagem'] });
    if (!agenda) throw new NotFoundException(`Agendamento ${id} não encontrado`);
    return agenda;
  }

  async update(id: number, updateDto: any) {
    const { cursoId, viagemId, data, titulo, descricao, local } = updateDto;

    const agenda = await this.repo.preload({
      id,
      data,
      titulo,
      descricao,
      local,
      curso: cursoId ? { id: cursoId } : (cursoId === null ? null : undefined),
      viagem: viagemId ? { id: viagemId } : (viagemId === null ? null : undefined)
    } as any);

    if (!agenda) throw new NotFoundException(`Agendamento ${id} não encontrado`);

    return await this.repo.save(agenda);
  }

  async remove(id: number) {
    const agenda = await this.findOne(id);
    return await this.repo.remove(agenda);
  }
}