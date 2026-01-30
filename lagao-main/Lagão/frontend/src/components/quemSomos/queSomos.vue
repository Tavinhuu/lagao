<template>
  <div class="quem-somos pt-15">
    <h1 class="font-weight-black">{{ dados.titulo }}</h1>
    <p class="descricao pt-5">{{ dados.descricao }}</p>

    <div class="text-content">
      <p v-html="dados.texto"></p>
    </div>

    
    <h1 class="py-5 font-weight-black">{{ dados.titulo }}</h1>
    <v-row class="pb-15">
      <v-col 
        v-for="instrutor in instrutores" 
        :key="instrutor.id" 
        cols="12" 
        md="12"
      >
        <CardInstrutor :instrutor="instrutor"></CardInstrutor>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { quemSomos } from "../../mock/quemsomos";
import CardInstrutor from "./CardInstrutor.vue";
import { instrutores } from "../../mock/Instrutor";

export default {
  name: "QuemSomos",
  components: {
    CardInstrutor
  },
  data() {
    return {
      dados: quemSomos,
      instrutores
    };
  }
};
</script>

<style scoped>
.quem-somos {
  max-width: 50%;
  margin: auto;
}

.descricao {
  font-size: 18px;
  font-weight: 500 !important;
  line-height: 1.2;
}

.text-content {
  flex: 1;
  font-size: 18px;
  line-height: 1.2;
}

.imagem {
  width: 250px;
  border-radius: 8px;
}
@media (max-width: 1024px){
  .quem-somos{
    max-width: 70% !important;
  }
}
@media (max-width: 768px){
  .quem-somos{
    max-width: 90% !important;
  }
}


</style>
