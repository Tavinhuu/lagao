<template>
  <div class="courses-wrapper">
    <v-container class="py-10 py-md-16" id="inicio-cursos">
      
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
              class="tabs-centered-pills"
            >
              <v-tab 
                v-for="(categoria, index) in categorias" 
                :key="index"
                class="rounded-pill mx-2 px-6 font-weight-bold letter-spacing-1 transition-swing"
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
      return globalState.categoriaSelecionada || this.categorias[this.tab];
    },
    cursosFiltrados() {
      const categoriaDaAba = this.categorias[this.tab];

      if (!this.categorias.length || !this.cursos.length || !categoriaDaAba) return [];

      return this.cursos
        .filter(curso => {
          // CORREÇÃO: O backend retorna 'categoriaCurso' (objeto), não 'categorias' (array)
          // Verificamos se o curso tem categoria e se o ID bate com a aba atual
          return curso.categoriaCurso && (curso.categoriaCurso.id === categoriaDaAba.id);
        })
        .map(curso => {
          // Retornamos o curso. Se precisar sobrescrever nome/descrição com dados da categoria, faça aqui.
          // Por padrão, vamos usar os dados do próprio curso.
          return {
            ...curso,
            // Se quiser fallback: nome: curso.nome || categoriaDaAba.nome
          };
        });
    }
  },
  methods: {
    async pegarDados() {
      try {
        this.loading = true;
        // CORREÇÃO: cursoService.getAll() ao invés de getCursos()
        const [cursosResponse, categoriasResponse] = await Promise.all([
          cursoService.getAll(),
          categoriaCursosService.getCategoriaCursos()
        ]);
        
        // CORREÇÃO: O axios retorna o objeto response completo, os dados estão em .data
        // Verificamos se veio .data ou se já é o array (dependendo do seu interceptor)
        this.cursos = cursosResponse.data || cursosResponse;
        
        // O service de categoriaCurso que você enviou retorna response.data direto, então ok:
        this.categorias = categoriasResponse; 
        
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        this.loading = false;
      }
    },
    mostrarDetalhes(curso) {
      this.cursoSelecionado = curso;
      this.$nextTick(() => {
        this.$vuetify.goTo('#inicio-cursos', {
          duration: 600,
          offset: 10,  // Deixa um espacinho do topo
          easing: 'easeInOutCubic',
        });
      });
    }
  },
  mounted() {
    this.pegarDados().then(() => {
      if (globalState.categoriaSelecionada) {
        const index = this.categorias.findIndex(cat => cat.id === globalState.categoriaSelecionada.id);
        if (index !== -1) {
          this.tab = index;
          globalState.categoriaSelecionada = null; 
        }
      }
    });
  }
};
</script>

<style scoped>
.courses-wrapper {
  background-color: #121212;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}
.tracking-widest { letter-spacing: 3px !important; }
.gradient-line {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #D32F2F 0%, #ff7961 100%);
  border-radius: 4px;
}
.tabs-centered-pills {
  border-bottom: none !important;
}

.custom-tabs { border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
.v-tab {
  text-transform: capitalize !important;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.6) !important;
  border: 1px solid transparent;
  margin-bottom: 0px;
  min-width: auto;
}
.active-tab-glow {
  background-color: #D32F2F !important;
  color: white !important;
  border-color: #D32F2F !important;
  box-shadow: 0 0 15px rgba(211, 47, 47, 0.4);
}
::v-deep .v-tabs-slider { display: none !important; }
.transition-swing { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
.w-100 { width: 100%; }

::v-deep .v-slide-group__content {
  justify-content: center !important;
}

@media (max-width: 600px) {
  ::v-deep .v-slide-group__content {
    justify-content: flex-start !important; /* No mobile volta ao normal para permitir scroll lateral */
  }
}
</style>