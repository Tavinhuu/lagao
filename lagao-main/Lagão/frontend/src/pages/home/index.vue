<template>
  <div class="home-wrapper">
    
    <section class="section-spacing">
      <v-container>
        <div class="text-center mb-10 mb-md-16">
          <h2 class="text-overline red--text text--lighten-1 font-weight-bold mb-2 tracking-widest">
            EVOLUA SUAS HABILIDADES
          </h2>
          <h1 class="text-h4 text-md-h2 font-weight-black white--text text-uppercase mb-4">
            Nossos Cursos
          </h1>
          <div class="mx-auto gradient-line"></div>
        </div>

        <div v-if="loading" class="text-center white--text py-12">
          <v-progress-circular indeterminate color="#D32F2F" size="50"></v-progress-circular>
        </div>

        <v-row v-else>
          <v-col 
            v-for="(categoria, index) in categorias" 
            :key="index" 
            cols="12" sm="6" md="6" lg="3"
            class="d-flex"
          >
            <v-hover v-slot="{ hover }">
              <v-card 
                class="course-card rounded-xl flex-grow-1 d-flex flex-column"
                :elevation="hover ? 24 : 6"
                color="#1a1a1a"
                :class="{ 'on-hover': hover }"
                @click="irParaCursos(categoria)"
              >
                <div class="image-wrapper rounded-t-xl">
                  <v-img 
                    :src="(categoria.volume && categoria.volume.url) ? categoria.volume.url : '@/assets/logo.png'" 
                    height="250px" 
                    cover
                    class="zoom-image"
                    :class="{ 'zoomed': hover }"
                  >
                    <template v-slot:placeholder>
                       <v-row class="fill-height ma-0" align="center" justify="center">
                         <v-progress-circular indeterminate color="red"></v-progress-circular>
                       </v-row>
                    </template>
                    <div class="image-gradient"></div>
                    <div v-if="!categoria.volume || !categoria.volume.url" 
                         style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); padding: 4px 8px; border-radius: 4px;">
                      <span class="white--text text-caption font-weight-bold">Lagão</span>
                    </div>
                  </v-img>
                  <div class="hover-overlay" :style="{ opacity: hover ? 1 : 0 }"></div>
                </div>

                <div class="d-flex flex-column flex-grow-1 pa-6 relative z-index-2">
                  <h3 class="text-h5 font-weight-bold white--text mb-3 line-clamp-2">
                    {{ categoria.nome }}
                  </h3>
                  <p class="grey--text text--lighten-1 flex-grow-1 text-body-2 line-clamp-3">
                    {{ truncateText(categoria.descricao, 120) }}
                  </p>
                  <div class="mt-4">
                    <span class="red--text text-button font-weight-bold group-hover-underline">
                      SAIBA MAIS <v-icon small color="red" class="ml-1">mdi-arrow-right</v-icon>
                    </span>
                  </div>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="section-spacing position-relative" style="background-color: #050505;">
      <div class="bg-pattern"></div>

      <v-container class="position-relative z-index-2">
        <div class="text-center mb-10 mb-md-16">
          <v-icon size="40" color="#D32F2F" class="mb-4">mdi-camera-burst</v-icon>
          <h2 class="text-h4 text-md-h2 font-weight-black white--text text-uppercase">
            Últimas Expedições
          </h2>
          <p class="grey--text text--darken-1 mt-2 text-subtitle-1">
            Veja por onde já passamos e inspire-se para a próxima
          </p>
        </div>
        
        <div v-if="viagens.length" class="carousel-wrapper mx-auto">
          <v-carousel 
            v-model="viagemAtual" 
            hide-delimiters 
            cycle 
            :show-arrows="false"
            height="auto"
            class="pb-5"
          >
            <v-carousel-item v-for="(viagem, index) in viagens" :key="index">
              <div class="d-flex justify-center px-2 py-4">
                <div style="width: 100%; max-width: 900px;">
                   <CardViagens :viagem="viagem" class="elevation-10 rounded-xl"></CardViagens>
                </div>
              </div>
            </v-carousel-item>
          </v-carousel>
          
          <div class="custom-controls mt-4 mt-md-0 mb-8">
             <v-btn fab small color="#1e1e1e" class="mx-2 white--text elevation-5 hover-red" @click="viagemAtual > 0 ? viagemAtual-- : viagemAtual = viagens.length - 1">
               <v-icon>mdi-chevron-left</v-icon>
             </v-btn>
             <span class="grey--text text-caption mx-2 align-self-center">
               {{ viagemAtual + 1 }} / {{ viagens.length }}
             </span>
             <v-btn fab small color="#1e1e1e" class="mx-2 white--text elevation-5 hover-red" @click="viagemAtual < viagens.length - 1 ? viagemAtual++ : viagemAtual = 0">
               <v-icon>mdi-chevron-right</v-icon>
             </v-btn>
          </div>

          <div class="text-center">
            <v-btn outlined color="white" large to="/viagens" class="px-8 rounded-pill btn-border-glow">
              Ver Portfólio Completo
            </v-btn>
          </div>
        </div>

        <div v-else-if="!loading" class="text-center grey--text py-16 border-dashed rounded-xl">
          <v-icon size="60" color="grey darken-3" class="mb-4">mdi-image-filter-hdr</v-icon>
          <p class="text-h6">Nenhuma viagem registrada ainda.</p>
        </div>
      </v-container>
    </section>

    <section class="section-spacing section-testimonials position-relative">
      <div class="testimonials-bg"></div>
      
      <v-container class="position-relative z-index-2">
        <div class="text-center mb-8">
          <h2 class="text-overline white--text font-weight-bold tracking-widest opacity-70">
            FEEDBACK
          </h2>
          <h2 class="text-h4 text-md-h3 font-weight-black white--text text-uppercase">
            A Voz da Tribo
          </h2>
          <div class="mx-auto mt-4 gradient-line"></div>
        </div>
        
        <v-row justify="center" v-if="depoimentos.length">
          <v-col cols="12" md="8" lg="6">
            
            <v-card class="glass-card rounded-xl pa-6 position-relative overflow-visible">
              
              <v-icon class="quote-icon-bg-compact">mdi-format-quote-open</v-icon>

              <v-carousel 
                v-model="depoimentoAtual" 
                hide-delimiters 
                cycle 
                :show-arrows="false"
                height="auto"
                class="testimonial-carousel"
              >
                <v-carousel-item v-for="(depoimento, index) in depoimentos" :key="index">
                  <div class="d-flex justify-center fill-height align-center">
                     <CardDepoimentos :depoimento="depoimento" class="transparent elevation-0 full-width"></CardDepoimentos>
                  </div>
                </v-carousel-item>
              </v-carousel>
            </v-card>
            
            <div class="d-flex justify-center mt-6 gap-2">
              <div 
                v-for="(n, i) in depoimentos.length" 
                :key="i"
                class="dot-indicator"
                :class="{ 'active': i === depoimentoAtual }"
                @click="depoimentoAtual = i"
              ></div>
            </div>

          </v-col>
        </v-row>
        
        <p v-else-if="!loading" class="text-center grey--text py-10">
          Ainda não temos depoimentos registrados.
        </p>
      </v-container>
    </section>

  </div>
