import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaCursosService } from './categoria-cursos.service';
import { CreateCategoriaCursoDto } from './dto/create-categoria-curso.dto';
import { UpdateCategoriaCursoDto } from './dto/update-categoria-curso.dto';

@Controller('categoria-cursos')
export class CategoriaCursosController {
  constructor(private readonly categoriaCursosService: CategoriaCursosService) {}

  @Post()
  create(@Body() createCategoriaCursoDto: CreateCategoriaCursoDto) {
    return this.categoriaCursosService.create(createCategoriaCursoDto);
  }

  @Get()
  findAll() {
    return this.categoriaCursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaCursosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaCursoDto: UpdateCategoriaCursoDto) {
    return this.categoriaCursosService.update(+id, updateCategoriaCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaCursosService.remove(+id);
  }
}
