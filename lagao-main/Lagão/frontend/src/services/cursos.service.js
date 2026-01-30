import axiosApi from "@/plugins/axios";

const cursoService = {
    async getCursos() {
        try {
            const response = await axiosApi.get('/cursos')
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

export default cursoService
