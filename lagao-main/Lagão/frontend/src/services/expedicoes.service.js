import http from '@/plugins/axios'

class ExpedicoesService {
  getAll() { return http.get('/expedicoes') }
  create(data) { return http.post('/expedicoes', data) }
  update(id, data) { return http.patch(`/expedicoes/${id}`, data) }
  delete(id) { return http.delete(`/expedicoes/${id}`) }
}
export default new ExpedicoesService()