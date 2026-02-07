<template>
  <div class="quem-somos-wrapper">
    
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          
          <div class="text-center pt-10 mb-10">
            <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">
              NOSSA HISTÓRIA
            </h2>
            <h1 class="text-h4 text-md-h2 font-weight-black white--text text-uppercase mb-6">
              Quem Somos
            </h1>
            <div class="mx-auto gradient-line"></div>
          </div>

          <div class="text-center px-4 mb-16">
             <v-icon large color="red" class="mb-4">mdi-format-quote-open</v-icon>
             <h3 class="text-h5 text-md-h4 font-weight-regular font-italic grey--text text--lighten-1" style="line-height: 1.6;">
              Uma pessoa só deve ser certificada mergulhadora quando quem a treinou confia, de verdade, na capacidade dela. Seja para mergulhar em dupla ou, nos níveis profissionais, para ensinar mergulho a quem ama.
             </h3>
             <v-icon large color="red" class="mt-4">mdi-format-quote-close</v-icon>
          </div>

          <v-row class="mb-10">
            <v-col cols="12" md="5" class="d-flex">
              <v-card class="rounded-xl pa-8 flex-grow-1 elevation-10" color="#1a1a1a" style="border: 1px solid rgba(255,255,255,0.05);">
                <div class="d-flex align-center mb-6">
                   <h2 class="text-h5 font-weight-bold white--text text-uppercase">Nosso Propósito</h2>
                </div>
                <p class="grey--text text--lighten-1 text-body-1" style="line-height: 1.8;">
                  Transformar a vida das pessoas por meio da conexão consigo mesmas, com a natureza e com a aventura — 
                  <span class="red--text font-weight-bold">sempre com a segurança em primeiro lugar.</span>
                </p>
              </v-card>
            </v-col>

            <v-col cols="12" md="7" class="d-flex">
              <v-card class="rounded-xl pa-8 flex-grow-1 elevation-10" color="#1a1a1a" style="border: 1px solid rgba(255,255,255,0.05);">
                <div class="d-flex align-center mb-6">
                   <h2 class="text-h5 font-weight-bold white--text text-uppercase">Nossos Valores</h2>
                </div>
                
                <ul class="custom-list pl-0">
                  <li class="d-flex align-start mb-4">
                    <v-icon color="red" small class="mt-1 mr-3">mdi-check-circle</v-icon>
                    <span class="grey--text text--lighten-1 text-body-1">
                      <strong>Antes de instrutores, somos mergulhadores.</strong> Você aprende a partir de um repertório de situações reais, com foco em segurança, aplicação prática e que geram decisões conscientes debaixo d’água.
                    </span>
                  </li>
                  <li class="d-flex align-start mb-4">
                    <v-icon color="red" small class="mt-1 mr-3">mdi-check-circle</v-icon>
                    <span class="grey--text text--lighten-1 text-body-1">
                      <strong>Certificação não é comprada, é conquistada!</strong> Cada curso é o início de uma jornada, desenhada para construir habilidade, autonomia e auto-responsabilidade, passo a passo.
                    </span>
                  </li>
                  <li class="d-flex align-start">
                    <v-icon color="red" small class="mt-1 mr-3">mdi-check-circle</v-icon>
                    <span class="grey--text text--lighten-1 text-body-1">
                      Cada mergulho, desde o primeiro na piscina, precisa ser <strong>especial, memorável e transformador.</strong>
                    </span>
                  </li>
                </ul>
              </v-card>
            </v-col>
          </v-row>

        </v-col>
      </v-row>
    </v-container>

    <div class="team-section py-16" style="background-color: #050505; position: relative;">
      <div class="bg-pattern"></div>
      
      <v-container class="position-relative z-index-2">
        <div class="text-center mb-10">
          <v-icon size="40" color="#D32F2F" class="mb-4">mdi-account-group</v-icon>
          <h2 class="text-h4 text-md-h3 font-weight-black white--text text-uppercase">
            Nossa Equipe
          </h2>
          <p class="grey--text text--darken-1 mt-2">Profissionais apaixonados pelo que fazem</p>
        </div>

        <div v-if="loading" class="text-center py-10">
           <v-progress-circular indeterminate color="#D32F2F" size="60"></v-progress-circular>
        </div>

        <div v-else>
          <div v-if="instrutores.length" class="mb-16">
            <div class="text-center mb-8">
               <v-divider class="mx-auto mt-2 red darken-4" style="width: 40px; border-width: 2px;"></v-divider>
            </div>

            <v-row justify="center">
               <v-col 
                 v-for="(membro, index) in instrutores" 
                 :key="'instrutor-' + index" 
                 cols="12" 
                 class="mb-6"
               >
                  <CardInstrutor :instrutor="membro" />
               </v-col>
            </v-row>
          </div>

          <div v-if="staff.length">
            <div class="text-center mb-8">
               <h3 class="text-h5 red--text text--darken-1 font-weight-bold text-uppercase tracking-widest">
                 Staff & Apoio
               </h3>
               <v-divider class="mx-auto mt-2 red darken-4" style="width: 40px; border-width: 2px;"></v-divider>
            </div>

            <v-row justify="center">
               <v-col 
                 v-for="(membro, index) in staff" 
                 :key="'staff-' + index" 
                 cols="12" md="6"
                 class="mb-6"
               >
                  <CardInstrutor :instrutor="membro" />
               </v-col>
            </v-row>
          </div>
          
          <p v-if="equipe.length === 0" class="text-center grey--text">
             Nenhum membro da equipe encontrado. Adicione pelo painel Admin!
          </p>
        </div>

      </v-container>
    </div>

    <section class="section-spacing py-16" style="background-color: #0F0F0F; border-top: 1px solid #1a1a1a;">
      <v-container>
        <div class="text-center mb-10">
          <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">VISITE-NOS</h2>
          <h1 class="text-h4 text-md-h3 font-weight-black white--text text-uppercase">Conheça a Lagão</h1>
          <div class="mx-auto gradient-line mt-4"></div>
        </div>

        <v-row>
          <v-col cols="12" md="5">
            <div class="pa-4">
              <h3 class="white--text text-h5 font-weight-bold mb-4">Nossa Base</h3>
              <div class="d-flex align-start mb-6">
                <v-icon color="red" class="mr-3 mt-1">mdi-map-marker</v-icon>
                <p class="grey--text text--lighten-1 text-body-1 ma-0">
                  {{ loja.endereco || 'Endereço não cadastrado.' }}
                </p>
              </div>
              
              <div v-if="loja.linkMapa" class="map-container rounded-xl overflow-hidden elevation-10">
                <iframe 
                  :src="loja.linkMapa" 
                  width="100%" 
                  height="300" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="7">
            <v-row v-if="loja.galeria && loja.galeria.length">
              <v-col 
                v-for="(foto, i) in loja.galeria" 
                :key="i" 
                cols="6" sm="4"
              >
                <v-img 
                  :src="foto.url" 
                  aspect-ratio="1" 
                  class="rounded-lg elevation-4 zoom-hover"
                  cover
                  @click="abrirGaleria(i)"
                >
                    <template v-slot:placeholder>
                       <v-row class="fill-height ma-0" align="center" justify="center">
                         <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                       </v-row>
                    </template>
                </v-img>
              </v-col>
            </v-row>
            <div v-else class="text-center grey--text py-10 d-flex flex-column align-center justify-center h-100">
              <v-icon size="64" color="grey darken-3" class="mb-4">mdi-image-off</v-icon>
              Em breve fotos da nossa estrutura.
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-dialog v-model="showGaleria" max-width="900">
        <v-card color="black" class="overflow-hidden">
            <v-img 
              v-if="loja.galeria && loja.galeria[indexGaleria]"
              :src="loja.galeria[indexGaleria].url" 
              contain
              max-height="80vh"
            ></v-img>
        </v-card>
      </v-dialog>
    </section>

    <section class="section-spacing py-16" style="background-color: #050505;">
      <v-container>
        <div class="text-center mb-10">
          <h2 class="text-overline red--text font-weight-bold mb-2 tracking-widest">CONEXÕES</h2>
          <h1 class="text-h4 text-md-h3 font-weight-black white--text text-uppercase">Nossos Parceiros</h1>
          <div class="mx-auto gradient-line mt-4"></div>
        </div>

        <v-row justify="center" v-if="parceiros.length">
          <v-col 
            v-for="parceiro in parceiros" 
            :key="parceiro.id"
            cols="12" sm="6" md="4" lg="3"
          >
            <v-card 
              color="#1a1a1a" 
              class="rounded-xl pa-6 h-100 d-flex flex-column align-center text-center elevation-6"
              :href="parceiro.link"
              target="_blank"
              style="text-decoration: none;"
            >
              <v-avatar size="100" class="mb-4 grey lighten-2">
                <v-img 
                  :src="parceiro.logo && parceiro.logo[0] ? parceiro.logo[0].url : ''" 
                  alt="Logo"
                >
                    <template v-slot:placeholder>
                       <v-icon large color="grey">mdi-handshake</v-icon>
                    </template>
                </v-img>
              </v-avatar>
              
              <h3 class="white--text text-h6 font-weight-bold mb-2">{{ parceiro.nome }}</h3>
              
              <p class="grey--text text--lighten-1 text-caption mb-0 flex-grow-1">
                {{ parceiro.descricao }}
              </p>
              
              <v-btn 
                v-if="parceiro.link" 
                text 
                color="red" 
                small 
                class="mt-4"
              >
                Visitar <v-icon right small>mdi-open-in-new</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        
        <div v-else class="text-center grey--text">
          Ainda não temos parceiros cadastrados.
        </div>
      </v-container>
    </section>

  </div>
