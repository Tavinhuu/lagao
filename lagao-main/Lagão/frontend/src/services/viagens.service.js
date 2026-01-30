import axiosApi from "@/plugins/axios";

const viagensService = {
    async getViagens() {
        try {
            const response = await axiosApi.get('/viagens')
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

export default viagensService
