<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center">
        Gerenciar Depoimentos (Voz da Tribo)
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="openDialog()">
          Novo Depoimento
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="depoimentos"
        :loading="loading"
        class="elevation-1"
      >
        <template v-slot:[`item.avatar`]="{ item }">
           <v-avatar size="36">
             <img :src="getImagemUrl(item)" v-if="getImagemUrl(item)" alt="avatar">
             <v-icon v-else>mdi-account</v-icon>
           </v-avatar>
        </template>
        
        <template v-slot:[`item.rating`]="{ item }">
          <v-rating :value="item.rating" readonly dense small color="amber" background-color="grey lighten-2"></v-rating>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
        <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="8">
                <v-text-field v-model="editedItem.nome" label="Nome da Pessoa"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <label class="caption grey--text">Nota (Estrelas)</label>
                <v-rating v-model="editedItem.rating" color="amber" background-color="grey lighten-1" hover length="5"></v-rating>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.local" label="Local (Ex: Brasília - DF)"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.data" label="Data" type="date"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field v-model="editedItem.titulo" label="Título Curto (Ex: Experiência Incrível)"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field 
                  v-model="editedItem.urlImagem" 
                  label="URL da Foto (Avatar)"
                  hint="Link da foto de perfil da pessoa"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea v-model="editedItem.texto" label="O que a pessoa falou?" rows="4"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Excluir este depoimento?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="deleteItemConfirm">Sim, Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import DepoimentosService from '@/services/depoimentos.service';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    headers: [
      { text: 'Avatar', value: 'avatar', sortable: false },
      { text: 'Nome', value: 'nome' },
      { text: 'Título', value: 'titulo' },
      { text: 'Local', value: 'local' },
      { text: 'Nota', value: 'rating' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    depoimentos: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      nome: '',
      titulo: '',
      texto: '',
      local: '',
      rating: 5,
      data: new Date().toISOString().substr(0, 10),
      urlImagem: ''
    },
    defaultItem: {
      id: null,
      nome: '',
      titulo: '',
      texto: '',
      local: '',
      rating: 5,
      data: new Date().toISOString().substr(0, 10),
      urlImagem: ''
    },
  }),

  computed: {
    formTitle() { return this.editedIndex === -1 ? 'Novo Depoimento' : 'Editar Depoimento'; },
  },

  created() { this.initialize(); },

  methods: {
    async initialize() {
      this.loading = true;
      try {
        const res = await DepoimentosService.getDepoimentos();
        this.depoimentos = Array.isArray(res) ? res : (res.data || []);
      } catch (e) { console.error(e); } 
      finally { this.loading = false; }
    },

    getImagemUrl(item) {
      if (item.volume && item.volume.url) return item.volume.url;
      return '';
    },

    openDialog() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.depoimentos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      
      this.editedItem.urlImagem = this.getImagemUrl(item);
      
      if(this.editedItem.data) {
          this.editedItem.data = new Date(this.editedItem.data).toISOString().substr(0, 10);
      }

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.depoimentos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        await DepoimentosService.delete(this.editedItem.id);
        this.depoimentos.splice(this.editedIndex, 1);
        this.closeDelete();
      } catch (error) { alert("Erro ao excluir."); }
    },

    close() { this.dialog = false; },
    closeDelete() { this.dialogDelete = false; },

    async save() {
      try {
        const payload = { ...this.editedItem };
        if (payload.rating) payload.rating = Number(payload.rating);

        if (this.editedIndex > -1) {
          await DepoimentosService.update(this.editedItem.id, payload);
        } else {
          delete payload.id;
          await DepoimentosService.create(payload);
        }
        await this.initialize();
        this.close();
      } catch (error) { 
        console.error(error);
        alert("Erro ao salvar. Verifique se todos os campos estão preenchidos."); 
      }
    }
  },
};
</script>