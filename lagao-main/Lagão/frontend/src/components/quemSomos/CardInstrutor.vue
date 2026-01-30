<template>
  <v-card elevation="15" class="rounded-xl">
    <v-row no-gutters class="pa-4 justify-space-between">
      <v-col cols="12" md="8">
        <v-card-title>
          <h2 class="font-weight-black">
            {{ instrutor.nome }}
          </h2>
          <span class="cargo-text pt-2"> ({{ instrutor.cargo }})</span>
        </v-card-title>

        <v-card-text class="text-body-2 text-md-body-1 texto-espacado">
          <p v-html="instrutor.descricao" class="font-weight-medium"></p>
        </v-card-text>
      </v-col>

      <v-col cols="12" md="4" class="pr-6 pt-6 pb-4 resp-imagem">
        <v-card class="rounded-xl" elevation="0"> 
          <v-img
          :src="instrutor.imagem"
            alt="instrutor"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CardInstrutor",
  props: {
    instrutor: Object,
  },
  methods: {
    formatarDescricao(descricao) {
      return descricao
        .split("\n")
        .map(paragrafo => `<p>${paragrafo.trim()}</p>`)
        .join("")
    }
  }
};
</script>

<style scoped>
.cargo-text {
  color: #A92827;
  font-weight: bold;
  font-size: 0.6em;
  margin-left: 10px;
}

.v-card-title {
  font-size: 1.2em;
}

.texto-espacado {
  line-height: 1.3;
}
@media (max-width: 800px) {
  .resp-imagem {
    padding-left: 16px !important;
  }
}
</style>
