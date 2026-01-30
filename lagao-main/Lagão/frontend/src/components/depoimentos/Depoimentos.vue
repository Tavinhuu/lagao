<template>
  <v-container color="#E8E8E8" class="depoimentos-container pt-0">
    <v-row class="justify-center mt-4 pt-0">
      <v-col v-for="(depoimento, index) in depoimentos" :key="index" cols="12" md="8">
        <CardDepoimentos :depoimento="depoimento"></CardDepoimentos>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import depoimentosService from '@/services/depoimentos.service';
import CardDepoimentos from './CardDepoimentos.vue';

export default {
  name: "DepoimentosIndex",
  components: {
    CardDepoimentos
  },
  data() {
    return {
      depoimentos: []
    };
  },
  methods:{
    async pegarDados(){
      this.depoimentos = await depoimentosService.getDepoimentos()
    },
  },
  mounted() {
    this.pegarDados()
  }
};
</script>

<style scoped>
.depoimentos-container {
  max-width: 900px;
  margin: auto;
}
.depoimento-texto {
  margin-top: 8px;
}
</style>