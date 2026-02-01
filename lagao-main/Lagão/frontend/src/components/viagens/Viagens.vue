<template>
  <div class="viagens-wrapper">
    <v-container class="py-16">
      <div class="text-center mb-16">
        <h2 class="text-overline red--text font-weight-bold tracking-widest mb-2">
          NOSSO PORTFÓLIO
        </h2>
        <h1 class="text-h4 text-md-h2 white--text font-weight-black text-uppercase">
          Destinos Explorados
        </h1>
        <div class="mx-auto mt-4 gradient-line"></div>
        <p class="grey--text text--lighten-1 mt-6 mx-auto" style="max-width: 700px; font-size: 1.1rem;">
          Confira as expedições incríveis que já realizamos. Cada viagem é uma história única de superação, beleza e amizade.
        </p>
      </div>

      <div v-if="loading" class="text-center py-10">
        <v-progress-circular indeterminate color="#D32F2F" size="60"></v-progress-circular>
      </div>

      <div v-else-if="viagens.length === 0" class="text-center py-10">
        <v-icon size="60" color="grey darken-3">mdi-image-filter-hdr</v-icon>
        <p class="grey--text mt-4">Nenhuma viagem registrada ainda.</p>
      </div>

      <v-row v-else>
        <v-col 
          v-for="viagem in viagens" 
          :key="viagem.id"
          cols="12" sm="6" md="4"
        >
          <CardViagens :viagem="viagem" />
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import ViagensService from '@/services/viagens.service';
import CardViagens from './CardViagens.vue';

export default {
  name: "ListaViagens",
  components: {
    CardViagens
  },
  data() {
    return {
      viagens: [],
      loading: true
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const response = await ViagensService.getAll();
      this.viagens = response.data;
      
      // Ordenar por data (mais recente primeiro) se o backend não ordenar
      this.viagens.sort((a, b) => new Date(b.inicioViagem) - new Date(a.inicioViagem));
      
    } catch (error) {
      console.error("Erro ao buscar viagens:", error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.viagens-wrapper {
  background-color: #121212;
  min-height: 100vh;
}
.tracking-widest {
  letter-spacing: 3px !important;
}
.gradient-line {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #D32F2F 0%, #ff7961 100%);
  border-radius: 4px;
}
</style>