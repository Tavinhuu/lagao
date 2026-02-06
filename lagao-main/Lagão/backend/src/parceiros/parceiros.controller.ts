import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ParceirosService } from './parceiros.service';
import { CreateParceiroDto } from './entities/dto/create-parceiro.dto';

@Controller('parceiros')
export class ParceirosController {
  constructor(private readonly service: ParceirosService) {}

  @Post()
  create(@Body() dto: CreateParceiroDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}