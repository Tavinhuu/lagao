<template>
  <v-container>
    <v-card class="mb-6">
      <v-card-title>Configurações da Loja</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="loja.endereco" label="Endereço Completo" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea 
              v-model="loja.linkMapa" 
              label="Link do Iframe do Google Maps" 
              hint="Vá no Google Maps > Compartilhar > Incorporar um mapa > Copie apenas o link dentro de src='...'"
              persistent-hint
              outlined 
              rows="3"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="salvarDados">Salvar Informações</v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-card-title>Galeria de Fotos da Loja</v-card-title>
      <v-card-text>
        <v-row class="align-center mb-4">
          <v-col cols="12" md="10">
            <v-text-field v-model="novaFotoUrl" label="URL da Nova Foto" dense outlined hide-details></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn color="success" block @click="adicionarFoto" :disabled="!novaFotoUrl">Adicionar</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="foto in galeria" :key="foto.id" cols="6" md="3">
            <v-img :src="foto.url" height="150" class="grey lighten-2 rounded">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
              <v-btn icon small color="white" class="red mt-1 mr-1 float-right elevation-2" @click="removerFoto(foto)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import LojaService from '@/services/loja.service';

export default {
  data: () => ({
    loja: { endereco: '', linkMapa: '' },
    galeria: [],
    novaFotoUrl: ''
  }),
  created() { this.carregar(); },
  methods: {
    async carregar() {
      try {
        const res = await LojaService.get();
        this.loja = res.data;
        this.galeria = res.data.galeria || [];
      } catch (e) { console.error(e); }
    },
    async salvarDados() {
      try {
        await LojaService.update({ 
            endereco: this.loja.endereco, 
            linkMapa: this.loja.linkMapa 
        });
        alert('Dados salvos!');
      } catch (e) { alert('Erro ao salvar'); }
    },
    async adicionarFoto() {
      if(!this.novaFotoUrl) return;
      try {
        await LojaService.addFoto(this.novaFotoUrl);
        this.novaFotoUrl = '';
        this.carregar();
      } catch (e) { alert('Erro ao adicionar foto'); }
    },
    async removerFoto(foto) {
      if(confirm('Excluir esta foto?')) {
        try {
          await LojaService.removeFoto(foto.id);
          this.carregar();
        } catch (e) { alert('Erro ao excluir'); }
      }
    }
  }
}
</script>