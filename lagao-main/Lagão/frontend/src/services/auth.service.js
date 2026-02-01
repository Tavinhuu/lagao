import axiosApi from "@/plugins/axios";

const authService = {
    async login(username, password) {
        try {
            const response = await axiosApi.post('/auth/login', { username, password });
            
            if (response.data && response.data.token) {
                // Salva o token no navegador
                localStorage.setItem('adminToken', response.data.token);
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    },

    isLoggedIn() {
        // Verifica se existe o token salvo
        return !!localStorage.getItem('adminToken');
    }
}

export default authService;