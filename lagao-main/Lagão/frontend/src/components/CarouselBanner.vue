<template>
  <v-container fluid class="pa-0 ma-0 p-0" style="position: relative; z-index: 1;">
    
    <v-row 
      v-if="loading" 
      class="fill-height ma-0" 
      align="center" 
      justify="center" 
      :style="{ height: alturaCarousel, background: '#121212' }"
    >
      <v-progress-circular indeterminate color="#D32F2F"></v-progress-circular>
    </v-row>

    <v-carousel
      v-else
      cycle
      :height="alturaCarousel"
      hide-delimiter-background
      show-arrows-on-hover
      delimiter-icon="mdi-minus"
      :show-arrows="banners.length > 1 && !$vuetify.breakpoint.xsOnly"
    >
      <v-carousel-item
        v-for="(banner, i) in banners"
        :key="i"
        :src="banner.volume ? banner.volume.url : ''"
        cover
      >
        <div class="fill-height d-flex align-center justify-center" style="background: rgba(0,0,0,0.8);">
          
          <div class="text-center px-4" style="max-width: 900px;">
            <h1 
              class="font-weight-black white--text text-uppercase mb-4" 
              :class="$vuetify.breakpoint.xsOnly ? 'text-h4' : 'text-h3 text-md-h1'"
              style="letter-spacing: 2px; line-height: 1.1;"
            >
              {{ banner.titulo }}
            </h1>
            
            <p 
              class="white--text font-weight-light mb-8 opacity-90"
              :class="$vuetify.breakpoint.xsOnly ? 'text-subtitle-1' : 'text-h6 text-md-h5'"
            >
              {{ banner.subTitulo }}
            </p>
            
            <v-btn 
              :x-large="!$vuetify.breakpoint.xsOnly"
              :large="$vuetify.breakpoint.xsOnly"
              color="#D32F2F" 
              dark 
              rounded 
              elevation="10"
              class="font-weight-bold px-8"
              href="https://wa.me/5561998385830?text=Quero%20começar%20a%20mergulhar!"
              target="_blank"
            >
              {{ banner.textoBotao || 'Começar Agora' }}
            </v-btn>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
    
    <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 150px; background: linear-gradient(to top, #121212 10%, transparent); pointer-events: none;"></div>
  </v-container>
</template>

<script>
import homePageService from '@/services/home.service';

export default {
  name: 'CarouselBanner',
  data() {
    return {
      loading: true,
      banners: []
    };
  },
  computed: {
    // Define a altura do banner baseado no tamanho da tela
    alturaCarousel() {
      // xs = Extra Small (Celulares) -> 90% da altura da tela (Fica mais imersivo)
      if (this.$vuetify.breakpoint.xsOnly) return '90vh';
      
      // sm = Small (Tablets) -> 80% da altura
      if (this.$vuetify.breakpoint.smAndDown) return '80vh';
      
      // md/lg/xl (Computadores) -> 85% da altura (Padrão)
      return '85vh';
    }
  },
  methods: {
    async pegarDados() {
      try {
        this.loading = true;
        const response = await homePageService.getHomePage();
        
        if (Array.isArray(response)) {
          this.banners = response;
        } else if (response) {
          this.banners = [response];
        }
      } catch (error) {
        console.error("Erro ao carregar banners:", error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.pegarDados();
  }
};
</script>

<style scoped>
.v-carousel {
  box-shadow: none !important;
}
.opacity-90 {
  opacity: 0.9;
}
</style>