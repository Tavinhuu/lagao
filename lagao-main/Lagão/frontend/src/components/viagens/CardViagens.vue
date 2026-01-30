<template>
  <v-card 
    class="card-container ma-0 pa-6 rounded-lg"
    elevation="10"
  >
    <v-row class="flex-column flex-md-row">
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-img
          aspect-ratio="1"
          :src="viagens.volume.url"
          alt="viagem"
          class="rounded-lg teste"
        ></v-img>
      </v-col>

      <v-col cols="12" md="6" class="d-flex flex-column flex-grow-1">

          <v-card-title class="text-h6 text-md-h5 font-weight-bold text-center text-md-left pt-0">
            {{ viagens.destino }}
          </v-card-title>

          <v-card-text>
            <v-row class="d-flex align-center">
              <v-col cols="6" class="d-flex align-center">
                <v-icon class="mr-1" size="18" color="#A92827">mdi-clock-time-four-outline</v-icon>
                <span>{{ viagens.duracao }}</span>
              </v-col>
              <v-col cols="6" class="d-flex align-center justify-end">
                <v-icon class="mr-1 text-grey-darken-1" size="18" color="#A92827">mdi-calendar-month-outline</v-icon>
                <span class="text-grey-darken-1">{{ viagens.inicioViagem }}</span>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="text-center text-md-left">
            <h3 class="text-h6 text-md-h5 font-weight-bold">{{ viagens.titulo }}</h3>
            <p class="text-body-2 text-md-body-1">{{ viagens.descricao }}</p>
          </v-card-text>


        <v-card-actions class="mt-auto py-0 px-5" style="width: 100%;">
          <v-btn 
            class="custom-button rounded-xl caption text-capitalize"
            large
            md="6"
            block
            :href="whatsappLink"
          >
            Mais Detalhes
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CardViagem",
  props: {
    viagens: Object,
  },
  computed: {
    whatsappLink() {
      const telefone = "5561998385830"; // Número da Lagão (formato internacional)
      const mensagem = encodeURIComponent("Olá! Gostaria de mais informações.");
      return `https://wa.me/${telefone}?text=${mensagem}`;
    }
  }
};

</script>

<style scoped>
.card-container {
  width: 100%;
  max-width: 952px;
  height: auto;
  display: flex;
  flex-direction: column;
}

@media (max-width: 960px) {
  .card-container {
    min-height: auto;
    padding: 12px;
    box-shadow: none;
  }

  .v-card-title {
    font-size: 1rem;
  }

  .v-card-text {
    font-size: 0.875rem;
  }
  .teste{
    height: 330px !important;
    width: 100% !important;
    aspect-ratio: auto !important;
  }

  .v-col {
    min-height: auto;
  }
  .custom-button {
    background-color: #A92827 !important;
    color: white !important;
    text-transform: none;
    min-width: auto !important
  }

}
</style>
