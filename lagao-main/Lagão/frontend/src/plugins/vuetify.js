import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true, // Isso é CRUCIAL para o fundo escuro funcionar
    themes: {
      dark: {
        primary: '#D32F2F',    // Vermelho
        secondary: '#FFFFFF',
        accent: '#FF5252',
        background: '#121212', // Preto Fundo
        surface: '#1E1E1E',    // Cinza Card
      },
    },
  },
  icons: {
    iconfont: "mdi",
  },
});