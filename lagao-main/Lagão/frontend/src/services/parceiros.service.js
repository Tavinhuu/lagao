import http from '@/plugins/axios'

class ParceirosService {
  getAll() { return http.get('/parceiros') }
  create(data) { return http.post('/parceiros', data) }
  delete(id) { return http.delete(`/parceiros/${id}`) }
}
export default new ParceirosService()