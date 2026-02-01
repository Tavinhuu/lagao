import http from '@/plugins/axios'

class ViagensService {
  getAll() {
    return http.get('/viagens')
  }

  get(id) {
    return http.get(`/viagens/${id}`)
  }

  create(data) {
    return http.post('/viagens', data)
  }

  update(id, data) {
    return http.patch(`/viagens/${id}`, data)
  }

  delete(id) {
    return http.delete(`/viagens/${id}`)
  }
}

export default new ViagensService()