<template>
  <v-card class="course-card">
    <v-img :src="curso.volume?.url" />

    <v-card-title class="subtitle-1 font-weight-black">{{ curso.nome }}</v-card-title>

    <v-card-text>
      <p class="subtitle-1 font-weight-bold" v-if="curso.descricaoTeorico">{{ curso.descricaoTeorico }}</p>
      <p class="caption">{{ curso.descricao }}</p>

      <v-btn 
        block 
        color="#A92827" 
        class="white--text text-capitalize font-weight-medium" 
        @click="$emit('verDetalhes', curso)"
      >
        Saiba Mais
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    curso: Object,
  },
};
</script>

<style scoped>
.course-card {
  width: 100%;
  max-width: 350px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
