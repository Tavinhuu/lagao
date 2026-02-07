<template>
  <v-container>
    <v-card class="mb-6">
      <v-card-title class="headline">Gerenciar Banners da Home</v-card-title>
      <v-card-subtitle>Adicione novos banners para o carrossel principal</v-card-subtitle>
      
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field 
                v-model="novoBanner.titulo" 
                label="Título Principal" 
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field 
                v-model="novoBanner.subTitulo" 
                label="Subtítulo" 
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field 
                v-model="novoBanner.textoBotao" 
                label="Texto do Botão" 
                placeholder="Ex: Começar Agora"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field 
                v-model="novoBanner.url" 
                label="URL da Imagem de Fundo" 
                hint="Link direto da imagem"
                persistent-hint
                outlined 
                dense
                :rules="[v => !!v || 'URL é obrigatória']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          color="primary" 
          @click="adicionarBanner" 
          :disabled="!valid || !novoBanner.url"
          :loading="loading"
        >
          Adicionar Banner
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-divider class="my-6"></v-divider>

    <h2 class="text-h5 mb-4">Banners Ativos</h2>

    <v-row v-if="banners.length">
      <v-col v-for="banner in banners" :key="banner.id" cols="12" md="6" lg="4">
        <v-card class="elevation-4">
          <v-img 
            :src="banner.volume ? banner.volume.url : ''" 
            height="200" 
            class="white--text align-end gradient-overlay"
            cover
          >
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
            </template>
            <v-card-title class="pb-0 text-shadow">{{ banner.titulo }}</v-card-title>
            <v-card-subtitle class="white--text pt-1 text-shadow">{{ banner.subTitulo }}</v-card-subtitle>
          </v-img>
          
          <v-card-actions>
            <v-chip small label class="mr-2">{{ banner.textoBotao }}</v-chip>
            <v-spacer></v-spacer>
            <v-btn icon color="red" @click="removerBanner(banner.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-else type="info" text>
      Nenhum banner cadastrado no momento.
    </v-alert>

  </v-container>
</template>

<script>
import homeService from '@/services/home.service';

export default {
  data: () => ({
    valid: false,
    loading: false,
    banners: [],
    novoBanner: {
      titulo: '',
      subTitulo: '',
      textoBotao: 'Começar Agora',
      url: ''
    }
  }),
  created() {
    this.carregarBanners();
  },
  methods: {
    async carregarBanners() {
      try {
        const res = await homeService.getHomePage();
        this.banners = Array.isArray(res) ? res : [res];
      } catch (e) {
        console.error("Erro ao carregar banners", e);
      }
    },
    async adicionarBanner() {
      if (!this.$refs.form.validate()) return;
      
      this.loading = true;
      try {
        await homeService.create(this.novoBanner);
        this.$toast ? this.$toast.success('Banner adicionado!') : alert('Banner adicionado!');
        this.limparFormulario();
        await this.carregarBanners();
      } catch (e) {
        console.error(e);
        this.$toast ? this.$toast.error('Erro ao adicionar') : alert('Erro ao adicionar');
      } finally {
        this.loading = false;
      }
    },
    async removerBanner(id) {
      if (confirm('Tem certeza que deseja remover este banner?')) {
        try {
          await homeService.delete(id);
          this.carregarBanners();
        } catch (e) {
          alert('Erro ao excluir banner');
        }
      }
    },
    limparFormulario() {
      this.novoBanner = {
        titulo: '',
        subTitulo: '',
        textoBotao: 'Começar Agora',
        url: ''
      };
      this.$refs.form.resetValidation();
    }
  }
}
</script>

<style scoped>
.text-shadow {
  text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
}
.gradient-overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
}
</style>