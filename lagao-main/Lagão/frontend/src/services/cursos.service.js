import http from "@/plugins/axios";

class CursosService {
  // Padronizamos para getAll (igual ao Admin)
  getAll() {
    return http.get('/cursos')
  }

  get(id) {
    return http.get(`/cursos/${id}`)
  }

  create(data) {
    return http.post('/cursos', data)
  }

  update(id, data) {
    return http.patch(`/cursos/${id}`, data)
  }

  delete(id) {
    return http.delete(`/cursos/${id}`)
  }
}

export default new CursosService();