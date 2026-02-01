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

          <p class="text-h6 font-weight-regular grey--text text--lighten-2 text-center mb-10" style="line-height: 1.6;">
            {{ dados.descricao }}
          </p>

          <div class="text-content grey--text text--lighten-1 text-body-1">
            <div v-html="dados.texto"></div>
          </div>

        </v-col>
      </v-row>
    </v-container>

    <section class="mt-16 py-16 team-section">
      <v-container>
        <div class="text-center mb-12">
          <v-icon size="40" color="#D32F2F" class="mb-4">mdi-account-group</v-icon>
          <h2 class="text-h4 font-weight-black white--text text-uppercase">
            Nossa Equipe
          </h2>
          <p class="grey--text mt-2">Conheça os especialistas que guiarão sua jornada</p>
        </div>

        <v-row justify="center">
          <v-col 
            v-for="instrutor in instrutores" 
            :key="instrutor.id" 
            cols="12" 
            md="10" 
            lg="9"
            class="mb-4"
          >
            <CardInstrutor :instrutor="instrutor"></CardInstrutor>
          </v-col>
        </v-row>
      </v-container>
    </section>

  </div>
</template>

<script>
import { quemSomos } from "../../mock/quemsomos";
import CardInstrutor from "./CardInstrutor.vue";
import { instrutores } from "../../mock/Instrutor";

export default {
  name: "QuemSomos",
  components: {
    CardInstrutor
  },
  data() {
    return {
      dados: quemSomos,
      instrutores
    };
  }
};
</script>

<style scoped>
/* Layout Base */
.quem-somos-wrapper {
  background-color: #121212;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

/* Tipografia e Espaçamento */
.tracking-widest {
  letter-spacing: 3px !important;
}

/* Linha decorativa abaixo do título */
.gradient-line {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #D32F2F 0%, #ff7961 100%);
  border-radius: 4px;
}

/* Estilo do conteúdo HTML vindo do mock */
.text-content {
  line-height: 1.8;
  text-align: justify;
}

/* Ajustes para parágrafos dentro do v-html */
.text-content >>> p {
  margin-bottom: 24px;
}

/* Seção da Equipe com fundo sutilmente diferente */
.team-section {
  background-color: #0d0d0d; /* Um pouco mais escuro para diferenciar */
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
</style>