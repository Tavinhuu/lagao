<template>
  <v-container class="fill-height align-start py-10">
    <v-row>
      <v-col cols="12" class="mb-6">
        <h1 class="text-h4 font-weight-bold white--text">Painel Administrativo</h1>
        <p class="grey--text">Bem-vindo, Admin. O que deseja gerenciar hoje?</p>
      </v-col>

      <v-col 
        v-for="(item, i) in menuItems" 
        :key="i" 
        cols="12" sm="6" md="4"
      >
        <v-hover v-slot="{ hover }">
          <v-card 
            :to="item.to"
            class="d-flex flex-column align-center justify-center py-10 rounded-xl transition-swing"
            :elevation="hover ? 12 : 2"
            :color="hover ? 'grey darken-4' : '#1E1E1E'"
            style="border: 1px solid rgba(255,255,255,0.05); cursor: pointer;"
          >
            <v-avatar :color="item.color" size="80" class="mb-4 elevation-5">
              <v-icon dark size="40">{{ item.icon }}</v-icon>
            </v-avatar>
            
            <h3 class="text-h6 font-weight-bold white--text mb-1">{{ item.title }}</h3>
            <span class="caption grey--text">{{ item.subtitle }}</span>
          </v-card>
        </v-hover>
      </v-col>
      
      <v-col cols="12" class="mt-10 text-center">
        <v-btn text color="red" @click="logout">
          <v-icon left>mdi-logout</v-icon> Sair do Sistema
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'AdminDashboard',
  data: () => ({
    menuItems: [
      { title: 'Cursos', subtitle: 'Gerenciar Cursos', icon: 'mdi-school', color: 'blue darken-2', to: '/admin/cursos' },
      { title: 'Categorias', subtitle: 'Tipos de Curso', icon: 'mdi-shape', color: 'indigo darken-2', to: '/admin/categorias' },
      { title: 'Agenda', subtitle: 'Eventos e Datas', icon: 'mdi-calendar-clock', color: 'green darken-2', to: '/admin/agenda' },
      { title: 'Viagens', subtitle: 'Portfólio de Expedições', icon: 'mdi-airplane', color: 'orange darken-3', to: '/admin/viagens' },
      { title: 'Equipe', subtitle: 'Instrutores e Staff', icon: 'mdi-account-group', color: 'teal darken-2', to: '/admin/equipe' },
      { title: 'Depoimentos', subtitle: 'Feedbacks', icon: 'mdi-comment-quote', color: 'purple darken-2', to: '/admin/depoimentos' },
      { title: 'Expedições', subtitle: 'Próximas expedições', icon: 'mdi-calendar-clock', color: 'purple darken-2', to: '/admin/expedicoes' },
      { title: 'Loja', subtitle: 'Imagens da loja', icon: 'mdi-school', color: 'purple darken-2', to: '/admin/loja' },
      { title: 'Parceiros', subtitle: 'Parceiros', icon: 'mdi-account-group', color: 'teal darken-2', to: '/admin/parceiros' },
    ]
  }),
  methods: {
    logout() {
      localStorage.removeItem('adminToken'); // Remove a "chave" de acesso
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.transition-swing {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>