<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center">
        Gerenciar Categorias
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="openDialog()">
          Nova Categoria
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="categorias"
        :loading="loading"
        class="elevation-1"
      >
        <template v-slot:[`item.imagem`]="{ item }">
           <img :src="item.volume ? item.volume.url : ''" height="40" v-if="item.volume" />
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedItem.nome" label="Nome da Categoria"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field 
                  v-model="editedItem.urlImagem" 
                  label="URL da Imagem de Capa"
                  hint="Imagem que aparece na Home Page"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="editedItem.descricao" label="Descrição" rows="3"></v-textarea>
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
        <v-card-title class="text-h5">Excluir esta categoria?</v-card-title>
        <v-card-text>Cuidado: Isso pode afetar cursos vinculados a ela!</v-card-text>
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
import CategoriaService from '@/services/categoriacurso.service';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Capa', value: 'imagem', sortable: false },
      { text: 'Nome', value: 'nome' },
      { text: 'Descrição', value: 'descricao' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    categorias: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      nome: '',
      descricao: '',
      urlImagem: ''
    },
    defaultItem: {
      id: null,
      nome: '',
      descricao: '',
      urlImagem: ''
    },
  }),

  computed: {
    formTitle() { return this.editedIndex === -1 ? 'Nova Categoria' : 'Editar Categoria'; },
  },

  created() { this.initialize(); },

  methods: {
    async initialize() {
      this.loading = true;
      try {
        const res = await CategoriaService.getCategoriaCursos();
        this.categorias = Array.isArray(res) ? res : (res.data || []);
      } catch (e) { console.error(e); } 
      finally { this.loading = false; }
    },

    openDialog() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.categorias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // Puxa URL da imagem se existir
      if (item.volume) {
          this.editedItem.urlImagem = item.volume.url;
      }
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.categorias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        await CategoriaService.delete(this.editedItem.id);
        this.categorias.splice(this.editedIndex, 1);
        this.closeDelete();
      } catch (error) { alert("Erro ao excluir. Verifique se existem cursos vinculados!"); }
    },

    close() { this.dialog = false; },
    closeDelete() { this.dialogDelete = false; },

    async save() {
      try {

        const payload = {
          nome: this.editedItem.nome,
          descricao: this.editedItem.descricao,
          urlImagem: this.editedItem.urlImagem,
        };

        if (this.editedIndex > -1) {
          await CategoriaService.update(this.editedItem.id, payload);
        } else {
          await CategoriaService.create(payload);
        }
        
        await this.initialize();
        this.close();
      } catch (error) {
        console.error("Erro detalhado:", error);
        alert("Erro ao salvar categoria.");
      }
    }
  },
};
</script>