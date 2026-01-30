<template>
  <v-container class="py-15">
    <v-row v-if="!cursoSelecionado">
      <v-col cols="12">
        <h1 class="text-center font-weight-black pb-10">Trilha de Cursos</h1>
        <v-tabs v-model="tab" grow>
          <v-tab 
            v-for="(categoria, index) in categorias" 
            :key="index"
            class="custom-tab"
            :class="{ 'active-tab': tab === index }"
          >
            {{ categoria.nome }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row v-if="!cursoSelecionado">
      <v-row v-if="cursosFiltrados.length === 0" justify="center">
        <v-col cols="12" class="text-center">
          Ainda não temos cursos disponíveis.
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col
          v-for="curso in cursosFiltrados"
          :key="curso.id"
          cols="12" sm="6" md="4" lg="3"
          class="d-flex justify-center"
        >
          <CourseCard 
            :curso="curso"
            @verDetalhes="mostrarDetalhes(curso)"
          />
        </v-col>
      </v-row>
    </v-row>

    <CourseDetails
      v-if="cursoSelecionado"
      :curso="cursoSelecionado"
      :todasCategorias="categorias"
      @voltar="cursoSelecionado = null"
    />
  </v-container>
</template>

<script>
import CourseCard from './CourseCard.vue';
import CourseDetails from './CousrsesDetails.vue';
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
      tab: 0,
      cursoSelecionado: null,
      categorias: [],
      cursos: []
    };
  },
  computed: {
    categoriaAtual() {
      return globalState.categoriaSelecionada;
    },
    cursosFiltrados() {
      const categoriaSelecionada = this.categoriaAtual || this.categorias[this.tab];
      console.log("Categoria atual:", categoriaSelecionada);

      if (!this.categorias.length || !this.cursos.length || !categoriaSelecionada) return [];

      const filtrados = this.cursos
        .filter(curso => {
          console.log("Curso categorias:", curso.categorias);
          return curso.categorias?.some(cat => cat.categoriaId === categoriaSelecionada.id);
        })
        .map(curso => {
          const categoriaDoCurso = curso.categorias.find(cat => cat.categoriaId === categoriaSelecionada.id);
          return {
            ...curso,
            nome: categoriaDoCurso?.titulo || curso.nome,
            descricao: categoriaDoCurso?.descricao || curso.descricao,
            descricaoTeorico: categoriaDoCurso?.descricaoTeorico || curso.descricaoTeorico,
          };
        });

      console.log("Cursos filtrados:", filtrados);
      return filtrados;
    }


  },
  methods: {
    async pegarDados() {
      try {
        this.cursos = await cursoService.getCursos();
        this.categorias = await categoriaCursosService.getCategoriaCursos();
        console.log("CURSOS:", this.cursos);
        console.log("CATEGORIAS:", this.categorias);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    },
    mostrarDetalhes(curso) {
      this.cursoSelecionado = curso;
    }
  },
  mounted() {
    this.pegarDados().then(() => {
      if (this.categoriaAtual) {
        const index = this.categorias.findIndex(cat => cat.id === this.categoriaAtual.id);
        if (index !== -1) {
          this.tab = index;
        }
      }
    });
  }
};


</script>

<style scoped>
.course-card {
  width: 100%;
  max-width: 350px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.custom-tab {
  text-transform: capitalize;
  font-weight: 600;
  color: white !important;
  background-color: #A92827; 
  border-radius: 20px;
  padding: 10px 20px;
  margin: 5px;
  text-decoration: none !important;
  display: inline-block;
}

.active-tab {
  background-color: #EAE7E7 !important; 
  color: #A92827 !important;
  font-weight: bold;
}

::v-deep(.v-tab::before) {
  background-color: transparent !important;
}

::v-deep(.v-tabs-slider) {
  display: none !important;
}
</style>
