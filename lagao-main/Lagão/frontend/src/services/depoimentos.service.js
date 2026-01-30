import axiosApi from "@/plugins/axios";

const depoimentosService = {
    async getDepoimentos () {
        try {
            const response = await axiosApi.get('/depoimentos')
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

export default depoimentosService