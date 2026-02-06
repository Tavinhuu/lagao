import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';

@Controller('loja')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Get()
  getDados() {
    return this.lojaService.findOne();
  }

  @Patch()
  update(@Body() dto: CreateLojaDto) {
    return this.lojaService.update(dto);
  }

  @Post('foto')
  addFoto(@Body('url') url: string) {
    return this.lojaService.addFoto(url);
  }

  @Delete('foto/:id')
  removeFoto(@Param('id') id: string) {
    return this.lojaService.removeFoto(+id);
  }
}