import { Module } from '@nestjs/common';
import { CursosModule } from './cursos/cursos.module';
import { CategoriaCursosModule } from './categoria-cursos/categoria-cursos.module';
import { VolumeModule } from './volume/volume.module';
import { ViagensModule } from './viagens/viagens.module';
import { DepoimentosModule } from './depoimentos/depoimentos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomePageModule } from './home-page/home-page.module';
import { AgendaModule } from './agenda/agenda.module';
import { EquipeModule } from './equipe/equipe.module';
import { AuthModule } from './auth/auth.module';
import { YoutubeModule } from './youtube/youtube.module';
import { ExpedicoesModule } from './expedicoes/entities/expedicoes.module';
import { LojaModule } from './loja/loja.module';
import { ParceirosModule } from './parceiros/parceiros.module';

@Module({
  imports: [CursosModule, CategoriaCursosModule, VolumeModule, ViagensModule, ParceirosModule, DepoimentosModule,YoutubeModule, HomePageModule, LojaModule, EquipeModule,ExpedicoesModule, AuthModule, AgendaModule,
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: '82.29.62.101',
      port: 5432,
      username: 'lagao',
      password: 'gm{s6X_gm398',
      database: 'lagao',
      schema: 'public',
      entities: ['./*/*.entity.ts'],
      synchronize: true,
      autoLoadEntities: true,
      logging:true
    })
  ],
})
export class AppModule {}
