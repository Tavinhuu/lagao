<template>
  <v-hover v-slot="{ hover }">
    <v-card 
      class="rounded-xl overflow-hidden transition-swing"
      :elevation="hover ? 16 : 4"
      color="#1E1E1E"
      :class="{ 'on-hover': hover }"
      style="border: 1px solid rgba(255,255,255,0.05);"
    >
      <v-row no-gutters>
        
        <v-col cols="12" md="5" class="d-flex flex-column">
          <div class="image-wrapper fill-height">
            <v-img
              :src="viagens.volume && viagens.volume.url ? viagens.volume.url : '@/assets/logo.png'"
              height="100%"
              min-height="300px"
              cover
              class="card-img"
              :class="{ 'zoomed': hover }"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="#D32F2F"></v-progress-circular>
                </v-row>
              </template>
              
              <div class="destination-badge">
                <v-icon small color="white" class="mr-1">mdi-map-marker</v-icon>
                {{ viagens.destino || 'Destino Incrível' }}
              </div>

              <div class="d-md-none image-gradient"></div>
            </v-img>
          </div>
        </v-col>

        <v-col cols="12" md="7" class="d-flex flex-column">
          <div class="pa-6 pa-md-8 flex-grow-1">
            
            <div class="d-flex flex-wrap align-center mb-4 gap-4 meta-row">
              <div class="d-flex align-center mr-6 grey--text text--lighten-1">
                <v-icon size="20" color="#D32F2F" class="mr-2">mdi-calendar-month</v-icon>
                <span class="text-subtitle-2 font-weight-bold">{{ viagens.inicioViagem || 'A definir' }}</span>
              </div>
              <div class="d-flex align-center grey--text text--lighten-1">
                <v-icon size="20" color="#D32F2F" class="mr-2">mdi-clock-outline</v-icon>
                <span class="text-subtitle-2 font-weight-bold">{{ viagens.duracao || 'Dias' }}</span>
              </div>
            </div>

            <h3 class="text-h5 font-weight-black white--text mb-3 text-uppercase line-clamp-2">
              {{ viagens.titulo }}
            </h3>

            <div class="grey--text text--lighten-1 text-body-2 line-clamp-4" style="line-height: 1.6;">
              {{ viagens.descricao }}
            </div>
          </div>

          <div class="px-6 px-md-8 pb-6 pb-md-8 pt-0 mt-auto">
            <v-divider class="grey darken-3 mb-4"></v-divider>
            <v-btn
              block
              large
              rounded
              color="#D32F2F"
              class="white--text font-weight-bold btn-glow"
              :href="whatsappLink"
              target="_blank"
            >
              <v-icon left>mdi-whatsapp</v-icon>
              Reserva / Detalhes
            </v-btn>
          </div>
        </v-col>

      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "CardViagem",
  props: {
    viagens: {
      type: Object,
      required: true,
      default: () => ({})
    },
  },
  computed: {
    whatsappLink() {
      const telefone = "5561998385830"; 
      const mensagem = encodeURIComponent(`Olá! Gostaria de mais informações sobre a viagem: ${this.viagens.titulo || 'Mergulho'}`);
      return `https://wa.me/${telefone}?text=${mensagem}`;
    }
  }
};
</script>

<style scoped>
/* Transições */
.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.on-hover {
  transform: translateY(-5px);
  border-color: #D32F2F !important;
}

/* Imagem e Efeitos */
.image-wrapper {
  overflow: hidden;
  position: relative;
  height: 100%;
}

.card-img {
  transition: transform 0.6s ease;
}

.zoomed {
  transform: scale(1.08);
}

/* Badge flutuante na imagem */
.destination-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  padding: 6px 12px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid rgba(255,255,255,0.1);
  z-index: 2;
}

/* Gradiente para mobile */
.image-gradient {
  position: absolute;
  bottom: 0; left: 0; width: 100%; height: 60%;
  background: linear-gradient(to top, #1E1E1E, transparent);
}

/* Texto limitado */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Botão Brilhante */
.btn-glow {
  transition: 0.3s;
}
.btn-glow:hover {
  box-shadow: 0 0 15px rgba(211, 47, 47, 0.5);
  transform: translateY(-2px);
}

@media (max-width: 960px) {
  .image-wrapper {
    height: 250px; /* Altura fixa no mobile */
  }
}
</style>