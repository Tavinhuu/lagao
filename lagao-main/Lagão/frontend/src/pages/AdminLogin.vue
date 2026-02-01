<template>
  <div class="login-page">
    <div class="bg-image"></div>
    <div class="bg-overlay"></div>

    <v-container class="fill-height justify-center align-center position-relative" style="z-index: 2;">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          
          <v-card class="glass-card rounded-xl pa-8 elevation-20">
            <div class="text-center mb-8">
              <v-avatar color="#D32F2F" size="80" class="mb-4 elevation-10">
                <v-icon size="40" dark>mdi-scuba-diving</v-icon>
              </v-avatar>
              <h2 class="white--text font-weight-black text-uppercase text-h5 tracking-widest">
                Painel Lagão
              </h2>
              <p class="grey--text text--lighten-1 text-caption mt-1">Acesso Administrativo</p>
            </div>

            <v-form @submit.prevent="fazerLogin">
              <v-text-field
                v-model="email"
                label="Usuário"
                outlined
                dark
                color="#D32F2F"
                prepend-inner-icon="mdi-account-circle"
                class="rounded-lg"
              ></v-text-field>

              <v-text-field
                v-model="senha"
                label="Senha"
                outlined
                dark
                type="password"
                color="#D32F2F"
                prepend-inner-icon="mdi-lock"
                class="rounded-lg"
              ></v-text-field>

              <v-alert
                v-if="erro"
                type="error"
                dense
                outlined
                text
                class="mb-6 rounded-lg font-weight-bold"
                icon="mdi-alert-circle"
              >
                Credenciais inválidas. Tente novamente.
              </v-alert>

              <v-btn 
                block 
                x-large 
                color="#D32F2F" 
                class="white--text font-weight-bold rounded-lg elevation-10 btn-glow"
                type="submit" 
                :loading="loading"
              >
                ENTRAR NO SISTEMA
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </v-form>
            
            <div class="text-center mt-8">
              <v-btn text small color="grey lighten-1" to="/" class="text-decoration-none">
                <v-icon left small>mdi-arrow-left</v-icon> Voltar ao Site
              </v-btn>
            </div>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service';

export default {
  name: 'AdminLogin',
  data: () => ({
    email: '',
    senha: '',
    loading: false,
    erro: false
  }),
  methods: {
    async fazerLogin() {
      this.loading = true;
      this.erro = false;
      
      try {
        const sucesso = await AuthService.login(this.email, this.senha);
        if (sucesso) {
          this.$router.push('/admin/dashboard');
        } else {
          this.erro = true;
        }
      } catch (e) {
        this.erro = true;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Garante que a página ocupe 100% da altura da janela e esconda a barra de rolagem se não precisar */
.login-page {
  position: relative;
  min-height: 100vh; /* Ocupa a tela toda */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Evita scroll desnecessário */
}

/* Imagem de Fundo Fixa */
.bg-image {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  /* Imagem de um mergulhador/água */
  background-image: url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  z-index: 0;
}

/* Máscara Escura sobre a imagem */
.bg-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(to bottom right, rgba(0,0,0,0.8), rgba(20,0,0,0.9));
  backdrop-filter: blur(3px);
  z-index: 1;
}

/* Efeito de Vidro no Cartão */
.glass-card {
  background: rgba(30, 30, 30, 0.6) !important; /* Fundo semi-transparente */
  backdrop-filter: blur(15px); /* Desfoque atrás do cartão */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Borda sutil */
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5) !important;
}

.tracking-widest {
  letter-spacing: 3px !important;
}

/* Botão com brilho ao passar o mouse */
.btn-glow {
  transition: all 0.3s ease;
}
.btn-glow:hover {
  box-shadow: 0 0 20px rgba(211, 47, 47, 0.6) !important;
  transform: translateY(-2px);
}
</style>