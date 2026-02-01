<template>
  <div class="agenda-wrapper">
    
    <v-container class="pt-10 pt-md-16 pb-4 text-center">
      <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">
        PROGRAMAÇÃO
      </h2>
      <h1 class="text-h5 text-md-h2 font-weight-black white--text text-uppercase mb-4">
        Próximos Eventos
      </h1>
      <div class="mx-auto gradient-line mb-6"></div>
      <p class="grey--text text--lighten-1 mx-auto px-4" style="max-width: 600px;">
        Fique por dentro de tudo o que acontece na Lagão. Mergulhos, cursos teóricos, viagens e encontros da nossa tribo.
      </p>
    </v-container>

    <v-container class="pb-16 px-4 px-md-3">
      
      <div v-if="loading" class="text-center py-12">
        <v-progress-circular indeterminate color="#D32F2F" size="60"></v-progress-circular>
      </div>

      <div v-else-if="eventos.length === 0" class="text-center py-16 border-dashed rounded-xl mx-auto" style="max-width: 800px">
        <v-icon size="60" color="grey darken-3" class="mb-4">mdi-calendar-blank</v-icon>
        <h3 class="text-h6 grey--text">Nenhum evento agendado no momento.</h3>
        <p class="grey--text text--darken-1">Volte em breve para conferir as novidades!</p>
      </div>

      <v-timeline v-else :dense="$vuetify.breakpoint.smAndDown" class="custom-timeline">
        <v-timeline-item
          v-for="evento in eventos"
          :key="evento.id"
          color="#D32F2F"
          small
          fill-dot
        >
          <template v-slot:opposite v-if="$vuetify.breakpoint.mdAndUp">
            <span class="text-h5 font-weight-bold red--text text--lighten-1">
              {{ getDia(evento.data) }}
            </span>
            <div class="grey--text text-caption font-weight-bold text-uppercase">
              {{ getMes(evento.data) }} • {{ getHora(evento.data) }}
            </div>
          </template>

          <v-card class="elevation-10 rounded-lg event-card" dark color="#1E1E1E">
            <div class="d-flex flex-column flex-md-row">
              
              <div v-if="$vuetify.breakpoint.smAndDown" class="red darken-4 py-2 px-4 d-flex justify-space-between align-center">
                <span class="font-weight-bold white--text">
                  {{ getDia(evento.data) }}/{{ getMes(evento.data) }}
                </span>
                <span class="white--text text-caption">
                  <v-icon x-small color="white" class="mr-1">mdi-clock-outline</v-icon>
                  {{ getHora(evento.data) }}
                </span>
              </div>

              <div class="pa-4 pa-md-5 flex-grow-1">
                <div class="d-flex align-center mb-2">
                   <v-icon small color="grey" class="mr-2">mdi-map-marker</v-icon>
                   <span class="text-caption grey--text text--lighten-1 text-uppercase font-weight-bold">
                     {{ evento.local || 'Local a definir' }}
                   </span>
                </div>

                <h3 class="text-h6 text-md-h5 font-weight-bold mb-2 text-uppercase">
                  {{ evento.titulo }}
                </h3>

                <p class="grey--text text--lighten-1 text-body-2 mb-0" style="line-height: 1.6;">
                  {{ evento.descricao || 'Sem descrição adicional.' }}
                </p>
              </div>
            </div>
          </v-card>
        </v-timeline-item>
      </v-timeline>

    </v-container>
  </div>
</template>

<script>
import AgendaService from '@/services/agenda.service';

export default {
  name: "PaginaAgenda",
  data() {
    return {
      loading: true,
      eventos: []
    };
  },
  methods: {
    async carregarAgenda() {
      this.loading = true;
      try {
        const resposta = await AgendaService.getAll();
        // Ordena por data (mais próximo primeiro)
        this.eventos = resposta.sort((a, b) => new Date(a.data) - new Date(b.data));
      } catch (error) {
        console.error("Erro ao carregar agenda:", error);
      } finally {
        this.loading = false;
      }
    },
    getDia(dataIso) {
      if (!dataIso) return '';
      return new Date(dataIso).getDate().toString().padStart(2, '0');
    },
    getMes(dataIso) {
      if (!dataIso) return '';
      return new Date(dataIso).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
    },
    getHora(dataIso) {
      if (!dataIso) return '';
      return new Date(dataIso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
  },
  mounted() {
    this.carregarAgenda();
  }
};
</script>

<style scoped>
.agenda-wrapper {
  background-color: #121212;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.tracking-widest {
  letter-spacing: 3px !important;
}

.gradient-line {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #D32F2F 0%, #ff7961 100%);
  border-radius: 4px;
}

.border-dashed {
  border: 1px dashed rgba(255,255,255,0.2);
}

.event-card {
  border: 1px solid rgba(255,255,255,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.4) !important;
  border-color: #D32F2F;
}

/* Ajustes da Timeline para Mobile */
::v-deep .v-timeline:before {
  background: rgba(255,255,255,0.1);
}

/* No mobile, ajusta a margem para caber melhor na tela */
@media (max-width: 600px) {
  .custom-timeline {
    padding-left: 0 !important;
  }
}
</style>