<template>
  <v-app>
    <Cabecalho />
    
    <v-main class="background-cinza">
      <CarouselBanner /> <router-view></router-view>
    </v-main>

    <WhatsAppButton />
    <Rodape />
  </v-app>
</template>

<script>
import Cabecalho from './components/layout/cabecalho.vue';
import Rodape from './components/layout/rodape.vue';
import WhatsAppButton from './components/button/WhatsAppButton.vue';
import CarouselBanner from './components/CarouselBanner.vue';

export default {
  name: 'App',
  components: { Cabecalho, Rodape, WhatsAppButton, CarouselBanner }
}
</script>

<style>
.background-cinza {
  background-color: #f5f5f5; /* Cor de fundo suave para destacar os cards brancos */
}
</style>