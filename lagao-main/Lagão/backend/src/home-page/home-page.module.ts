import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importar isso
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import { HomePage } from './entities/home-page.entity'; // Importar a entidade

@Module({
  imports: [TypeOrmModule.forFeature([HomePage])], // Registrar a entidade aqui
  controllers: [HomePageController],
  providers: [HomePageService],
})
export class HomePageModule {}