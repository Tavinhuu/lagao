import http from '@/plugins/axios'

class HomePageService {
    getHomePage() {
        return http.get('/home-page').then(response => response.data);
    }

    create(data) {
        return http.post('/home-page', data);
    }

    delete(id) {
        return http.delete(`/home-page/${id}`);
    }
}

export default new HomePageService();