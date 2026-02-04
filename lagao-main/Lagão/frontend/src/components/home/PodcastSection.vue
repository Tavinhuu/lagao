<template>
  <section class="podcast-section py-16">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="5" class="text-center text-md-left mb-8 mb-md-0">
          <v-chip color="red" label small class="mb-4 font-weight-bold">
            <v-icon left x-small>mdi-youtube</v-icon> NOVO EPISÓDIO
          </v-chip>
          <h2 class="text-h4 text-lg-h3 font-weight-black white--text text-uppercase mb-4">
            Bubblecast - podcast da lagão
          </h2>
          <p class="grey--text text--lighten-1 text-body-1">
            Mergulhe em conversas profundas sobre o mundo subaquático, aventuras e histórias. Acompanhe o último episódio agora!
          </p>
          
          <v-btn 
            large 
            color="red darken-1" 
            dark 
            class="mt-4 elevation-10"
            href="https://www.youtube.com/@SEU_CANAL" 
            target="_blank"
          >
            Inscrever-se no Canal
          </v-btn>
        </v-col>

        <v-col cols="12" md="7">
          <v-card class="video-card rounded-xl overflow-hidden elevation-24" color="black">
            
            <div v-if="loading" class="d-flex align-center justify-center" style="height: 350px;">
              <v-progress-circular indeterminate color="red"></v-progress-circular>
            </div>

            <div v-else-if="video" class="iframe-container">
              <iframe 
                :src="`https://www.youtube.com/embed/${video.id}`" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
              ></iframe>
            </div>

            <div v-else class="d-flex align-center justify-center grey--text" style="height: 350px;">
              Vídeo indisponível no momento.
            </div>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import axiosApi from "@/plugins/axios";

export default {
  name: "PodcastSection",
  data() {
    return {
      loading: true,
      video: null
    };
  },
  async mounted() {
    try {
      // Chama o backend que criamos
      const response = await axiosApi.get('/youtube/latest');
      this.video = response.data;
    } catch (error) {
      console.error("Erro ao carregar podcast:", error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.podcast-section {
  background: linear-gradient(to right, #0a0a0a 0%, #141414 100%);
  position: relative;
  border-top: 1px solid rgba(255,255,255,0.05);
}

/* Responsividade do Iframe (Aspect Ratio 16:9) */
.iframe-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}
.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(255, 0, 0, 0.15) !important;
}
</style>