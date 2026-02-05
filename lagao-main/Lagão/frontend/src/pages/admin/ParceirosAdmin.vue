<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center">
        Gestão de Parceiros
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog = true">Novo Parceiro</v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="parceiros" :loading="loading">
        <template v-slot:[`item.logo`]="{ item }">
          <img :src="getLogo(item)" height="40" style="border-radius:4px" v-if="getLogo(item)"/>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click="deletar(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Novo Parceiro</v-card-title>
        <v-card-text>
          <v-text-field v-model="novo.nome" label="Nome do Parceiro" outlined></v-text-field>
          <v-textarea v-model="novo.descricao" label="Breve Descrição" outlined rows="2"></v-textarea>
          <v-text-field v-model="novo.link" label="Link (Site/Instagram)" outlined></v-text-field>
          <v-text-field v-model="novo.urlLogo" label="URL do Logo" outlined></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="salvar">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ParceirosService from '@/services/parceiros.service';

export default {
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: 'Logo', value: 'logo', sortable: false },
      { text: 'Nome', value: 'nome' },
      { text: 'Descrição', value: 'descricao' },
      { text: 'Ações', value: 'actions', sortable: false }
    ],
    parceiros: [],
    novo: { nome: '', descricao: '', link: '', urlLogo: '' }
  }),
  created() { this.carregar() },
  methods: {
    async carregar() {
      this.loading = true;
      try {
        const res = await ParceirosService.getAll();
        this.parceiros = res.data;
      } finally { this.loading = false; }
    },
    getLogo(item) {
      return (item.logo && item.logo.length) ? item.logo[0].url : '';
    },
    async salvar() {
      try {
        await ParceirosService.create(this.novo);
        this.novo = { nome: '', descricao: '', link: '', urlLogo: '' };
        this.dialog = false;
        this.carregar();
      } catch (e) { alert('Erro ao salvar'); }
    },
    async deletar(item) {
      if(confirm('Remover este parceiro?')) {
        await ParceirosService.delete(item.id);
        this.carregar();
      }
    }
  }
}
</script>