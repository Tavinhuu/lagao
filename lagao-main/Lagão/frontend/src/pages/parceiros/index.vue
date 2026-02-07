<template>
  <div class="parceiros-wrapper">
    
    <v-container>
      <div class="text-center pt-10 mb-16">
        <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">
          CONEXÕES
        </h2>
        <h1 class="text-h4 text-md-h2 font-weight-black white--text text-uppercase mb-6">
          Nossos Parceiros
        </h1>
        <div class="mx-auto gradient-line"></div>
        <p class="grey--text text--lighten-1 mt-6 text-body-1" style="max-width: 800px; margin-left: auto; margin-right: auto;">
          Empresas e instituições que confiam no nosso trabalho e mergulham fundo com a gente.
        </p>
      </div>

      <div v-if="loading" class="text-center py-16">
        <v-progress-circular indeterminate color="#D32F2F" size="60"></v-progress-circular>
      </div>

      <v-row v-else justify="center">
        <v-col 
          v-for="parceiro in parceiros" 
          :key="parceiro.id"
          cols="12" sm="6" md="4" lg="3"
        >
          <v-hover v-slot="{ hover }">
            <v-card 
              color="#1a1a1a" 
              class="rounded-xl pa-6 h-100 d-flex flex-column align-center text-center elevation-6 transition-swing"
              :class="{ 'on-hover': hover }"
              :href="parceiro.link"
              target="_blank"
              style="text-decoration: none; border: 1px solid rgba(255,255,255,0.05);"
            >
              <v-avatar size="120" class="mb-6 grey lighten-2 elevation-4">
                <v-img 
                  :src="parceiro.logo && parceiro.logo[0] ? parceiro.logo[0].url : ''" 
                  alt="Logo"
                >
                    <template v-slot:placeholder>
                       <v-icon large color="grey">mdi-handshake</v-icon>
                    </template>
                </v-img>
              </v-avatar>
              
              <h3 class="white--text text-h6 font-weight-bold mb-2">{{ parceiro.nome }}</h3>
              
              <p 
  class="grey--text text--lighten-1 text-caption mb-0 flex-grow-1" 
  style="line-height: 1.6; white-space: pre-line;"
>
  {{ parceiro.descricao }}
</p>
              
              <v-btn 
                v-if="parceiro.link" 
                text 
                color="red" 
                small 
                class="mt-6 font-weight-bold"
              >
                Visitar Site <v-icon right small>mdi-open-in-new</v-icon>
              </v-btn>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <div v-if="!loading && parceiros.length === 0" class="text-center grey--text py-16">
        <v-icon size="60" color="grey darken-3" class="mb-4">mdi-account-search</v-icon>
        <p>Ainda não temos parceiros cadastrados.</p>
      </div>
    </v-container>
  </div>
</template>

<script>
import ParceirosService from '@/services/parceiros.service';

export default {
  name: "ParceirosPage",
  data() {
    return {
      loading: true,
      parceiros: []
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const response = await ParceirosService.getAll();
      this.parceiros = response.data || [];
    } catch (error) {
      console.error("Erro ao carregar parceiros:", error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.parceiros-wrapper {
  background-color: #121212;
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
  padding-bottom: 80px;
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

.transition-swing {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.on-hover {
  transform: translateY(-10px);
  border-color: #D32F2F !important;
  box-shadow: 0 10px 30px rgba(211, 47, 47, 0.15) !important;
}
</style>