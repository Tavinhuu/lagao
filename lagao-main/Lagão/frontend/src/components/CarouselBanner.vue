<template>
  <v-container fluid class="carousel-container pl-0 pr-0" style="padding-top: 116px;">
    <v-carousel
      v-model="slide"
      hide-delimiters
      height="450px"
      :continuous="false"
      :show-arrows="false"
    >
      <v-carousel-item
        v-for="(banner, index) in banners"
        :key="index"
        :src="banner.volume.url"
        cover
      >
        <v-container class="d-flex flex-column align-start justify-center fill-height text-left py-13">
          <div class="text-h3 font-weight-bold col-md-6" style="color: white !important">{{ banner.titulo }}</div>
          <div class="text-subtitle-1 font-weight-bold col-md-4" style="color: white !important">{{ banner.subTitulo }}</div>
          <v-btn
            class="custom-button rounded-lg caption ml-2"
            large
            href="https://wa.me/5561998385830?text=Quero%20começar%20a%20mergulhar!"
            target="_blank"
            style="text-transform: none !important;"
          >
            {{ banner.textoBotao }}
          </v-btn>

        </v-container>
      </v-carousel-item>
    </v-carousel>

    <div class="carousel-dots">
      <span
        v-for="(banner, index) in banners"
        :key="index"
        @click="slide = index"
        :class="{ active: slide === index }"
      ></span>
    </div>
  </v-container>
</template>

<script>
import homePageService from '@/services/home.service';

export default {
  data() {
    return {
      slide: 0,
      banners: []
    };
  },
  methods:{
    async pegarDados(){
      this.banners = await homePageService.getHomePage()
    },
  },
  mounted() {
    this.pegarDados()
  }
};
</script>

<style>
.carousel-dots {
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 1;
}

.carousel-dots span {
  width: 16px !important;
  height: 16px !important;
  background: #ececec !important;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
}

.carousel-dots span.active {
  background: #A92827 !important;
}

.custom-button {
  background-color: #A92827 !important;
  color: white !important;
  font-weight: bold !important;
}
</style>
