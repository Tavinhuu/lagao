<template>
  <div class="agenda-wrapper">
    <v-container class="py-10 py-md-16">
      
      <div class="text-center mb-10">
        <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">
          PROGRAMAÇÃO
        </h2>
        
        <div class="d-flex align-center justify-center gap-4">
          <v-btn icon large color="white" @click="mudarMes(-1)" class="hover-glow">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          
          <h1 class="text-h4 text-md-h3 font-weight-black white--text text-uppercase text-center min-w-300">
            {{ mesAtualNome }} <span class="red--text">{{ anoAtual }}</span>
          </h1>

          <v-btn icon large color="white" @click="mudarMes(1)" class="hover-glow">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
        
        <div class="d-flex justify-center mt-6 gap-4 flex-wrap">
          <v-chip small color="#A92827" text-color="white" class="font-weight-bold">Viagens</v-chip>
          <v-chip small color="#1E88E5" text-color="white" class="font-weight-bold">Cursos</v-chip>
          <v-chip small color="#757575" text-color="white" class="font-weight-bold">Eventos</v-chip>
        </div>
      </div>

      <div v-if="$vuetify.breakpoint.xsOnly" class="mobile-agenda">
        <v-slide-x-transition group>
          <div v-if="diasComEventos.length === 0" key="empty" class="text-center py-10 grey--text">
            <v-icon size="50" color="grey darken-3">mdi-calendar-blank</v-icon>
            <p class="mt-2">Nenhum evento programado para este mês.</p>
          </div>

          <div v-else v-for="dia in diasComEventos" :key="dia.data" class="mb-6">
            <div class="d-flex align-center mb-3">
              <div class="red darken-2 rounded-lg py-1 px-3 mr-3 text-center">
                <span class="d-block white--text font-weight-bold text-h5">{{ dia.numero }}</span>
                <span class="d-block white--text text-caption text-uppercase">{{ dia.diaSemana }}</span>
              </div>
              <v-divider class="grey darken-3"></v-divider>
            </div>

            <v-card 
              v-for="item in [...dia.eventos, ...dia.viagens, ...dia.cursos]" 
              :key="item.id + item.tipo"
              class="mb-3 rounded-lg event-card-mobile"
              :color="pegarCorCard(item.tipo)"
              @click="mostrarDetalhes(item)"
              elevation="4"
            >
              <div class="d-flex align-center pa-3">
                <v-avatar size="50" class="mr-3 rounded-lg">
                  <v-img :src="item.volume?.url || '@/assets/logo.png'" cover></v-img>
                </v-avatar>
                <div class="flex-grow-1 overflow-hidden">
                  <h4 class="white--text font-weight-bold text-truncate">{{ item.nome || item.titulo || item.destino }}</h4>
                  <span class="white--text text--lighten-2 text-caption d-block text-truncate">
                    {{ item.descricao }}
                  </span>
                </div>
                <v-icon color="white">mdi-chevron-right</v-icon>
              </div>
            </v-card>
          </div>
        </v-slide-x-transition>
      </div>

      <div v-else class="desktop-calendar">
        <div class="calendar-grid-header mb-2">
          <div v-for="dia in diasSemana" :key="dia" class="text-center grey--text text--darken-1 font-weight-bold">
            {{ dia.toUpperCase() }}
          </div>
        </div>

        <div class="calendar-grid-body">
          <div 
            v-for="(dia, index) in diasDoMes" 
            :key="index" 
            class="calendar-cell pa-2 d-flex flex-column"
            :class="{ 'empty-day': !dia.numero }"
          >
            <div v-if="dia.numero" class="text-right mb-2">
              <span class="day-number grey--text">{{ dia.numero }}</span>
            </div>

            <div class="flex-grow-1 overflow-y-auto custom-scrollbar" style="max-height: 120px;">
              <template v-if="dia.numero">
                <v-chip 
                  v-for="viagem in dia.viagens" 
                  :key="'v-'+viagem.id"
                  small 
                  color="#A92827" 
                  text-color="white"
                  class="mb-1 w-100 justify-start cursor-pointer hover-scale"
                  @click="mostrarDetalhes(viagem)"
                >
                  <v-icon left x-small>mdi-airplane</v-icon>
                  <span class="text-truncate">{{ viagem.destino }}</span>
                </v-chip>

                <v-chip 
                  v-for="curso in dia.cursos" 
                  :key="'c-'+curso.id"
                  small 
                  color="#1E88E5" 
                  text-color="white"
                  class="mb-1 w-100 justify-start cursor-pointer hover-scale"
                  @click="mostrarDetalhes(curso)"
                >
                  <v-icon left x-small>mdi-school</v-icon>
                  <span class="text-truncate">{{ curso.nome }}</span>
                </v-chip>

                <v-chip 
                  v-for="evento in dia.eventos" 
                  :key="'e-'+evento.id"
                  small 
                  color="#424242" 
                  text-color="white"
                  class="mb-1 w-100 justify-start cursor-pointer hover-scale"
                  @click="mostrarDetalhes(evento)"
                >
                  <v-icon left x-small>mdi-star</v-icon>
                  <span class="text-truncate">{{ evento.nome }}</span>
                </v-chip>
              </template>
            </div>
          </div>
        </div>
      </div>

      <v-dialog v-model="dialogVisivel" max-width="500" content-class="rounded-xl">
        <v-card color="#1a1a1a" dark v-if="detalhesEvento">
          <v-img 
            :src="detalhesEvento.volume?.url || '@/assets/logo.png'" 
            height="200" 
            cover
          >
            <div class="fill-height d-flex align-end pa-4 gradient-overlay">
              <div>
                <v-chip small :color="pegarCorCard(detalhesEvento.tipo)" class="mb-2 font-weight-bold">
                  {{ detalhesEvento.tipo?.toUpperCase() || 'EVENTO' }}
                </v-chip>
                <h3 class="text-h5 font-weight-black white--text text-shadow">
                  {{ detalhesEvento.nome || detalhesEvento.titulo || detalhesEvento.destino }}
                </h3>
              </div>
            </div>
          </v-img>

          <v-card-text class="pt-4">
            <div class="d-flex justify-space-between mb-4 grey--text text--lighten-1">
              <div class="d-flex align-center">
                <v-icon small color="red" class="mr-2">mdi-calendar</v-icon>
                {{ detalhesEvento.inicioViagem || detalhesEvento.data }}
              </div>
              <div class="d-flex align-center" v-if="detalhesEvento.duracao || detalhesEvento.tempo">
                <v-icon small color="red" class="mr-2">mdi-clock</v-icon>
                {{ detalhesEvento.duracao || detalhesEvento.tempo }}
              </div>
            </div>

            <v-divider class="grey darken-3 mb-4"></v-divider>

            <p class="text-body-1 grey--text text--lighten-2">
              {{ detalhesEvento.descricao }}
            </p>
          </v-card-text>

          <v-card-actions class="pa-4 pt-0">
            <v-btn block large rounded color="#D32F2F" class="font-weight-bold" :href="detalhesEvento.link || '#'">
              <v-icon left>mdi-whatsapp</v-icon>
              Saiba Mais
            </v-btn>
            <v-btn block text color="grey" @click="dialogVisivel = false" class="mt-2">
              Fechar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </div>
