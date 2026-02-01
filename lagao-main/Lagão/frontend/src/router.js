import Vue from 'vue'
import VueRouter from 'vue-router'

// Páginas Públicas
import Home from './pages/home/index.vue'
import QuemSomos from './pages/quemSomos/index.vue'
import Agenda from './pages/agenda/index.vue'
import Cursos from './pages/cursos/index.vue'
import FaleConosco from './pages/faleConosco/index.vue'
import Loja from './pages/loja/index.vue'
import Midia from './pages/midia/index.vue'
import Viagens from './pages/viagens/index.vue'
import NotFound from './components/layout/notFound.vue'

// Páginas Admin
import AdminLogin from './pages/AdminLogin.vue'; // <--- IMPORTANTE: Importar o Login
import Dashboard from './pages/admin/Dashboard.vue'; 

Vue.use(VueRouter)

const routes = [
  // Rota de Login (Essencial para o sistema funcionar)
  { path: '/login', name: 'Login', component: AdminLogin },

  // Painel Admin (Protegido)
  { 
    path: '/admin/dashboard', 
    name: 'Dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true } 
  },

  // Módulos Admin (Protegidos)
  { path: '/admin/cursos', component: () => import('./pages/admin/CursosAdmin.vue'), meta: { requiresAuth: true } },
  { path: '/admin/categorias', component: () => import('./pages/admin/CategoriasAdmin.vue'), meta: { requiresAuth: true } },
  { path: '/admin/viagens', component: () => import('./pages/admin/ViagensAdmin.vue'), meta: { requiresAuth: true } },
  { path: '/admin/agenda', component: () => import('./pages/admin/AgendaAdmin.vue'), meta: { requiresAuth: true } },
  { path: '/admin/equipe', component: () => import('./pages/admin/EquipeAdmin.vue'), meta: { requiresAuth: true } },
  { path: '/admin/depoimentos', component: () => import('./pages/admin/DepoimentosAdmin.vue'), meta: { requiresAuth: true } },
  
  // Rotas Públicas
  { path: '/', component: Home },
  { path: '/quemsomos', component: QuemSomos },
  { path: '/agenda', component: Agenda },
  {
    path: '/cursos',
    component: Cursos,
    name: 'Cursos',
    props: true 
  },
  { path: '/faleconosco', component: FaleConosco },
  { path: '/loja', component: Loja },
  { path: '/midia', component: Midia },
  { path: '/viagens', component: Viagens },
  
  // Rota 404 (Deve ser sempre a última)
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('adminToken');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next(); 
  }
});

export default router