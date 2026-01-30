<template>
  <v-container>
    <v-row>
      <v-btn icon @click="$emit('voltar')">
        <v-icon>mdi-arrow-left</v-icon>
        Voltar
      </v-btn>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h1 class="text-center font-weight-black pb-6">
          {{ curso.nome }}
        </h1>

        <v-tabs v-model="tab" grow>
          <v-tab
            v-for="(categoria, index) in todasCategorias"
            :key="index"
            class="custom-tab"
            :class="{ 'active-tab': tab === index }"
          >
            {{ categoria.nome }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-carousel
          v-if="imagensCategoriaAtual.length"
          class="mb-6"
          height="400"
          hide-delimiters
          cycle
          :show-arrows="false"
        >
          <v-carousel-item
            v-for="(imagem, index) in imagensCategoriaAtual"
            :key="index"
          >
            <v-img :src="imagem" height="400px" cover></v-img>
          </v-carousel-item>
        </v-carousel>

        <p v-else class="text-center font-italic mb-6">
          Nenhuma imagem disponível para esta categoria.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-5">
          <template v-if="categoriaCurso">
            <v-img
              :src="categoriaCurso.volume?.url"
              height="250px"
              class="mb-3"
              v-if="categoriaCurso.volume?.url"
            ></v-img>

            <v-card-title class="text-h5 font-weight-bold">
              {{ categoriaCurso.titulo }}
            </v-card-title>

            <v-card-subtitle class="text-h6">
              {{ curso.descricaoTeorico || ' ' }}
            </v-card-subtitle>

            <v-card-text>
              <p>{{ categoriaCurso.descricao }}</p>
              <p>{{ categoriaCurso.volume?.descricao }}</p>
            </v-card-text>

            <v-row class="mt-6">
              <v-col cols="12">
                <a
                  :href="whatsappLink"
                  target="_blank"
                  style="text-decoration: none"
                >
                  <v-btn
                    color="#A92827"
                    class="white--text rounded-xl"
                    block
                  >
                    Saiba mais
                  </v-btn>
                </a>
              </v-col>
            </v-row>
          </template>

          <template v-else>
            <v-card-title class="text-h5 font-weight-bold">
              Categoria indisponível para este curso.
            </v-card-title>
            <v-card-text>
              Este curso ainda não possui conteúdo para a categoria selecionada.
            </v-card-text>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
    categoriaCurso() {
      return this.curso.categorias?.find(
        (cat) => cat.categoriaId === this.categoriaSelecionada.id
      );
    },
    imagensCategoriaAtual() {
      const imagens = this.curso.imagens?.find(
        (item) => item.categoriaId === this.categoriaSelecionada.id
      );
      return imagens ? imagens.imagens : [];
    },
    whatsappLink() {
      const telefone = "5561998385830";
      const mensagem = encodeURIComponent("Olá! Gostaria de mais informações.");
      return `https://wa.me/${telefone}?text=${mensagem}`;
    }
  }
};
</script>

<style scoped>
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