</template>

<script>
import CardViagens from '../../components/viagens/CardViagens.vue';
import viagensService from '@/services/viagens.service';
import CardDepoimentos from "@/components/depoimentos/CardDepoimentos.vue";
import depoimentosService from "@/services/depoimentos.service";
import categoriaCursosService from "@/services/categoriacurso.service";
import { mutations } from "@/store";

export default {
  name: "IndexHome",
  components: {
    CardViagens,
    CardDepoimentos
  },
  data() {
    return {
      loading: true,
      viagens: [],
      categorias: [],
      depoimentos: [],
      viagemAtual: 0,
      depoimentoAtual: 0
    };
  },
  methods: {
    irParaCursos(categoria) {
      mutations.setCategoria(categoria);
      this.$router.push({ name: 'Cursos' });
    },
    truncateText(text, length) {
      if (!text) return '';
      if (typeof text !== 'string') return '';
      if (text.length <= length) return text;
      return text.substring(0, length) + '...';
    },
    async pegarDados() {
      try {
        this.loading = true;
        const [viagensRes, categoriasData, depoimentosData] = await Promise.all([
          viagensService.getAll().catch(() => ({ data: [] })), 
          categoriaCursosService.getCategoriaCursos().catch(() => []),
          depoimentosService.getDepoimentos().catch(() => [])
        ]);

        const todasViagens = viagensRes.data || [];
        this.viagens = todasViagens
            .sort((a, b) => new Date(b.inicioViagem) - new Date(a.inicioViagem))
            .slice(0, 5);

        this.categorias = categoriasData;
        this.depoimentos = depoimentosData;
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
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
/* ==============================
   ESTILOS GERAIS
   ============================== */
.home-wrapper {
  background-color: #121212;
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.section-spacing {
  padding-top: 60px;
  padding-bottom: 60px;
}
@media (min-width: 960px) {
  .section-spacing {
    padding-top: 100px;
    padding-bottom: 100px;
  }
}

.tracking-widest { letter-spacing: 3px !important; }
.z-index-2 { z-index: 2; position: relative; }
.opacity-70 { opacity: 0.7; }

.gradient-line {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #D32F2F 0%, #ff7961 100%);
  border-radius: 4px;
}

/* ==============================
   CARD DE CURSOS
   ============================== */
.course-card {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  background: #1a1a1a;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  overflow: hidden;
}

.course-card.on-hover {
  transform: translateY(-12px);
  border-color: #D32F2F !important;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5) !important;
}

.course-card.on-hover .group-hover-underline {
  text-decoration: underline;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.zoom-image { transition: transform 0.6s ease; }
.zoom-image.zoomed { transform: scale(1.1); }

.image-gradient {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.9) 100%);
  pointer-events: none;
}

.hover-overlay {
  position: absolute; 
  top: 0; left: 0; width: 100%; height: 100%; 
  background: rgba(211, 47, 47, 0.2); 
  pointer-events: none; 
  transition: opacity 0.3s;
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

/* ==============================
   SEÇÃO VIAGENS
   ============================== */
.bg-pattern {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0.03;
  background-image: radial-gradient(#ffffff 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

.carousel-wrapper {
  max-width: 1000px;
  position: relative;
}

.custom-controls {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hover-red:hover {
  background-color: #D32F2F !important;
  transform: scale(1.1);
}

.btn-border-glow {
  border-color: rgba(255,255,255,0.3) !important;
  transition: 0.3s;
}
.btn-border-glow:hover {
  border-color: #D32F2F !important;
  color: #D32F2F !important;
  background: rgba(211, 47, 47, 0.1);
}

.border-dashed {
  border: 1px dashed rgba(255,255,255,0.2);
}

/* ==============================
   SEÇÃO DEPOIMENTOS (COMPACTO)
   ============================== */
.section-testimonials {
  background: radial-gradient(circle at center, #1a1a1a 0%, #0d0d0d 100%);
  overflow: hidden;
}

.testimonials-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
}

.glass-card {
  background: rgba(30, 30, 30, 0.6) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
  /* Reduzi o tamanho máximo para garantir que fique compacto */
  max-width: 100%; 
}

/* Aspas Compactas */
.quote-icon-bg-compact {
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 60px !important; /* Reduzi pela metade */
  color: rgba(211, 47, 47, 0.15) !important;
  transform: rotate(180deg);
  pointer-events: none;
}

.testimonial-carousel {
  padding-top: 0px;
}

.dot-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}
.dot-indicator.active {
  background-color: #D32F2F;
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(211, 47, 47, 0.5);
}

.full-width {
  width: 100%;
}
</style>