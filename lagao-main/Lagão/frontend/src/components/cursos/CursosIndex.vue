<template>
  <div class="courses-wrapper">
    <v-container class="py-10 py-md-16">
      
      <div v-if="!cursoSelecionado">
        
        <div class="text-center mb-10">
          <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">
            SUA JORNADA
          </h2>
          <h1 class="text-h4 text-md-h2 font-weight-black white--text text-uppercase">
            Trilha de Cursos
          </h1>
          <div class="mx-auto mt-4 gradient-line"></div>
        </div>

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
                v-for="(categoria, index) in categorias" 
                :key="index"
                class="rounded-pill mx-1 px-6 font-weight-bold letter-spacing-1 transition-swing"
                active-class="active-tab-glow"
              >
                {{ categoria.nome }}
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>

        <div v-if="loading" class="text-center py-16">
          <v-progress-circular indeterminate color="#D32F2F" size="60"></v-progress-circular>
          <p class="white--text mt-4">Carregando cursos...</p>
        </div>

        <div v-else>
          <v-row v-if="cursosFiltrados.length === 0" justify="center" class="py-10">
            <v-col cols="12" class="text-center grey--text text--darken-1">
              <v-icon size="60" color="grey darken-3" class="mb-4">mdi-school-outline</v-icon>
              <p class="text-h6">Nenhum curso disponível nesta categoria.</p>
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col
              v-for="curso in cursosFiltrados"
              :key="curso.id"
              cols="12" sm="6" md="4" lg="3"
              class="d-flex"
            >
              <div class="w-100 d-flex flex-column">
                <CourseCard 
                  :curso="curso"
                  @verDetalhes="mostrarDetalhes(curso)"
                  class="flex-grow-1"
                />
              </div>
            </v-col>
          </v-row>
        </div>

      </div>

      <v-fade-transition mode="out-in">
        <div v-if="cursoSelecionado">
          <v-btn 
            fab 
            small 
            color="grey darken-3" 
            dark 
            class="mb-4 elevation-0"
            @click="cursoSelecionado = null"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <CourseDetails
            :curso="cursoSelecionado"
            :todasCategorias="categorias"
            @voltar="cursoSelecionado = null"
          />
        </div>
      </v-fade-transition>

    </v-container>
  </div>
</template>

<script>
// Ajustei os imports para usar @ (caminho absoluto) para evitar erros
import CourseCard from '@/components/cursos/CourseCard.vue';
import CourseDetails from '@/components/cursos/CousrsesDetails.vue';
import cursoService from "@/services/cursos.service";
import categoriaCursosService from "@/services/categoriacurso.service";
import { globalState } from "@/store";

export default {
  name: "CursosIndex",
  components: {
    CourseCard,
    CourseDetails
  },
  data() {
    return {
      loading: true,
      tab: 0,
      cursoSelecionado: null,
      categorias: [],
      cursos: []
    };
  },
  computed: {
    categoriaAtual() {
      // Se tiver algo na store global, usa. Senão, pega da aba atual.
      return globalState.categoriaSelecionada || this.categorias[this.tab];
    },
    cursosFiltrados() {
      // Pega a categoria baseada na aba selecionada (mais confiável para navegação local)
      const categoriaDaAba = this.categorias[this.tab];

      if (!this.categorias.length || !this.cursos.length || !categoriaDaAba) return [];

      return this.cursos
        .filter(curso => {
          // Verifica se o curso pertence à categoria da aba atual
          return curso.categorias?.some(cat => cat.categoriaId === categoriaDaAba.id);
        })
        .map(curso => {
          // Lógica original para mesclar dados da categoria no curso
          const categoriaDoCurso = curso.categorias.find(cat => cat.categoriaId === categoriaDaAba.id);
          return {
            ...curso,
            nome: categoriaDoCurso?.titulo || curso.nome,
            descricao: categoriaDoCurso?.descricao || curso.descricao,
            descricaoTeorico: categoriaDoCurso?.descricaoTeorico || curso.descricaoTeorico,
          };
        });
    }
  },
  methods: {
    async pegarDados() {
      try {
        this.loading = true;
        // Carrega tudo em paralelo
        const [cursosData, categoriasData] = await Promise.all([
          cursoService.getCursos(),
          categoriaCursosService.getCategoriaCursos()
        ]);
        
        this.cursos = cursosData;
        this.categorias = categoriasData;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        this.loading = false;
      }
    },
    mostrarDetalhes(curso) {
      this.cursoSelecionado = curso;
      // Scroll suave para o topo ao abrir detalhes
      this.$vuetify.goTo(0);
    }
  },
  mounted() {
    this.pegarDados().then(() => {
      // Sincroniza a aba se vier da Home clicando em uma categoria específica
      if (globalState.categoriaSelecionada) {
        const index = this.categorias.findIndex(cat => cat.id === globalState.categoriaSelecionada.id);
        if (index !== -1) {
          this.tab = index;
          // Limpa o estado global para não travar a navegação depois
          globalState.categoriaSelecionada = null; 
        }
      }
    });
  }
};
</script>

<style scoped>
/* ==============================
   ESTILOS GERAIS
   ============================== */
.courses-wrapper {
  background-color: #121212;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.tracking-widest {
  letter-spacing: 3px !important;
}

.gradient-line {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #D32F2F 0%, #ff7961 100%);
  border-radius: 4px;
}

/* ==============================
   ESTILIZAÇÃO DAS ABAS (TABS)
   ============================== */
.custom-tabs {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Aba inativa */
.v-tab {
  text-transform: capitalize !important;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.6) !important;
  border: 1px solid transparent;
  margin-bottom: 8px; /* Espaço para o scrollbar não colar */
}

/* Aba ativa (Estado "Pill" vermelho) */
.active-tab-glow {
  background-color: #D32F2F !important;
  color: white !important;
  border-color: #D32F2F !important;
  box-shadow: 0 0 15px rgba(211, 47, 47, 0.4); /* Glow effect */
}

/* Remover a linha padrão do Vuetify embaixo da aba */
::v-deep .v-tabs-slider {
  display: none !important;
}

.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Utilitário de largura */
.w-100 {
  width: 100%;
}
</style>