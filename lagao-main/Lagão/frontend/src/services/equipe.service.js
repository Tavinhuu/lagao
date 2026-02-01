import axiosApi from "@/plugins/axios";

const equipeService = {
    async getAll() {
        try {
            const response = await axiosApi.get('/equipe')
            return response.data
        } catch (error) {
            console.error(error)
            return []
        }
    },
    async create(data) { return axiosApi.post('/equipe', data) },
    async update(id, data) { return axiosApi.patch(`/equipe/${id}`, data) },
    async delete(id) { return axiosApi.delete(`/equipe/${id}`) }
}

export default equipeService