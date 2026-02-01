import axiosApi from "@/plugins/axios";

const categoriaCursosService = {
    async getCategoriaCursos() {
        try {
            const response = await axiosApi.get('/categoria-cursos')
            return response.data
        } catch (error) {
            console.error(error)
            return []
        }
    },

    // Novos métodos
    async create(data) {
        return axiosApi.post('/categoria-cursos', data)
    },

    async update(id, data) {
        return axiosApi.patch(`/categoria-cursos/${id}`, data)
    },

    async delete(id) {
        return axiosApi.delete(`/categoria-cursos/${id}`)
    }
}

export default categoriaCursosService