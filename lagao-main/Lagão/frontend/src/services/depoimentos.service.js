import axiosApi from "@/plugins/axios";

const depoimentosService = {
    async getDepoimentos () {
        try {
            const response = await axiosApi.get('/depoimentos')
            return response.data
        } catch (error) {
            console.error(error)
            return []
        }
    },

    async create(data) {
        return axiosApi.post('/depoimentos', data)
    },

    async update(id, data) {
        return axiosApi.patch(`/depoimentos/${id}`, data)
    },

    async delete(id) {
        return axiosApi.delete(`/depoimentos/${id}`)
    }
}

export default depoimentosService