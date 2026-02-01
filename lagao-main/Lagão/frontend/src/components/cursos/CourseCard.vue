<template>
  <v-hover v-slot="{ hover }">
    <v-card 
      class="course-card rounded-xl d-flex flex-column overflow-hidden transition-swing"
      :elevation="hover ? 16 : 4"
      color="#1E1E1E"
      :class="{ 'on-hover': hover }"
      @click="$emit('verDetalhes', curso)"
    >
      <div class="image-wrapper">
        <v-img 
          :src="curso.volume?.url || '@/assets/logo.png'" 
          height="220px" 
          cover
          class="card-img"
          :class="{ 'zoomed': hover }"
        >
          <template v-slot:placeholder>
             <v-row class="fill-height ma-0" align="center" justify="center">
               <v-progress-circular indeterminate color="#D32F2F"></v-progress-circular>
             </v-row>
          </template>
          
          <div class="image-gradient"></div>
        </v-img>
      </div>

      <div class="d-flex flex-column flex-grow-1 pa-5">
        <v-card-title class="pa-0 mb-2 white--text font-weight-bold text-h6 line-clamp-2" style="word-break: keep-all;">
          {{ curso.nome }}
        </v-card-title>

        <div v-if="curso.descricaoTeorico" class="mb-3">
          <v-chip 
            small 
            outlined 
            color="#D32F2F" 
            class="font-weight-bold"
            style="border-color: #D32F2F;"
          >
            {{ curso.descricaoTeorico }}
          </v-chip>
        </div>

        <v-card-text class="pa-0 grey--text text--lighten-1 body-2 flex-grow-1 line-clamp-3 mb-4">
          {{ curso.descricao }}
        </v-card-text>

        <div class="mt-auto">
          <v-btn
            text
            block
            color="#D32F2F"
            class="font-weight-bold text-button hover-underline pa-0 justify-start"
          >
            SAIBA MAIS 
            <v-icon right small>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    curso: {
      type: Object,
      required: true
    },
  },
};
</script>

<style scoped>
/* ==============================
   CARD & HOVER EFFECTS
   ============================== */
.course-card {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  height: 100%; /* Garante que todos os cards tenham a mesma altura base */
}

.course-card.on-hover {
  transform: translateY(-8px);
  border-color: #D32F2F !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5) !important;
}

/* ==============================
   IMAGEM
   ============================== */
.image-wrapper {
  overflow: hidden;
  position: relative;
  height: 220px;
}

.card-img {
  transition: transform 0.5s ease;
}

.zoomed {
  transform: scale(1.1);
}

.image-gradient {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(to bottom, transparent 60%, rgba(30,30,30, 1) 100%);
  pointer-events: none;
}

/* ==============================
   TIPOGRAFIA & UTILITÁRIOS
   ============================== */
/* Limita o texto a X linhas e adiciona '...' */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hover-underline:hover {
  text-decoration: underline;
  background-color: transparent !important;
}

.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>