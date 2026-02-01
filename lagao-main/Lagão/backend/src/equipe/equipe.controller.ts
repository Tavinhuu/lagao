import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { CreateEquipeDto } from './dto/create-equipe.dto';

@Controller('equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Post()
  create(@Body() createDto: CreateEquipeDto) {
    return this.equipeService.create(createDto);
  }

  @Get()
  findAll() {
    return this.equipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: CreateEquipeDto) {
    return this.equipeService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipeService.remove(+id);
  }
}