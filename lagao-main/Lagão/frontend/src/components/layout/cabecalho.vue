<template>
  <div>
    <v-app-bar app color="black" dark elevate-on-scroll>
      <v-app-bar-nav-icon 
        class="d-md-none" 
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-img
          src="/assets/avatar2.png"
          max-height="50"
          max-width="120"
          contain
          class="mr-4"
        />
      </router-link>

      <v-spacer></v-spacer>

      <div class="d-none d-md-flex align-center gap-4">
        <v-btn
          v-for="(item, index) in menuItems"
          :key="index"
          text
          :to="item.link"
          class="text-capitalize subtitle-1 font-weight-regular"
          active-class="red--text font-weight-bold"
        >
          {{ item.title }}
        </v-btn>
      </div>

      </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      color="grey darken-4"
      dark
    >
      <v-list nav dense>
        <v-list-item-group active-class="red--text text--lighten-1">
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.link"
          >
            <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'IndexCabecalho',
  data: () => ({
    drawer: false,
    menuItems: [
      { title: "Home", link: "/" },
      { title: "Quem somos", link: "/quemsomos" },
      { title: "Cursos", link: "/cursos" },
      { title: "Viagens", link: "/viagens" },
      { title: "Agenda", link: "/agenda" }
    ]
  })
};
</script>

<style scoped>
/* Não precisamos de CSS customizado aqui, o Vuetify resolve tudo */
</style>