import axiosApi from "@/plugins/axios";

const categoriaCursosService = {
    async getCategoriaCursos() {
        try {
            const response = await axiosApi.get('/categoria-cursos')
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

export default categoriaCursosService
