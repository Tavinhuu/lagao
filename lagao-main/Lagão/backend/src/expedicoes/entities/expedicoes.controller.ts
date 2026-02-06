import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpedicoesService } from './expedicoes.service';
import { CreateExpedicaoDto } from './dto/create-expedicao.dto';
import { UpdateExpedicaoDto } from './dto/update-expedicao.dto';

@Controller('expedicoes')
export class ExpedicoesController {
  constructor(private readonly expedicoesService: ExpedicoesService) {}

  @Post()
  create(@Body() createExpedicaoDto: CreateExpedicaoDto) {
    return this.expedicoesService.create(createExpedicaoDto);
  }

  @Get()
  findAll() {
    return this.expedicoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Certifique-se de que o método findOne existe no seu Service
    return this.expedicoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpedicaoDto: UpdateExpedicaoDto) {
    return this.expedicoesService.update(+id, updateExpedicaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expedicoesService.remove(+id);
  }
}