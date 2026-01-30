import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './pages/home/index.vue'
import QuemSomos from './pages/quemSomos/index.vue'
import Agenda from './pages/agenda/index.vue'
import Cursos from './pages/cursos/index.vue'
import FaleConosco from './pages/faleConosco/index.vue'
import Loja from './pages/loja/index.vue'
import Midia from './pages/midia/index.vue'
import Viagens from './pages/viagens/index.vue'
import NotFound from './components/layout/notFound.vue'

Vue.use(VueRouter)

const routes = [
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
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
