import axiosApi from "@/plugins/axios";

const agendaService = {
    async getAll() {
        try {
            const response = await axiosApi.get('/agenda')
            return response.data
        } catch (error) {
            console.error(error)
            return []
        }
    },
    async create(data) { return axiosApi.post('/agenda', data) },
    async update(id, data) { return axiosApi.patch(`/agenda/${id}`, data) },
    async delete(id) { return axiosApi.delete(`/agenda/${id}`) }
}

export default agendaService