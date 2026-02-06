<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center">
        Gerenciar Equipe / Instrutores
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="openDialog()">Novo Membro</v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="equipe" :loading="loading" class="elevation-1">
        <template v-slot:[`item.avatar`]="{ item }">
           <v-avatar size="40">
             <img :src="getImagemUrl(item)" v-if="getImagemUrl(item)">
             <v-icon v-else>mdi-account</v-icon>
           </v-avatar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6"><v-text-field v-model="editedItem.nome" label="Nome"></v-text-field></v-col>
              <v-col cols="12" sm="6"><v-text-field v-model="editedItem.cargo" label="Cargo (Ex: Instrutor)"></v-text-field></v-col>
              <v-col cols="12"><v-text-field v-model="editedItem.urlImagem" label="URL da Foto" hint="Link da foto do instrutor"></v-text-field></v-col>
              <v-col cols="12">
                <p class="caption grey--text">Descrição (Aceita HTML básico como &lt;p&gt;)</p>
                <v-textarea v-model="editedItem.descricao" label="Descrição / Bio" rows="5"></v-textarea>
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
        <v-card-title class="text-h5">Excluir este membro?</v-card-title>
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
import EquipeService from '@/services/equipe.service';

export default {
  data: () => ({
    dialog: false, dialogDelete: false, loading: false,
    headers: [
      { text: 'Foto', value: 'avatar', sortable: false },
      { text: 'Nome', value: 'nome' },
      { text: 'Cargo', value: 'cargo' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    equipe: [], editedIndex: -1,
    editedItem: { id: null, nome: '', cargo: '', descricao: '', urlImagem: '' },
    defaultItem: { id: null, nome: '', cargo: '', descricao: '', urlImagem: '' },
  }),
  computed: { formTitle() { return this.editedIndex === -1 ? 'Novo Membro' : 'Editar Membro'; } },
  created() { this.initialize(); },
  methods: {
    async initialize() {
      this.loading = true;
      try { const res = await EquipeService.getAll(); this.equipe = res || []; } 
      catch (e) { console.error(e); } finally { this.loading = false; }
    },
    getImagemUrl(item) { return (item.volume && item.volume.url) ? item.volume.url : ''; },
    openDialog() { this.editedItem = Object.assign({}, this.defaultItem); this.editedIndex = -1; this.dialog = true; },
    editItem(item) {
      this.editedIndex = this.equipe.indexOf(item); this.editedItem = Object.assign({}, item);
      this.editedItem.urlImagem = this.getImagemUrl(item);
      this.dialog = true;
    },
    deleteItem(item) { this.editedIndex = this.equipe.indexOf(item); this.editedItem = Object.assign({}, item); this.dialogDelete = true; },
    async deleteItemConfirm() {
      await EquipeService.delete(this.editedItem.id); this.equipe.splice(this.editedIndex, 1); this.closeDelete();
    },
    close() { this.dialog = false; }, closeDelete() { this.dialogDelete = false; },
    async save() {
      try {
        const payload = {
          nome: this.editedItem.nome,
          cargo: this.editedItem.cargo,
          descricao: this.editedItem.descricao,
          urlImagem: this.editedItem.urlImagem
        };

        if (this.editedIndex > -1) {
          // Update
          await EquipeService.update(this.editedItem.id, payload);
        } else {
          // Create
          await EquipeService.create(payload);
        }
        
        await this.initialize();
        this.close();
      } catch (error) {
        console.error("Erro ao salvar equipe:", error);
        alert("Erro ao salvar. Verifique o console.");
      }
    }
  },
};
</script>