<template>
  <div fluid class="pa-0">
    <v-card color="#E8E8E8" class="full-width pa-10" style="margin-top: 2px;" elevation="0" tile>
      <!-- Cursos -->
      <section>
        <h1 class="text-center font-weight-black mb-8">Nossos Cursos</h1>
        <v-row>
          <v-col 
            v-for="(categoria, index) in categorias" 
            :key="index" 
            cols="12" sm="6" md="6" lg="3" xs="12"
          >
            <v-card 
              class="fixed-card text-center flex-column rounded-lg"
              elevation="10"
            >
              <v-img 
                :src="categoria.volume.url" 
                height="200px" 
                cover
              ></v-img>

              <v-card-title class="font-weight-bold">
                {{ categoria.nome }}
              </v-card-title>

              <v-card-text class="card-text flex-grow-1">
                {{ categoria.descricao }}
              </v-card-text>

              <v-card-actions 
                class="mt-auto align-end pb-6 px-8"
                style="position: absolute; bottom: 0; left: 0; right: 0;"
              >
                <v-btn
                  class="custom-button rounded-xl caption text-capitalize" 
                  block
                  color="#A92827"
                  @click="irParaCursos(categoria)"
                >
                  Saber Mais
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-card>

    <!-- Carousel Viagens -->
    <section class="pt-15 pb-6">
      <h2 class="text-center font-weight-black pb-5">Nossas Viagens</h2>
      <v-row no-gutters class="justify-center" v-if="viagens.length">
        <v-col cols="12" md="12">
          <v-carousel 
            class="custom-carousel pa-0" 
            v-model="viagemAtual" 
            hide-delimiters 
            cycle 
            :continuous="false" 
            :show-arrows="false"
            :height="alturaCarousel"
          >
            <v-carousel-item v-for="(viagem, index) in viagens" :key="index">
              <div class="carousel-card-wrapper pt-3">
                <CardViagens :viagens="viagem" class="full-card"></CardViagens>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <p v-else class="text-center font-italic">Sem viagens no momento.</p>
    </section>

    <!-- Carousel Depoimentos -->
    <v-card color="#E8E8E8" class="full-width py-15" elevation="0" tile>
      <section>
        <h2 class="text-center font-weight-black mb-5">Depoimento dos nossos alunos</h2>
        <v-row no-gutters class="justify-center" v-if="depoimentos.length">
          <v-col cols="12" md="12">
            <v-carousel 
              class="custom-carousel pa-0" 
              v-model="depoimentoAtual" 
              hide-delimiters 
              cycle 
              :continuous="false" 
              :show-arrows="false"
            >
              <v-carousel-item v-for="(depoimento, index) in depoimentos" :key="index">
                <div class="carousel-card-wrapper pt-3">
                  <CardDepoimentos :depoimento="depoimento" class="full-card"></CardDepoimentos>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
        <p v-else class="text-center font-italic">Ainda estamos sem depoimentos.</p>
      </section>
    </v-card>
  </div>
</template>


<script>
import CardViagens from '../../components/viagens/CardViagens.vue';
import viagensService from '@/services/viagens.service';
// import cursoService from "@/services/cursos.service";
import CardDepoimentos from "@/components/depoimentos/CardDepoimentos.vue";
import depoimentosService from "@/services/depoimentos.service";
import categoriaCursosService from "@/services/categoriacurso.service";
import { mutations } from "@/store";

export default {
  name: "indexHome",
  components: {
    CardViagens,
    CardDepoimentos
  },
  data() {
    return {
      viagens: [],
      categorias: [],
      depoimentos: [],
      viagemAtual: 0,
      depoimentoAtual: 0
    };
  },
  computed: {
    alturaCarousel() {
      if(this.$vuetify.breakpoint.sm) {
        return 770
      } else if (this.$vuetify.breakpoint.xs) {
        return 800
      } else {
        return 600
      }
    }
  },
  methods: {
    irParaCursos(categoria) {
      mutations.setCategoria(categoria);
      this.$router.push({ name: 'Cursos' });
    },

    async pegarDados() {
      this.viagens = await viagensService.getViagens();
      this.categorias = await categoriaCursosService.getCategoriaCursos();
      this.depoimentos = await depoimentosService.getDepoimentos();
    }
  },

  mounted() {
    this.pegarDados()
  }
};
</script>

<style>
.custom-button {
  background-color: #A92827 !important;
  color: white !important;
}

.fixed-card {
  min-height: 500px;
}

.card-img {
  height: 265px;
  width: 100%;
  object-fit: cover;
}

.card-text {
  text-align: start;
  text-indent: 0;
  word-wrap: break-word;
  white-space: normal;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-carousel {
  max-width: 100%;
  overflow: hidden;
}

.carousel-card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-card {
  width: 100%;
  max-width: 700px;
  height: auto;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  margin-top: -30px;
  position: relative;
  z-index: 10;
}

.carousel-dots span {
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background: gray;
  border-radius: 50%;
  cursor: pointer;
}

.carousel-dots-depoimento {
  display: flex;
  justify-content: center;
  margin-top: -120px;
  position: relative;
  z-index: 10;
}

.carousel-dots-depoimento span {
  width: 14px;
  height: 14px;
  margin: 0 5px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

.carousel-dots-depoimento .active {
  background: #A92827;
}

.carousel-dots .active {
  background: #A92827;
}
</style>
