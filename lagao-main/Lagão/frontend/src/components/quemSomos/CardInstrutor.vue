<template>
  <v-hover v-slot="{ hover }">
    <v-card 
      class="rounded-xl overflow-hidden transition-swing"
      :elevation="hover ? 12 : 4"
      color="#1E1E1E"
      :class="{ 'on-hover': hover }"
      style="border: 1px solid rgba(255,255,255,0.05);"
    >
      <v-row no-gutters>
        
        <v-col cols="12" md="5" lg="4" class="pa-0">
          <div class="image-container fill-height">
            <v-img
              :src="getAvatar(instrutor)" 
              height="100%"
              min-height="300px"
              cover
              class="instrutor-img"
              :class="{ 'zoomed': hover }"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center" style="background-color: #1E1E1E;">
                  <v-progress-circular indeterminate color="#D32F2F"></v-progress-circular>
                </v-row>
              </template>

              <template v-slot:error>
                <v-img 
                  :src="imagemPadrao" 
                  height="100%" 
                  cover
                ></v-img>
              </template>
              
              <div class="d-md-none image-gradient"></div>
            </v-img>
          </div>
        </v-col>

        <v-col cols="12" md="7" lg="8" class="d-flex flex-column">
          <div class="pa-6 pa-md-8 flex-grow-1">
            
            <div class="mb-6">
              <div class="d-flex align-center mb-2">
                <v-icon small color="#D32F2F" class="mr-2">mdi-account-star</v-icon>
                <span class="text-overline red--text font-weight-bold" style="letter-spacing: 2px;">
                  {{ instrutor.cargo || 'Instrutor' }}
                </span>
              </div>
              
              <h2 class="text-h4 font-weight-black white--text mb-1 text-capitalize">
                {{ instrutor.nome }}
              </h2>
              
              <div class="red darken-2 mt-3" style="width: 40px; height: 4px; border-radius: 2px;"></div>
            </div>

            <div class="grey--text text--lighten-1 text-body-1" style="line-height: 1.8;">
              <div v-if="instrutor.descricao" v-html="instrutor.descricao"></div>
              <p v-else class="font-italic opacity-50">Sem descrição disponível.</p>
            </div>
          </div>

          <div class="px-6 pb-6 px-md-8 pb-md-8 pt-0 mt-auto">
             <v-divider class="grey darken-3 mb-4"></v-divider>
             <div class="d-flex align-center justify-space-between">
                <span class="grey--text text-caption">Equipe Lagão</span>
                
                <div>
                  <v-btn icon small color="grey" class="hover-white"><v-icon small>mdi-instagram</v-icon></v-btn>
                  <v-btn icon small color="grey" class="hover-white"><v-icon small>mdi-whatsapp</v-icon></v-btn>
                </div>
             </div>
          </div>
        </v-col>

      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "CardInstrutor",
  props: {
    instrutor: {
      type: Object,
      required: true,
      default: () => ({
        nome: "Nome do Instrutor",
        cargo: "Cargo",
        descricao: "Descrição...",
        imagem: ""
      })
    },
  },
  computed: {
    imagemPadrao() {
      // Caminho seguro para a imagem padrão na pasta public
      return `${process.env.BASE_URL}assets/avatar.png`;
    }
  },
  methods: {
    getAvatar(instrutor) {
    // Backend (Volume)
    if (instrutor.volume && instrutor.volume.url) {
        return instrutor.volume.url;
    }
    // Legado (Mock) ou link direto
    if (instrutor.imagem && instrutor.imagem.trim() !== "") {
      return instrutor.imagem;
    }
    return this.imagemPadrao;
  }
}
};
</script>

<style scoped>
.on-hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
  border-color: #D32F2F !important;
}

.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.image-container {
  overflow: hidden;
  height: 100%;
  border-right: 1px solid rgba(255,255,255,0.05);
  background-color: #121212; 
}

.instrutor-img {
  transition: transform 0.5s ease;
}

.zoomed {
  transform: scale(1.05);
}

.image-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to top, #1E1E1E, transparent);
}

.hover-white:hover {
  color: white !important;
}

@media (max-width: 960px) {
  .image-container {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    height: 350px;
  }
}
</style>