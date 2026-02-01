<template>
  <div class="viagens-page">
    <v-container class="py-10 py-md-16">
      
      <div class="text-center mb-12">
        <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">
          EXPLORE O MUNDO
        </h2>
        <h1 class="text-h4 text-md-h2 font-weight-black white--text text-uppercase">
          Próximas Expedições
        </h1>
        <div class="mx-auto mt-4 gradient-line"></div>
      </div>

      <div v-if="loading" class="text-center py-16">
        <v-progress-circular indeterminate color="#D32F2F" size="60"></v-progress-circular>
        <p class="grey--text mt-4">Carregando destinos...</p>
      </div>

      <div v-else>
        <v-row justify="center" v-if="viagens.length > 0">
          <v-col 
            v-for="viagem in viagensPaginadas" 
            :key="viagem.id" 
            cols="12" 
            md="10" 
            lg="9" 
            class="mb-6"
          >
            <CardViagens :viagens="viagem"></CardViagens>
          </v-col>
        </v-row>

        <div v-else class="text-center py-16 border-dashed rounded-xl mx-auto" style="max-width: 600px;">
          <v-icon size="64" color="grey darken-3" class="mb-4">mdi-map-search-outline</v-icon>
          <h3 class="text-h5 white--text font-weight-bold mb-2">Nenhuma viagem encontrada</h3>
          <p class="grey--text">Estamos planejando novas aventuras. Fique ligado!</p>
        </div>

        <div class="text-center mt-10" v-if="viagens.length > viagensPorPagina">
          <v-pagination
            v-model="paginaAtual"
            :length="totalPaginas"
            color="#D32F2F"
            circle
            dark
            class="custom-pagination"
            @input="scrollTop"
          ></v-pagination>
        </div>
      </div>

    </v-container>
  </div>
</template>

<script>
import CardViagens from './CardViagens.vue';
import viagensService from '@/services/viagens.service';

export default {
  name: "NossasViagens",
  components: {
    CardViagens
  },
  data() {
    return {
      loading: true,
      viagens: [],
      paginaAtual: 1,
      viagensPorPagina: 4 // Aumentei um pouco para aproveitar telas grandes
    };
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.viagens.length / this.viagensPorPagina);
    },
    viagensPaginadas() {
      const inicio = (this.paginaAtual - 1) * this.viagensPorPagina;
      const fim = inicio + this.viagensPorPagina;
      return this.viagens.slice(inicio, fim);
    }
  },
  methods: {
    async pegarViagens() {
      try {
        this.loading = true;
        this.viagens = await viagensService.getViagens();
      } catch (error) {
        console.error("Erro ao buscar viagens:", error);
      } finally {
        this.loading = false;
      }
    },
    // Rola para o topo suavemente ao mudar de página
    scrollTop() {
      this.$vuetify.goTo(0);
    }
  },
  mounted() {
    this.pegarViagens();
  }
}
</script>

<style scoped>
.viagens-page {
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
  border: 2px dashed rgba(255, 255, 255, 0.1);
}

/* Customização da Paginação Dark */
::v-deep .v-pagination__item {
  background-color: #1E1E1E !important;
  border: 1px solid rgba(255,255,255,0.1);
  color: white !important;
}

::v-deep .v-pagination__item--active {
  background-color: #D32F2F !important;
  border-color: #D32F2F;
  box-shadow: 0 0 10px rgba(211, 47, 47, 0.5);
}

::v-deep .v-pagination__navigation {
  background-color: #1E1E1E !important;
}
</style>