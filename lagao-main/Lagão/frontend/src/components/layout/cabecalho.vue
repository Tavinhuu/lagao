<template>
  <div>
    <v-app-bar 
      app 
      fixed 
      :color="isScrolled ? 'rgba(5, 11, 20, 0.95)' : 'transparent'"
      :elevation="isScrolled ? 10 : 0"
      dark
      height="80"
      class="transition-swing"
      :class="{ 'glass-effect': isScrolled }"
    >
      <v-container class="d-flex align-center fill-height py-0">
        
        <router-link to="/" class="d-flex align-center text-decoration-none mr-4 click-scale">
          <v-img
            src="/assets/avatar2.png"
            :max-height="$vuetify.breakpoint.xsOnly ? '40' : '55'"
            :max-width="$vuetify.breakpoint.xsOnly ? '100' : '140'"
            contain
            class="transition-swing"
          />
        </router-link>

        <v-spacer class="d-none d-md-flex"></v-spacer>

        <div class="d-none d-md-flex align-center">
          <v-btn
            v-for="(item, index) in menuItems"
            :key="index"
            text
            rounded
            :to="item.link"
            class="text-capitalize font-weight-medium nav-btn mx-1"
            active-class="active-nav-btn"
          >
            {{ item.title }}
          </v-btn>
        </div>

        <v-spacer></v-spacer>

        <div class="d-flex align-center">
          

          <v-img
            src="https://i.ibb.co/CK2mvcQD/SDI-Letter-White-RGB-v0824-01.jpg"
            max-height="50"
            max-width="100"
            contain
            class="d-none d-md-flex"
            alt="Logo SDI"
          ></v-img>

          <v-app-bar-nav-icon 
            class="d-md-none ml-2" 
            @click="drawer = !drawer"
            large
          ></v-app-bar-nav-icon>
        </div>

      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      color="#0d0d0d"
      dark
      width="300" 
      overlay-opacity="0.8"
    >
      <div class="d-flex flex-column align-center py-8 px-4">
        <v-img src="/assets/avatar2.png" max-width="100" class="mb-6"></v-img>
        <v-divider style="width: 100%; border-color: rgba(255,255,255,0.1);"></v-divider>
      </div>

      <v-list nav dense class="px-4">
        <v-list-item-group active-class="red--text text--lighten-1">
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.link"
            class="mb-3 rounded-lg py-1"
          >
            <v-list-item-icon class="mr-4">
              <v-icon>{{ getIcon(item.title) }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6 font-weight-regular">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-6">
          <v-btn
            block
            x-large
            color="#D32F2F"
            class="font-weight-bold rounded-xl"
            href="https://wa.me/5561998385830"
            target="_blank"
          >
            <v-icon left>mdi-whatsapp</v-icon>
            Agendar Agora
          </v-btn>
          
          <div class="d-flex justify-center mt-6">
             <img src="https://i.ibb.co/CK2mvcQD/SDI-Letter-White-RGB-v0824-01.jpg" height="40" style="opacity: 0.7;" />
          </div>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'IndexCabecalho',
  data: () => ({
    drawer: false,
    isScrolled: false,
    menuItems: [
      { title: "Home", link: "/" },
      { title: "a LAGÃO", link: "/quemsomos#inicio-conteudo" },
      { title: "Cursos", link: "/cursos#inicio-conteudo" },
      { title: "Viagens", link: "/viagens#inicio-conteudo" },
      { title: "Parceiros", link: "/parceiros" },
      { title: "Agenda", link: "/agenda#inicio-conteudo" }
    ]
  }),
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    getIcon(title) {
      const icons = {
        'Home': 'mdi-home-outline',
        'Quem somos': 'mdi-account-group-outline',
        'Cursos': 'mdi-school-outline',
        'Viagens': 'mdi-airplane',
        'Parceiros': 'mdi-handshake',
        'Agenda': 'mdi-calendar-clock'
        
      };
      return icons[title] || 'mdi-circle-small';
    }
  }
};
</script>

<style scoped>
/* Efeito de Vidro Fosco */
.glass-effect {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.transition-swing {
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Menu Desktop */
.nav-btn {
  letter-spacing: 0.5px;
  font-size: 0.95rem;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.08) !important;
  transform: translateY(-2px);
}

.active-nav-btn {
  opacity: 1;
  color: #D32F2F !important;
}

.active-nav-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  background-color: #D32F2F;
  border-radius: 50%;
  box-shadow: 0 0 10px #D32F2F;
}

.click-scale:active {
  transform: scale(0.95);
}
</style>