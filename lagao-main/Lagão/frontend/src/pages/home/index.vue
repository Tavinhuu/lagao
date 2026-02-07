<template>
  <div class="home-wrapper">

    <section class="section-spacing section-testimonials">
      <v-container>
        <div class="text-center mb-10">
          <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">
            O QUE DIZEM SOBRE NÓS
          </h2>
          <h1 class="text-h4 text-md-h3 font-weight-black white--text text-uppercase">
            Fala Mergulhador!
          </h1>
          <div class="mx-auto gradient-line mt-4"></div>
        </div>
        
        <div v-if="loading" class="text-center py-6">
          <v-progress-circular indeterminate color="#D32F2F"></v-progress-circular>
        </div>

        <v-row justify="center" v-else-if="depoimentos.length">
          <v-col cols="12" md="10" lg="8">
            <v-carousel 
              v-model="depoimentoAtual" 
              hide-delimiters 
              cycle 
              :show-arrows="false"
              height="auto"
              class="py-2"
              interval="6000"
            >
              <v-carousel-item v-for="(depoimento, index) in depoimentos" :key="index">
                <div class="d-flex justify-center px-4">
                   <CardDepoimentos :depoimento="depoimento" class="transparent elevation-0"></CardDepoimentos>
                </div>
              </v-carousel-item>
            </v-carousel>
            
            <div class="d-flex justify-center mt-2">
              <v-btn 
                v-for="(n, i) in depoimentos.length" 
                :key="i"
                icon 
                x-small
                class="mx-1"
                :color="i === depoimentoAtual ? 'red' : 'grey darken-3'"
                @click="depoimentoAtual = i"
              >
                <v-icon>mdi-circle</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        
        <p v-else class="text-center grey--text py-6">
          Ainda não temos depoimentos registrados.
        </p>
      </v-container>
    </section>

    <section class="section-spacing" style="background-color: #050505; border-top: 1px solid #222;">
      <v-container>
        <div class="text-center mb-10">
          <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">
            EXPERIÊNCIA IMERSIVA
          </h2>
          <h1 class="text-h4 text-md-h3 font-weight-black white--text text-uppercase">
            Veja em Vídeo
          </h1>
          <div class="mx-auto gradient-line mt-4"></div>
        </div>

        <v-slide-group
          class="pa-4"
          show-arrows
          dark
          center-active
        >
          <v-slide-item
            v-for="(video, index) in videosShorts"
            :key="index"
          >
            <v-card
              class="ma-3 rounded-xl overflow-hidden elevation-10 video-card"
              height="500"
              width="280"
              color="#000"
            >
              <iframe
                width="100%"
                height="100%"
                :src="`https://www.youtube.com/embed/${video}?rel=0`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style="border-radius: 20px;"
              ></iframe>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-container>
    </section>

    <section class="section-spacing" style="background-color: #121212;">
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

        <v-row v-if="!loading" justify="center">
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
                    :src="(categoria.volume && categoria.volume.url) ? categoria.volume.url : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop'" 
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

    <PodcastSection />

    <section class="section-spacing position-relative" style="background-color: #050505;">
      <div class="bg-pattern"></div>
      <v-container class="position-relative z-index-2">
        <div class="text-center mb-10 mb-md-16">
          <v-icon size="40" color="#D32F2F" class="mb-4">mdi-camera-burst</v-icon>
          <h2 class="text-h4 text-md-h2 font-weight-black white--text text-uppercase">
            Lagão pelo mundo
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
            <v-btn outlined color="white" large to="/viagens" class="px-8">
              Ver Portfólio Completo
            </v-btn>
          </div>
        </div>
      </v-container>
    </section>

    <section class="section-spacing" style="background-color: #0F0F0F; border-top: 1px solid #222;">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">
            AGENDA ABERTA
          </h2>
          <h1 class="text-h4 text-md-h2 font-weight-black white--text text-uppercase">
            Próximas Expedições
          </h1>
          <div class="mx-auto gradient-line mt-4"></div>
        </div>

        <v-row v-if="expedicoes.length" justify="center">
          <v-col 
            v-for="exp in expedicoes" :key="exp.id"
            cols="12" md="4"
            class="d-flex"
          >
            <v-hover v-slot="{ hover }">
              <v-card 
                class="course-card rounded-xl flex-grow-1 d-flex flex-column"
                :elevation="hover ? 24 : 6"
                color="#1a1a1a"
                :class="{ 'on-hover': hover }"
              >
                <div class="image-wrapper rounded-t-xl">
                  <v-img 
                    :src="exp.volume && exp.volume[0] ? exp.volume[0].url : 'https://via.placeholder.com/400'" 
                    height="250px" 
                    cover
                    class="zoom-image"
                    :class="{ 'zoomed': hover }"
                  >
                    <div class="d-flex justify-end pa-4">
                       <v-chip 
                         color="red darken-1" 
                         label 
                         class="font-weight-bold white--text elevation-4"
                       >
                         <v-icon left small>mdi-calendar</v-icon>
                         {{ formataData(exp.dataInicio) }}
                       </v-chip>
                    </div>
                    
                    <div class="image-gradient"></div>
                  </v-img>
                </div>

                <div class="d-flex flex-column flex-grow-1 pa-6 relative z-index-2">
                  <h3 class="text-h5 font-weight-bold white--text mb-2">
                    {{ exp.local }}
                  </h3>
                  
                  <p class="grey--text text--lighten-1 flex-grow-1 text-body-2 line-clamp-3">
                    {{ truncateText(exp.descricao, 120) }}
                  </p>

                  <v-divider class="grey darken-3 my-4"></v-divider>

                  <div class="d-flex align-center justify-end mt-auto">
                    <v-btn 
                      :color="hover ? 'red darken-1' : 'white'" 
                      :outlined="!hover"
                      :dark="hover"
                      rounded
                      class="px-8 font-weight-bold transition-swing"
                      @click.stop="abrirWhatsapp(exp)"
                    >
                      SAIBA MAIS
                      <v-icon right small>mdi-arrow-right</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        
        <div v-else class="text-center grey--text">
           Em breve novas datas.
        </div>

      </v-container>
    </section>

    <section class="section-spacing" style="background-color: #050505; border-top: 1px solid #222;">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <div class="text-center mb-10">
              <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">
                FALE CONOSCO
              </h2>
              <h1 class="text-h4 font-weight-black white--text text-uppercase">
                Entre em contato
              </h1>
              <div class="mx-auto gradient-line mt-4"></div>
              <p class="grey--text mt-4">
                Preencha o formulário abaixo e entraremos em contato.
              </p>
            </div>

            <v-form ref="form" v-model="formValido" lazy-validation>
              <v-text-field
                v-model="form.nome"
                :rules="[v => !!v || 'Nome é obrigatório']"
                label="Seu Nome"
                outlined
                dark
                color="red"
                background-color="#121212"
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                :rules="[
                  v => !!v || 'E-mail é obrigatório',
                  v => /.+@.+\..+/.test(v) || 'E-mail inválido'
                ]"
                label="Seu E-mail"
                outlined
                dark
                color="red"
                background-color="#121212"
              ></v-text-field>

              <v-textarea
                v-model="form.mensagem"
                :rules="[v => !!v || 'Mensagem é obrigatória']"
                label="Sua Mensagem"
                outlined
                dark
                color="red"
                background-color="#121212"
                rows="4"
              ></v-textarea>

              <div class="text-center mt-4">
                <v-btn
                  :loading="enviando"
                  :disabled="!formValido"
                  color="red darken-1"
                  x-large
                  block
                  class="white--text font-weight-bold"
                  @click="enviarContato"
                >
                  ENVIAR MENSAGEM
                  <v-icon right>mdi-send</v-icon>
                </v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
      
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" top timeout="4000">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.show = false">Fechar</v-btn>
        </template>
      </v-snackbar>
    </section>

  </div>