</template>

<script>
// Services
import EquipeService from '@/services/equipe.service';
import LojaService from '@/services/loja.service'; 
import ParceirosService from '@/services/parceiros.service';

import CardInstrutor from './CardInstrutor.vue';

export default {
  name: "QueSomosComponent",
  components: { CardInstrutor },
  data() {
    return {
      loading: true,
      equipe: [],        
      parceiros: [],
      loja: { endereco: '', linkMapa: '', galeria: [] },
      showGaleria: false,
      indexGaleria: 0
    };
  },
  computed: {
    instrutores() {
      return this.equipe.filter(m => {
         const cargo = (m.cargo || '').toLowerCase();
         return cargo.includes('instrutor') || 
                cargo.includes('instrutora') || 
                cargo.includes('director') || 
                cargo.includes('marketing') || 
                cargo.includes('head') ||
                cargo.includes('vendas');
      });
    },

    staff() {
      return this.equipe.filter(m => {
         const cargo = (m.cargo || '').toLowerCase();

         const ehPrincipal = cargo.includes('instrutor') || 
                             cargo.includes('instrutora') || 
                             cargo.includes('director') || 
                             cargo.includes('marketing') || 
                             cargo.includes('head') ||
                             cargo.includes('vendas');
                             
         return !ehPrincipal;
      });
    }
  },
  methods: {
    abrirGaleria(index) {
        this.indexGaleria = index;
        this.showGaleria = true;
    }
  },
  async mounted() {
    this.loading = true;
    try {
      const [equipeRes, lojaRes, parceirosRes] = await Promise.all([
         EquipeService.getAll().catch(err => { console.error("Erro equipe", err); return []; }),
         LojaService.get().catch(err => { console.error("Erro loja", err); return { data: {} }; }),
         ParceirosService.getAll().catch(err => { console.error("Erro parceiros", err); return { data: [] }; })
      ]);

      this.equipe = equipeRes || [];
      this.loja = lojaRes.data || {};
      this.parceiros = parceirosRes.data || [];

    } catch (error) {
      console.error("Erro geral ao carregar dados:", error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.quem-somos-wrapper {
  background-color: #121212;
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
}

.tracking-widest {
  letter-spacing: 3px !important;
}

.gradient-line {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #D32F2F 0%, #ff7961 100%);
  border-radius: 4px;
}

.bg-pattern {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0.03;
  background-image: radial-gradient(#ffffff 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

.z-index-2 {
  position: relative;
  z-index: 2;
}

.icon-box {
  background: rgba(211, 47, 47, 0.1);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Lista Customizada */
.custom-list {
  list-style: none;
}

/* --- ESTILOS DA LOJA --- */
.map-container iframe {
  filter: invert(90%) hue-rotate(180deg); 
  display: block;
}

.zoom-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.zoom-hover:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 20px rgba(0,0,0,0.5) !important;
  z-index: 2;
  border: 1px solid #D32F2F;
}
</style>