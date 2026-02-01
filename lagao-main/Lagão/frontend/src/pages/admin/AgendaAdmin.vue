<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center">
        Gerenciar Agenda
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="openDialog()">Novo Evento</v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="agendas" :loading="loading" class="elevation-1">
        
        <template v-slot:[`item.data`]="{ item }">
          {{ formataDataHora(item.data) }}
        </template>
        
        <template v-slot:[`item.titulo`]="{ item }">
           <span class="font-weight-bold">{{ item.titulo }}</span>
           <div class="caption grey--text">{{ item.local }}</div>
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
              <v-col cols="12" sm="8">
                <v-text-field v-model="editedItem.titulo" label="Título do Evento"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field 
                  v-model="editedItem.data" 
                  label="Data e Hora" 
                  type="datetime-local"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field v-model="editedItem.local" label="Local (Ex: Piscina, Auditório)"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea v-model="editedItem.descricao" label="Descrição / Detalhes" rows="3"></v-textarea>
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
        <v-card-title class="text-h5">Excluir evento?</v-card-title>
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
import AgendaService from '@/services/agenda.service';

export default {
  data: () => ({
    dialog: false, dialogDelete: false, loading: false,
    headers: [
      { text: 'Evento', value: 'titulo' },
      { text: 'Data/Hora', value: 'data' },
      { text: 'Descrição', value: 'descricao' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    agendas: [],
    editedIndex: -1,
    editedItem: { id: null, titulo: '', descricao: '', local: '', data: '' },
    defaultItem: { id: null, titulo: '', descricao: '', local: '', data: '' },
  }),
  computed: { formTitle() { return this.editedIndex === -1 ? 'Novo Evento' : 'Editar Evento'; } },
  created() { this.initialize(); },
  methods: {
    async initialize() {
      this.loading = true;
      try {
        const res = await AgendaService.getAll();
        this.agendas = res || [];
      } catch (e) { console.error(e); } finally { this.loading = false; }
    },
    
    formataDataHora(data) {
        if(!data) return '';
        const d = new Date(data);
        return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
    },

    openDialog() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedItem.data = new Date().toISOString().slice(0, 16);
      this.editedIndex = -1;
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.agendas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      if(this.editedItem.data) {
          this.editedItem.data = new Date(this.editedItem.data).toISOString().slice(0, 16);
      }
      this.dialog = true;
    },

    deleteItem(item) { this.editedIndex = this.agendas.indexOf(item); this.editedItem = Object.assign({}, item); this.dialogDelete = true; },
    async deleteItemConfirm() {
      await AgendaService.delete(this.editedItem.id); this.agendas.splice(this.editedIndex, 1); this.closeDelete();
    },
    close() { this.dialog = false; }, closeDelete() { this.dialogDelete = false; },
    
    async save() {
      const payload = { ...this.editedItem };
      if (this.editedIndex > -1) await AgendaService.update(this.editedItem.id, payload);
      else { delete payload.id; await AgendaService.create(payload); }
      await this.initialize(); this.close();
    }
  },
};
</script>