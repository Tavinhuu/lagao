<template>
  <div class="viagens mt-10">
    <h1 class="font-weight-black">Nossas Viagens</h1>
    <v-container class="mt-10">
      <v-row justify="center" v-if="viagens.length > 0">
        <v-col v-for="viagens in viagensPaginadas" :key="viagens.id" cols="12" md="12" class="mb-8">
            <CardViagens :viagens="viagens"></CardViagens>
        </v-col>
      </v-row>
      <p v-else class="text-center font-italic">Sem viagens no momento.</p>

      <v-pagination
        v-model="paginaAtual"
        :length="totalPaginas"
        color="red darken-2"
        total-visible="4"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import CardViagens from './CardViagens.vue';
import viagensService from '@/services/viagens.service';

export default {
  name: "NossasViagens",
  components: {
    CardViagens
  },
  data() {
    return {
      viagens: [],
      paginaAtual: 1,
      viagensPorPagina: 3
    };
  },
  methods:{
    async pegarViagens(){
      this.viagens = await viagensService.getViagens()
    }
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.viagens.length / this.viagensPorPagina);
    },
    viagensPaginadas() {
      const inicio = (this.paginaAtual - 1) * this.viagensPorPagina;
      const fim = inicio + this.viagensPorPagina;
      return this.viagens.slice(inicio, fim);
    }
  },
  mounted() {
    this.pegarViagens()
  }
}
</script>

<style scoped>
.viagens {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
</style>
