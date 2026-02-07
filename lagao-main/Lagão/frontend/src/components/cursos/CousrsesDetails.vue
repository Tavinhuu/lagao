<template>
  <div class="course-details-wrapper">
    <v-container class="py-10">
      
      <v-row class="mb-6">
        <v-col cols="12">
          <v-btn 
            text 
            rounded
            color="grey lighten-1"
            class="hover-back px-0"
            @click="$emit('voltar')"
          >
            <v-icon left>mdi-arrow-left</v-icon>
            Voltar para Cursos
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center" class="mb-10">
        <v-col cols="12" class="text-center">
          <h1 class="text-h3 text-md-h2 font-weight-black white--text text-uppercase mb-2 text-glow">
            {{ curso.nome }}
          </h1>
          <div class="mx-auto mt-4 gradient-line"></div>
        </v-col>
      </v-row>

      <v-fade-transition mode="out-in">
        <div class="content-area">
          
          <v-row class="mb-16">
            <v-col cols="12" md="6">
              <v-card class="rounded-xl overflow-hidden elevation-10" color="#1E1E1E">
                <v-img
                  :src="getImagemPrincipal(curso.volume)" 
                  height="400"
                  cover
                  class="main-image"
                >
                  <div class="image-overlay"></div>
                </v-img>
              </v-card>
            </v-col>

            <v-col cols="12" md="6" class="d-flex flex-column justify-center">
              <div>
                <h2 class="text-h4 font-weight-bold white--text mb-4">
                  Sobre o Curso
                </h2>
                <div class="grey--text text--lighten-1 text-body-1 line-height-relaxed">
                  {{ curso.descricao }}
                </div>
              </div>
              
              <div class="mt-8">
                <v-btn
                  x-large
                  rounded
                  color="#D32F2F"
                  class="white--text font-weight-bold elevation-10 btn-glow px-8"
                  :href="whatsappLink"
                  target="_blank"
                >
                  <v-icon left>mdi-whatsapp</v-icon>
                  Agendar Agora
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <v-row v-if="temDetalhesExtras">
            <v-col cols="12">
              <h3 class="text-h4 font-weight-bold white--text mb-8 text-center">
                Estrutura do Aprendizado
              </h3>
            </v-col>

            <v-col cols="12" md="4" v-if="curso.descricaoTeorico">
              <v-card class="fill-height rounded-xl pa-6 module-card d-flex flex-column" color="#1a1a1a">
                <div class="icon-circle mb-4 bg-red-gradient">
                  <v-icon large color="white">mdi-book-open-page-variant</v-icon>
                </div>
                <h4 class="text-h5 font-weight-bold white--text mb-3">Teoria</h4>
                
                <v-img 
                  v-if="temImagem(curso.volumeTeorico)"
                  :src="getImagem(curso.volumeTeorico)"
                  height="150"
                  class="rounded-lg mb-4"
                  cover
                ></v-img>

                <p class="grey--text text--lighten-1 body-2 flex-grow-1">
                  {{ curso.descricaoTeorico }}
                </p>
              </v-card>
            </v-col>

            <v-col cols="12" md="4" v-if="curso.descricaoAguasConfinadas">
              <v-card class="fill-height rounded-xl pa-6 module-card d-flex flex-column" color="#1a1a1a">
                <div class="icon-circle mb-4 bg-blue-gradient">
                  <v-icon large color="white">mdi-pool</v-icon>
                </div>
                <h4 class="text-h5 font-weight-bold white--text mb-3">Águas Confinadas</h4>

                <v-img 
                  v-if="temImagem(curso.volumeAguasConfinadas)"
                  :src="getImagem(curso.volumeAguasConfinadas)"
                  height="150"
                  class="rounded-lg mb-4"
                  cover
                ></v-img>

                <p class="grey--text text--lighten-1 body-2 flex-grow-1">
                  {{ curso.descricaoAguasConfinadas }}
                </p>
              </v-card>
            </v-col>

            <v-col cols="12" md="4" v-if="curso.descricaoAguasAbertas">
              <v-card class="fill-height rounded-xl pa-6 module-card d-flex flex-column" color="#1a1a1a">
                <div class="icon-circle mb-4 bg-green-gradient">
                  <v-icon large color="white">mdi-waves</v-icon>
                </div>
                <h4 class="text-h5 font-weight-bold white--text mb-3">Águas Abertas</h4>

                <v-img 
                  v-if="temImagem(curso.volumeAguasAbertas)"
                  :src="getImagem(curso.volumeAguasAbertas)"
                  height="150"
                  class="rounded-lg mb-4"
                  cover
                ></v-img>

                <p class="grey--text text--lighten-1 body-2 flex-grow-1">
                  {{ curso.descricaoAguasAbertas }}
                </p>
              </v-card>
            </v-col>
          </v-row>

        </div>
      </v-fade-transition>

    </v-container>
  </div>
</template>

<script>
export default {
  name: "CourseDetails",
  props: {
    curso: {
      type: Object,
      required: true
    }
  },
  computed: {
    // Verifica se existe pelo menos um dos campos extras preenchidos
    temDetalhesExtras() {
      return (
        this.curso.descricaoTeorico || 
        this.curso.descricaoAguasConfinadas || 
        this.curso.descricaoAguasAbertas
      );
    },
    whatsappLink() {
      const telefone = "5561998385830";
      const nomeCurso = this.curso.nome || "Curso";
      const mensagem = encodeURIComponent(`Olá! Gostaria de saber mais sobre o curso: ${nomeCurso}`);
      return `https://wa.me/${telefone}?text=${mensagem}`;
    }
  },
  methods: {
    // Helper para verificar se array de imagem é válido
    temImagem(volumeArray) {
      return Array.isArray(volumeArray) && volumeArray.length > 0;
    },
    // Helper para pegar URL da imagem de um array de volumes
    getImagem(volumeArray) {
      if (this.temImagem(volumeArray)) {
        return volumeArray[0].url;
      }
      return null;
    },
    // Helper específico para a imagem principal com fallback
    getImagemPrincipal(volumeArray) {
      const img = this.getImagem(volumeArray);
      return img || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80';
    }
  }
};
</script>

<style scoped>
.text-glow {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.gradient-line {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #D32F2F 0%, #ff7961 100%);
  border-radius: 4px;
}

.image-overlay {
  position: absolute;
  bottom: 0; left: 0; width: 100%; height: 50%;
  background: linear-gradient(to top, rgba(18,18,18,1), transparent);
  pointer-events: none;
}

.line-height-relaxed {
  line-height: 1.8;
  font-size: 1.1rem;
}

/* CARDS DOS MÓDULOS */
.module-card {
  border: 1px solid rgba(255,255,255,0.05) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.module-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255,255,255,0.1) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
}

/* ÍCONES COM GRADIENTE */
.icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.bg-red-gradient { background: linear-gradient(135deg, #D32F2F, #ff7961); }
.bg-blue-gradient { background: linear-gradient(135deg, #1976D2, #64B5F6); }
.bg-green-gradient { background: linear-gradient(135deg, #388E3C, #81C784); }

.btn-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(211, 47, 47, 0.4) !important;
}

.hover-back:hover {
  color: white !important;
}
</style>