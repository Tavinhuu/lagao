import http from '@/plugins/axios'

class LojaService {
  get() { return http.get('/loja') }
  update(data) { return http.patch('/loja', data) }
  addFoto(url) { return http.post('/loja/foto', { url }) }
  removeFoto(id) { return http.delete(`/loja/foto/${id}`) }
}
export default new LojaService()