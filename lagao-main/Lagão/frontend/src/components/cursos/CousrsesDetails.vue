<template>
  <div class="course-details-wrapper">
    <v-container class="py-10">
      
      <v-row class="mb-6">
        <v-col cols="12">
          <v-btn 
            text 
            rounded
            color="grey lighten-1"
            class="hover-back px-0"
            @click="$emit('voltar')"
          >
            <v-icon left>mdi-arrow-left</v-icon>
            Voltar para Cursos
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center" class="mb-10">
        <v-col cols="12" class="text-center">
          <h1 class="text-h3 text-md-h2 font-weight-black white--text text-uppercase mb-2 text-glow">
            {{ curso.nome }}
          </h1>
          <div class="mx-auto mt-4 gradient-line"></div>
        </v-col>
      </v-row>

      <v-row justify="center" class="mb-10">
        <v-col cols="12" md="10">
          <v-tabs 
            v-model="tab" 
            background-color="transparent"
            dark
            centered
            show-arrows
            class="custom-tabs"
          >
            <v-tab 
              v-for="(categoria, index) in todasCategorias" 
              :key="index"
              class="rounded-pill mx-1 px-6 font-weight-bold letter-spacing-1 transition-swing"
              active-class="active-tab-glow"
            >
              {{ categoria.nome }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>

      <v-fade-transition mode="out-in">
        
        <div v-if="categoriaCurso" :key="tab" class="content-area">
          <v-row>
            <v-col cols="12" md="5" class="d-flex flex-column">
              <v-card 
                class="rounded-xl overflow-hidden elevation-10 flex-grow-1" 
                color="#1E1E1E"
                style="border: 1px solid rgba(255,255,255,0.05);"
              >
                <v-carousel
                  v-if="imagensCategoriaAtual && imagensCategoriaAtual.length > 0"
                  height="400"
                  hide-delimiters
                  cycle
                  :show-arrows="false"
                  class="fill-height"
                >
                  <v-carousel-item
                    v-for="(imagem, i) in imagensCategoriaAtual"
                    :key="i"
                    :src="imagem"
                    cover
                  ></v-carousel-item>
                </v-carousel>

                <v-img
                  v-else
                  :src="categoriaCurso.volume?.url || '@/assets/logo.png'" 
                  height="100%"
                  min-height="400px"
                  cover
                  class="main-image"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center" style="background: #1E1E1E;">
                      <v-progress-circular indeterminate color="#D32F2F"></v-progress-circular>
                    </v-row>
                  </template>
                  <div class="image-overlay"></div>
                </v-img>
              </v-card>
            </v-col>

            <v-col cols="12" md="7">
              <v-card 
                class="rounded-xl pa-6 pa-md-8 fill-height d-flex flex-column" 
                color="#1a1a1a" 
                elevation="0"
                style="border: 1px solid rgba(255,255,255,0.05);"
              >
                <div class="mb-6">
                  <h2 class="text-h4 font-weight-bold white--text mb-2">
                    {{ categoriaCurso.titulo || curso.nome }}
                  </h2>
                  <p class="red--text text--accent-2 text-subtitle-1 font-weight-medium">
                    {{ curso.descricaoTeorico || 'Módulo Teórico & Prático' }}
                  </p>
                </div>

                <div class="grey--text text--lighten-1 text-body-1 mb-8 scrollable-text flex-grow-1">
                  <p>{{ categoriaCurso.descricao }}</p>
                  <p v-if="categoriaCurso.volume?.descricao" class="mt-4">
                    {{ categoriaCurso.volume.descricao }}
                  </p>
                </div>

                <div class="mt-auto pt-4">
                  <v-btn
                    x-large
                    block
                    rounded
                    color="#D32F2F"
                    class="white--text font-weight-bold elevation-10 btn-glow"
                    :href="whatsappLink"
                    target="_blank"
                  >
                    <v-icon left>mdi-whatsapp</v-icon>
                    Agendar Agora
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-else :key="'empty-'+tab" class="text-center py-16">
          <v-card 
            class="rounded-xl pa-10 mx-auto" 
            max-width="600" 
            color="#1a1a1a" 
            elevation="0"
            style="border: 1px dashed rgba(255,255,255,0.1);"
          >
            <v-icon size="60" color="grey darken-3" class="mb-4">mdi-flask-empty-outline</v-icon>
            <h3 class="text-h5 white--text font-weight-bold mb-2">Conteúdo em Breve</h3>
            <p class="grey--text">
              Ainda não temos informações detalhadas para este curso na categoria selecionada.
            </p>
            <v-btn 
              text 
              color="#D32F2F" 
              @click="tab = 0"
            >
              Voltar para o início
            </v-btn>
          </v-card>
        </div>

      </v-fade-transition>

    </v-container>
  </div>
</template>

<script>
export default {
  name: "CourseDetails",
  props: {
    curso: {
      type: Object,
      required: true
    },
    todasCategorias: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tab: 0
    };
  },
  computed: {
    categoriaSelecionada() {
      return this.todasCategorias?.[this.tab] || {};
    },
    // Encontra os dados específicos desta categoria DENTRO do objeto curso
    categoriaCurso() {
      if (!this.curso.categorias) return null;
      return this.curso.categorias.find(
        (cat) => cat.categoriaId === this.categoriaSelecionada.id
      );
    },
    // Busca imagens extras se existirem
    imagensCategoriaAtual() {
      if (!this.curso.imagens) return [];
      const objImagens = this.curso.imagens.find(
        (item) => item.categoriaId === this.categoriaSelecionada.id
      );
      return objImagens ? objImagens.imagens : [];
    },
    whatsappLink() {
      const telefone = "5561998385830";
      const mensagem = encodeURIComponent(`Olá! Gostaria de saber mais sobre o curso: ${this.curso.nome} (${this.categoriaSelecionada.nome})`);
      return `https://wa.me/${telefone}?text=${mensagem}`;
    }
  }
};
</script>

<style scoped>
.course-details-wrapper {
  /* Fundo transparente pois o pai (index.vue) já tem fundo escuro. 
     Se precisar forçar: background-color: #121212; */
}

/* Título com brilho */
.text-glow {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.gradient-line {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #D32F2F 0%, #ff7961 100%);
  border-radius: 4px;
}

/* ==============================
   ABAS (TABS) - MESMO ESTILO DO INDEX
   ============================== */
.v-tab {
  text-transform: capitalize !important;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.6) !important;
  border: 1px solid transparent;
  margin-bottom: 8px;
}

.active-tab-glow {
  background-color: #D32F2F !important;
  color: white !important;
  border-color: #D32F2F !important;
  box-shadow: 0 0 15px rgba(211, 47, 47, 0.4);
}

::v-deep .v-tabs-slider { display: none !important; }

/* ==============================
   IMAGEM E CARD
   ============================== */
.image-overlay {
  position: absolute;
  bottom: 0; left: 0; width: 100%; height: 50%;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  pointer-events: none;
}

.scrollable-text {
  line-height: 1.8;
  /* Se o texto for gigante, habilita scroll suave */
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

/* Scrollbar fina para o texto */
.scrollable-text::-webkit-scrollbar {
  width: 6px;
}
.scrollable-text::-webkit-scrollbar-track {
  background: #121212;
}
.scrollable-text::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

/* Botão com brilho */
.btn-glow {
  transition: all 0.3s ease;
}
.btn-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(211, 47, 47, 0.4) !important;
}

.hover-back:hover {
  color: white !important;
}

.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>