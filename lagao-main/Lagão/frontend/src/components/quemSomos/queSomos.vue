<template>
  <div class="quem-somos-wrapper">
    
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          
          <div class="text-center pt-10 mb-10">
            <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">
              NOSSA HISTÓRIA
            </h2>
            <h1 class="text-h4 text-md-h2 font-weight-black white--text text-uppercase mb-6">
              {{ dados.titulo || 'Quem Somos' }}
            </h1>
            <div class="mx-auto gradient-line"></div>
          </div>

          <div 
            class="grey--text text--lighten-1 text-body-1 text-justify mb-10" 
            style="line-height: 1.8;"
            v-html="dados.texto"
          ></div>

        </v-col>
      </v-row>
    </v-container>

    <div class="team-section py-16" style="background-color: #050505; position: relative;">
      <div class="bg-pattern"></div>
      
      <v-container class="position-relative z-index-2">
        <div class="text-center mb-16">
          <v-icon size="40" color="#D32F2F" class="mb-4">mdi-account-group</v-icon>
          <h2 class="text-h4 text-md-h3 font-weight-black white--text text-uppercase">
            Nossa Equipe
          </h2>
          <p class="grey--text text--darken-1 mt-2">Profissionais apaixonados pelo que fazem</p>
        </div>

        <div v-if="loading" class="text-center py-10">
           <v-progress-circular indeterminate color="#D32F2F" size="60"></v-progress-circular>
        </div>

        <v-row v-else justify="center">
           <v-col 
             v-for="(membro, index) in equipe" 
             :key="membro.id || index" 
             cols="12" 
             class="mb-6"
           >
              <CardInstrutor :instrutor="membro" />
           </v-col>
        </v-row>
        
        <p v-if="!loading && equipe.length === 0" class="text-center grey--text">
           Nenhum membro da equipe encontrado. Adicione pelo painel Admin!
        </p>

      </v-container>
    </div>

  </div>
</template>

<script>
// Importa o Mock antigo para o texto
import { quemSomos } from "@/mock/quemsomos";
// Importa o Service novo para a equipe
import EquipeService from '@/services/equipe.service';
import CardInstrutor from './CardInstrutor.vue';

export default {
  name: "QueSomosComponent",
  components: { CardInstrutor },
  data() {
    return {
      loading: true,
      dados: quemSomos, // Texto estático (História)
      equipe: []        // Dados dinâmicos (Pessoas)
    };
  },
  async mounted() {
    this.loading = true;
    try {
      // Busca a equipe do banco de dados
      const response = await EquipeService.getAll();
      this.equipe = response || [];
    } catch (error) {
      console.error("Erro ao carregar equipe:", error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.quem-somos-wrapper {
  background-color: #121212;
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
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

.bg-pattern {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0.03;
  background-image: radial-gradient(#ffffff 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

.z-index-2 {
  position: relative;
  z-index: 2;
}

/* Estilos para o HTML injetado (v-html) */
::v-deep .quem-somos-wrapper h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

::v-deep .quem-somos-wrapper p {
  margin-bottom: 1.5rem;
}

::v-deep .quem-somos-wrapper strong {
  color: #D32F2F;
}
</style>