import axiosApi from "@/plugins/axios";

const homePageService = {
    async getHomePage() {
        try {
            const response = await axiosApi.get('/home-page')
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

export default homePageService