</template>

<script>
// Componentes
import CardViagens from '@/components/viagens/CardViagens.vue';
import CardDepoimentos from "@/components/depoimentos/CardDepoimentos.vue";
import PodcastSection from '@/components/home/PodcastSection.vue';

// Services
import viagensService from '@/services/viagens.service';
import depoimentosService from '@/services/depoimentos.service';
import expedicoesService from '@/services/expedicoes.service';
import categoriaCursosService from '@/services/categoriacurso.service';
import { mutations } from "@/store";

import axios from 'axios';

export default {
  name: "IndexHome",
  components: {
    CardViagens,
    PodcastSection,
    CardDepoimentos
  },
  data() {
    return {
      loading: true,
      viagens: [],
      expedicoes: [],
      categorias: [],
      depoimentos: [],
      viagemAtual: 0,
      depoimentoAtual: 0,
      videosShorts: [
        '6Ig-3W5aSZM',
        'IX7AxK0lABg',
        'U5eXkAJz9cE',
        'BALPtn3eZdE',
        '8tBpNbmTWxM',
        'PuWkzzwUgiM',
        'qxRv4mQOPFk',
        'NA9N7IZFFbQ'
      ],
      enviando: false,
      formValido: true,
      form: {
        nome: '',
        email: '',
        mensagem: ''
      },
      snackbar: {
        show: false,
        text: '',
        color: ''
      }
    };
  },
  methods: {
    async enviarContato() {
      // 1. Valida se preencheu tudo
      if (!this.$refs.form.validate()) return;

      this.enviando = true;

      try {
        // 2. COLOQUE AQUI O SEU LINK DO FORMSPREE (Aquele do Passo 1)
        const urlFormspree = 'https://formspree.io/f/xvzboqpv'; 
        
        // 3. Envia os dados
        await axios.post(urlFormspree, {
          email: this.form.email,
          message: `Nome: ${this.form.nome}\nMensagem: ${this.form.mensagem}`
        });

        // 4. Mostra sucesso
        this.snackbar = {
          show: true,
          text: 'Mensagem enviada! Em breve entraremos em contato.',
          color: 'success'
        };
        
        // 5. Limpa o formulário
        this.$refs.form.reset();

      } catch (error) {
        console.error(error);
        this.snackbar = {
          show: true,
          text: 'Ocorreu um erro ao enviar. Tente novamente.',
          color: 'error'
        };
      } finally {
        this.enviando = false;
      }
    },
    abrirWhatsapp(expedicao) {
      const numero = "55998385830";

      const mensagem = `Olá, desejo mais informações a respeito da expedição *${expedicao.local}*`;
      
      const url = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;

      window.open(url, '_blank');
    },
    formataData(data) {
    if(!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
},
    irParaCursos(categoria) {
      mutations.setCategoria(categoria);
      this.$router.push({ name: 'Cursos' });
    },
    truncateText(text, length) {
      if (!text || typeof text !== 'string') return '';
      if (text.length <= length) return text;
      return text.substring(0, length) + '...';
    },
    async pegarDados() {
      try {
        this.loading = true;
        const [viagensRes, categoriasData, expedicoesRes, depoimentosData] = await Promise.all([
          viagensService.getAll().catch(() => ({ data: [] })), 
          categoriaCursosService.getCategoriaCursos().catch(() => []),
          expedicoesService.getAll().catch(() => ({ data: [] })), // 3º item é expedição
          depoimentosService.getDepoimentos().catch(() => [])     // 4º item é depoimento
        ]);

        // Filtro Viagens (Top 5 mais recentes)
        const todasViagens = viagensRes.data || [];
        this.viagens = todasViagens
            .sort((a, b) => new Date(b.inicioViagem) - new Date(a.inicioViagem))
            .slice(0, 5);

        this.categorias = categoriasData;
        this.depoimentos = depoimentosData;
        this.expedicoes = expedicoesRes.data || [];
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
   BASE & LAYOUT
   ============================== */
.home-wrapper {
  background-color: #121212;
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
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

/* Linha Gradiente */
.gradient-line {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #D32F2F 0%, #ff7961 100%);
  border-radius: 4px;
}

/* ==============================
   SEÇÃO DEPOIMENTOS (Nova posição)
   ============================== */
.section-testimonials {
  background: linear-gradient(to bottom, #000000 0%, #121212 100%);
  border-bottom: 1px solid rgba(255,255,255,0.05);
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

.video-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.video-card:hover {
  transform: translateY(-5px);
  border-color: #D32F2F;
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

/* Texto Limitado */
.line-clamp-2 {
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
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
</style>