<template>
  <v-card 
    class="card-depoimento rounded-xl pa-5" 
    elevation="0"
    color="rgba(255, 255, 255, 0.03)"
    style="border: 1px solid rgba(255, 255, 255, 0.05);"
  >
    <v-row no-gutters class="align-start">
      
      <v-col cols="12" sm="auto" class="d-flex justify-center justify-sm-start mb-4 mb-sm-0 mr-sm-6">
        <v-avatar size="70" class="elevation-5">
          <v-img 
            :src="depoimento.volume && depoimento.volume.url ? depoimento.volume.url : '@/assets/avatar.png'" 
            alt="Foto"
            cover
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey" size="20"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-avatar>
      </v-col>

      <v-col class="text-center text-sm-left">
        
        <div class="mb-1">
          <v-rating 
            :value="depoimento.rating" 
            color="amber" 
            background-color="grey darken-2"
            dense 
            readonly 
            half-increments
            size="16" 
            class="d-inline-flex"
          ></v-rating>
        </div>

        <h3 class="white--text font-weight-black text-h6 mb-2" style="line-height: 1.2;">
          {{ depoimento.titulo }}
        </h3>

        <p class="grey--text text--lighten-1 text-body-2 mb-4" style="line-height: 1.5;">
          "{{ depoimento.texto }}"
        </p>

        <v-divider class="grey darken-3 mb-3"></v-divider>
        
        <div class="d-flex flex-wrap justify-space-between align-center">
          <span class="red--text font-weight-bold text-uppercase text-caption letter-spacing-1">
            {{ depoimento.nome }}
          </span>
          
          <span class="grey--text text--darken-1 text-caption font-italic">
            {{ depoimento.local || depoimento.data }}
          </span>
        </div>

      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CardDepoimentos",
  props: {
    depoimento: {
      type: Object,
      required: true,
      default: () => ({
        nome: "Aluno Lagão",
        rating: 5,
        titulo: "Experiência Incrível",
        texto: "Depoimento padrão...",
        volume: { url: "" }
      })
    }
  }
};
</script>

<style scoped>
.card-depoimento {
  width: 100%;
  transition: transform 0.3s ease;
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