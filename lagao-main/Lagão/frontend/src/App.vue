<template>
  <v-app>
    <Cabecalho />
    <CarouselBanner />
    <v-main>
      <router-view class="bg-white text-black"></router-view>
      <WhatsAppButton />
    </v-main>
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
  components: {
    Cabecalho,
    Rodape,
    WhatsAppButton,
    CarouselBanner,

  }
}
</script>
<style>
body {
  background-color: white !important;
  color: black !important;
}
</style>
<style scoped>
.v-main {
  padding-top: 0 !important;
}
</style>
