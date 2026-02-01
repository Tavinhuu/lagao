<template>
  <v-app style="background-color: #121212;">
    <Cabecalho />
    
    <v-main>
      <CarouselBanner /> 
      
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-main>
    <Rodape />
  </v-app>
</template>

<script>
import Cabecalho from './components/layout/cabecalho.vue';
import Rodape from './components/layout/rodape.vue';
import CarouselBanner from './components/CarouselBanner.vue';

export default {
  name: 'App',
  components: { Cabecalho, Rodape, CarouselBanner }
}
</script>

<style>
/* Importando uma fonte mais moderna e "cool" */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap');

.v-application {
  font-family: 'Montserrat', sans-serif !important;
}

/* Removemos a classe .background-cinza antiga pois o v-app já define a cor base */
</style>