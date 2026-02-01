<template>
  <v-hover v-slot="{ hover }">
    <v-card 
      class="viagem-card rounded-xl overflow-hidden transition-swing"
      :elevation="hover ? 12 : 2"
      height="100%"
      color="#1E1E1E"
    >
      <div class="image-wrapper">
        <v-img 
          :src="imagemUrl" 
          height="250px" 
          cover
          class="zoom-effect"
          :class="{ 'zoomed': hover }"
        >
          <template v-slot:placeholder>
             <v-row class="fill-height ma-0" align="center" justify="center">
               <v-progress-circular indeterminate color="#D32F2F"></v-progress-circular>
             </v-row>
          </template>
          <div class="gradient-overlay"></div>
        </v-img>

        <div class="date-badge">
          <v-icon small color="white" class="mr-1">mdi-calendar</v-icon>
          <span class="font-weight-bold">{{ dataFormatada }}</span>
        </div>
      </div>

      <div class="d-flex flex-column pa-5">
        <div class="d-flex align-center mb-2">
          <v-icon color="#D32F2F" small class="mr-2">mdi-map-marker</v-icon>
          <span class="text-overline grey--text text--lighten-1">DESTINO REALIZADO</span>
        </div>

        <h3 class="text-h5 white--text font-weight-bold mb-3 line-clamp-2">
          {{ viagem.destino }}
        </h3>

        <p class="grey--text text--lighten-1 body-2 line-clamp-3 mb-4">
          {{ viagem.descricao }}
        </p>

        <div class="mt-auto pt-2 border-top">
          <v-btn text block color="#D32F2F" class="px-0 justify-start hover-underline">
            VER FOTOS E DETALHES <v-icon right small>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "CardViagens",
  props: {
    viagem: {
      type: Object,
      required: true
    }
  },
  computed: {
    imagemUrl() {
      // Lógica segura para pegar a imagem do array 'volume'
      if (this.viagem.volume && Array.isArray(this.viagem.volume) && this.viagem.volume.length > 0) {
        return this.viagem.volume[0].url;
      }
      return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'; // Fallback
    },
    dataFormatada() {
      if (!this.viagem.inicioViagem) return '';
      // Formata: "DEZ 2023" ou "12/10/2023"
      const data = new Date(this.viagem.inicioViagem);
      return data.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }).toUpperCase();
    }
  }
};
</script>

<style scoped>
.viagem-card {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  cursor: pointer;
}
.image-wrapper {
  position: relative;
  overflow: hidden;
}
.zoom-effect {
  transition: transform 0.6s ease;
}
.zoomed {
  transform: scale(1.1);
}
.gradient-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(to bottom, transparent 50%, rgba(30,30,30, 0.9) 100%);
}
.date-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  padding: 6px 12px;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  border: 1px solid rgba(255,255,255,0.1);
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.border-top {
  border-top: 1px solid rgba(255,255,255,0.05);
}
.hover-underline:hover {
  text-decoration: underline;
  background: transparent !important;
}
</style>