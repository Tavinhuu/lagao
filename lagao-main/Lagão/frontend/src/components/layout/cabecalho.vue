<template>
  <v-app-bar app color="black" height="116px" dark class="px-4">
    <v-container fluid>
      <v-row class="align-center justify-space-between">
        <v-col cols="2" class="d-flex d-sm-none align-center">
          <v-app-bar-nav-icon @click="drawer = !drawer" />
        </v-col>

        <v-col
          cols="3"
          sm="3"
          class="d-flex justify-center justify-sm-start align-center"
        >
          <router-link to="/">
            <v-img
              src="/assets/avatar2.png"
              max-height="64"
              max-width="150"
              class="cursor-pointer"
            />
          </router-link>
        </v-col>

        <v-col
          sm="6"
          class="d-none d-sm-flex justify-center"
        >
          <v-btn
            v-for="(item, index) in menuItems"
            :key="index"
            text
            :to="item.link"
            class="text-capitalize text-h6"
            :class="{ 'active-link': isActive(item.link) }"
          >
            {{ item.title }}
          </v-btn>
        </v-col>

        <v-col
          cols="3"
          class="d-flex justify-end align-center"
        >
          <!-- <v-btn
            text
            to="/login"
            class="text-capitalize text-h6"
            :class="{ 'active-link': isActive('/login') }"
          >
            Login
          </v-btn> -->
        </v-col>
      </v-row>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      class="mobile-drawer d-sm-none"
    >
      <v-list class="d-flex flex-column justify-center align-center fill-height">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="navigateTo(item.link)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
export default {
  name: 'IndexCabecalho',
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    menuItems() {
      return [
        { title: "Home", link: "/" },
        { title: "Quem somos", link: "/quemsomos" },
        { title: "Cursos", link: "/cursos" },
        { title: "Viagens", link: "/viagens" },
        { title: "Agenda", link: "/agenda" }
      ];
    }
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    navigateTo(route) {
      this.drawer = false;
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.active-link {
  color: red !important;
  font-weight: bold;
}
.v-app-bar {
  z-index: 20 !important;
}
.text-capitalize {
  text-transform: none;
}
.cursor-pointer {
  cursor: pointer;
}
.mobile-drawer {
  position: absolute !important;
  top: 116px !important;
  height: calc(100vh - 116px) !important;
  z-index: 19;
}
</style>
