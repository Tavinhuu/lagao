import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHomePageDto } from './dto/create-home-page.dto';
import { UpdateHomePageDto } from './dto/update-home-page.dto';
import { HomePage } from './entities/home-page.entity';

@Injectable()
export class HomePageService {
  constructor(
    @InjectRepository(HomePage)
    private homePageRepository: Repository<HomePage>,
  ) {}

  async create(createHomePageDto: CreateHomePageDto) {

    const homePage = this.homePageRepository.create({
      titulo: createHomePageDto.titulo,
      subTitulo: createHomePageDto.subTitulo,
      textoBotao: createHomePageDto.textoBotao,
      volume: {
        url: createHomePageDto.url,
        type: 'image'
      }
    });

    return await this.homePageRepository.save(homePage);
  }

  async findAll() {
    return await this.homePageRepository.find({
      order: { id: 'DESC' }
    });
  }

  findOne(id: number) {
    return this.homePageRepository.findOne({ where: { id } });
  }

  update(id: number, updateHomePageDto: UpdateHomePageDto) {
    return this.homePageRepository.update(id, updateHomePageDto);
  }

  async remove(id: number) {
    return await this.homePageRepository.delete(id);
  }
}