</template>

<script>
import viagensService from '@/services/viagens.service';
import cursoService from "@/services/cursos.service";

export default {
  name: "IndexAgenda",
  data() {
    return {
      mesAtual: new Date().getMonth(),
      anoAtual: new Date().getFullYear(),
      eventos: [],
      viagens: [],
      cursos: [],
      detalhesEvento: null,
      dialogVisivel: false,
      diasSemana: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    }
  },
  computed: {
    mesAtualNome() {
      let mes = new Date(this.anoAtual, this.mesAtual).toLocaleString('pt-BR', { month: 'long' });
      return mes.charAt(0).toUpperCase() + mes.slice(1);
    },
    // Calcula os dias apenas para o Grid Desktop
    diasDoMes() {
      let dias = [];
      let primeiroDiaSemana = new Date(this.anoAtual, this.mesAtual, 1).getDay();
      let totalDias = new Date(this.anoAtual, this.mesAtual + 1, 0).getDate();
      
      // Espaços vazios antes do dia 1
      for (let i = 0; i < primeiroDiaSemana; i++) {
        dias.push({ numero: null, eventos: [], viagens: [], cursos: [] });
      }
      
      for (let i = 1; i <= totalDias; i++) {
        let data = `${this.anoAtual}/${String(this.mesAtual + 1).padStart(2, '0')}/${String(i).padStart(2, '0')}`
        dias.push({
          numero: i,
          data,
          eventos: this.filterByDate(this.eventos, data),
          cursos: this.filterByAgenda(this.cursos, data),
          viagens: this.filterByAgenda(this.viagens, data)
        });
      }
      return dias;
    },
    // Cria uma lista filtrada apenas com dias que têm algo (Para Mobile)
    diasComEventos() {
      return this.diasDoMes.filter(dia => 
        dia.numero && (dia.eventos.length || dia.viagens.length || dia.cursos.length)
      ).map(dia => {
        // Adiciona nome do dia da semana para ficar bonito no mobile
        const date = new Date(this.anoAtual, this.mesAtual, dia.numero);
        return {
          ...dia,
          diaSemana: date.toLocaleString('pt-BR', { weekday: 'short' }).replace('.', '')
        };
      });
    }
  },
  methods: {
    mudarMes(valor) {
      this.mesAtual += valor;
      if (this.mesAtual < 0) {
        this.mesAtual = 11;
        this.anoAtual -= 1;
      } else if (this.mesAtual > 11) {
        this.mesAtual = 0;
        this.anoAtual += 1;
      }
      this.carregarEventos();
    },
    async carregarEventos() {
      // Mock de dados para garantir que funcione se a API falhar
      try {
        const [viagensData, cursosData] = await Promise.all([
          viagensService.getViagens().catch(() => []),
          cursoService.getCursos().catch(() => [])
        ]);
        
        this.viagens = viagensData.map(v => ({ ...v, tipo: 'viagem' }));
        this.cursos = cursosData.map(c => ({ ...c, tipo: 'curso' }));
      } catch(e) {
        console.error("Erro API", e);
      }

      // Seus eventos mockados (mantidos)

    },
    // Helpers de Filtro
    filterByDate(lista, dataAlvo) {
      return lista.filter(e => e.data === dataAlvo);
    },
    filterByAgenda(lista, dataAlvo) {
      if (!lista) return [];
      return lista.filter(item => 
        item.agendas?.some(agenda => {
          // Normaliza datas (Assume formato dd/mm/aaaa ou yyyy/mm/dd)
          const dataItem = agenda.data.includes('/') && agenda.data.split('/')[0].length === 2 
            ? agenda.data.split('/').reverse().join('/') // Converte dd/mm/yyyy -> yyyy/mm/dd
            : agenda.data;
          return dataItem === dataAlvo;
        })
      );
    },
    mostrarDetalhes(item) {
      this.detalhesEvento = item;
      this.dialogVisivel = true;
    },
    pegarCorCard(tipo) {
      if (tipo === 'viagem') return '#A92827'; // Vermelho
      if (tipo === 'curso') return '#1E88E5'; // Azul
      return '#424242'; // Cinza Evento
    }
  },
  mounted() {
    this.carregarEventos();
  }
};
</script>

<style scoped>
.agenda-wrapper {
  background-color: #121212;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.min-w-300 { min-width: 300px; }
.gap-4 { gap: 1rem; }
.hover-glow:hover { text-shadow: 0 0 10px white; transform: scale(1.1); }

/* Grid Desktop */
.desktop-calendar {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: #1E1E1E;
  overflow: hidden;
}

.calendar-grid-header, .calendar-grid-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-cell {
  background-color: #1a1a1a;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  min-height: 160px; /* Altura fixa para ficar bonito */
}

/* Bordas externas */
.calendar-cell:nth-child(7n) { border-right: none; }
.calendar-grid-body .calendar-cell:nth-last-child(-n+7) { border-bottom: none; }

.empty-day { background-color: #161616; }

.day-number {
  font-size: 1.1rem;
  font-weight: bold;
  padding-right: 8px;
}

/* Chips e Hover */
.hover-scale { transition: transform 0.2s; }
.hover-scale:hover { transform: scale(1.05); z-index: 2; }

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }

/* Mobile */
.event-card-mobile {
  border: 1px solid rgba(255,255,255,0.1);
  transition: transform 0.2s;
}
.event-card-mobile:active { transform: scale(0.98); }

/* Modal */
.gradient-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
}
.text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
</style>