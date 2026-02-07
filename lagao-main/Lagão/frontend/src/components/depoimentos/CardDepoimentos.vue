<template>
  <v-card
    class="card-depoimento rounded-xl pa-6 mx-auto"
    color="rgba(255, 255, 255, 0.03)"
    style="border: 1px solid rgba(255,255,255,0.05); max-width: 900px;"
  >
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" class="d-flex justify-center">
        <v-avatar size="120" class="elevation-5">
          <img
            :src="depoimento.foto || '/assets/avatar.png'"
            alt="Foto do aluno"
            style="object-fit: cover;"
          >
        </v-avatar>
      </v-col>

      <v-col cols="12" md="8" class="text-center text-md-left">
        <div class="d-flex justify-center justify-md-start mb-2">
          <v-rating
            :value="5"
            color="amber"
            dense
            half-increments
            readonly
            size="18"
          ></v-rating>
        </div>

        <h3 class="white--text text-h6 font-weight-bold mb-2">
          {{ depoimento.titulo || 'Experiência Incrível' }}
        </h3>
        
        <p class="grey--text text--lighten-1 text-body-1 font-italic mb-4" style="line-height: 1.6;">
          "{{ depoimento.texto }}"
        </p>

        <v-divider class="grey darken-3 mb-4"></v-divider>

        <div class="d-flex flex-column flex-md-row align-center justify-center justify-md-start">
          <span class="red--text text--lighten-1 font-weight-bold text-uppercase tracking-widest mr-md-4 mb-1 mb-md-0">
            {{ depoimento.nome }}
          </span>
          <span class="grey--text text-caption" v-if="depoimento.data || depoimento.local">
            <v-icon x-small color="grey" class="mr-1">mdi-map-marker</v-icon>
            {{ depoimento.local || 'Brasília, DF' }} • {{ depoimento.data }}
          </span>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'CardDepoimentos',
  props: {
    depoimento: {
      type: Object,
      required: true,
      default: () => ({
        foto: '',
        nome: 'Aluno Lagão',
        texto: 'Depoimento incrível...',
        local: '',
        data: ''
      })
    }
  }
}
</script>

<style scoped>
.card-depoimento {
  width: 100%;
  max-width: 100%; /* Garante que nunca exceda o pai */
  transition: transform 0.3s ease;
  margin: 0 auto;  /* Centraliza se sobrar espaço */
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

/* Ajuste fino para mobile */
@media (max-width: 600px) {
  .card-depoimento {
    text-align: center !important;
  }
}
</style>