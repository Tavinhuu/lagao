<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center">
        Agenda de Expedições (Futuras)
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="openDialog()">
          Nova Expedição
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="expedicoes"
        :loading="loading"
        class="elevation-1"
      >
        <template v-slot:[`item.imagem`]="{ item }">
           <img :src="getImagemUrl(item)" height="40" style="border-radius: 4px;" v-if="getImagemUrl(item)" />
        </template>
        
        <template v-slot:[`item.dataInicio`]="{ item }">
          {{ formataData(item.dataInicio) }}
        </template>

        <template v-slot:[`item.valor`]="{ item }">
          <span class="green--text font-weight-bold">{{ item.valor }}</span>
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
              <v-col cols="12">
                <v-text-field v-model="editedItem.local" label="Local da Expedição" outlined dense></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-text-field 
                  v-model="editedItem.dataInicio" 
                  label="Data de Ida" 
                  type="date"
                  outlined dense
                  InputLabelProps="{ shrink: true }"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field 
                  v-model="editedItem.dataFim" 
                  label="Data de Volta" 
                  type="date"
                  outlined dense
                  InputLabelProps="{ shrink: true }"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field 
                  v-model="editedItem.valor" 
                  label="Valor (Ex: R$ 1.500,00)"
                  outlined dense
                  prepend-inner-icon="mdi-cash"
                ></v-text-field>
              </v-col>

               <v-col cols="12" sm="6">
                <v-text-field 
                  v-model="editedItem.linkPagamento" 
                  label="Link de Pagamento (Opcional)"
                  outlined dense
                  prepend-inner-icon="mdi-link"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field 
                  v-model="editedItem.urlImagem" 
                  label="Foto de Capa (URL)"
                  hint="Cole o link da imagem que aparecerá no card"
                  persistent-hint
                  outlined dense
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-textarea 
                  v-model="editedItem.descricao" 
                  label="Detalhes da Expedição" 
                  rows="3" 
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="close">Cancelar</v-btn>
          <v-btn color="primary" depressed @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Excluir esta expedição?</v-card-title>
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
import ExpedicoesService from '@/services/expedicoes.service';

export default {
  name: "ExpedicoesAdmin",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Capa', value: 'imagem', sortable: false },
      { text: 'Local', value: 'local' },
      { text: 'Data Início', value: 'dataInicio' },
      { text: 'Valor', value: 'valor' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    expedicoes: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      local: '',
      descricao: '',
      dataInicio: '',
      dataFim: '',
      valor: '',
      linkPagamento: '',
      urlImagem: ''
    },
    defaultItem: {
      id: null,
      local: '',
      descricao: '',
      dataInicio: '',
      dataFim: '',
      valor: '',
      linkPagamento: '',
      urlImagem: ''
    },
  }),

  computed: {
    formTitle() { return this.editedIndex === -1 ? 'Nova Expedição' : 'Editar Expedição'; },
  },

  created() { this.initialize(); },

  methods: {
    async initialize() {
      this.loading = true;
      try {
        const res = await ExpedicoesService.getAll();
        this.expedicoes = res.data;
      } catch (e) { 
        console.error(e);
        // Opcional: Adicionar notificação de erro aqui
      } finally { 
        this.loading = false; 
      }
    },

    getImagemUrl(item) {
      if (item.volume && item.volume.length > 0) return item.volume[0].url;
      return '';
    },

    formataData(data) {
      if (!data) return '';
      // Ajuste simples para exibir DD/MM/AAAA
      const dateParts = data.split('T')[0].split('-'); 
      if(dateParts.length === 3) return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      return data;
    },

    openDialog() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.expedicoes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      
      // Recupera a URL da imagem para edição
      this.editedItem.urlImagem = this.getImagemUrl(item);
      
      // Formata datas para o input type="date" (YYYY-MM-DD)
      if(this.editedItem.dataInicio && typeof this.editedItem.dataInicio === 'string') 
          this.editedItem.dataInicio = this.editedItem.dataInicio.split('T')[0];
      if(this.editedItem.dataFim && typeof this.editedItem.dataFim === 'string') 
          this.editedItem.dataFim = this.editedItem.dataFim.split('T')[0];

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.expedicoes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        await ExpedicoesService.delete(this.editedItem.id);
        this.expedicoes.splice(this.editedIndex, 1);
        this.closeDelete();
      } catch (error) { 
        alert("Erro ao excluir expedição."); 
      }
    },

    close() { this.dialog = false; },
    closeDelete() { this.dialogDelete = false; },

    async save() {
      try {
        const payload = { ...this.editedItem };

 
        // Transforma string vazia em undefined para não dar erro no backend
        if (!payload.dataFim) delete payload.dataFim;
        if (!payload.linkPagamento) delete payload.linkPagamento;
        if (!payload.urlImagem) delete payload.urlImagem;
        
        if (!payload.id) delete payload.id;

        console.log("Enviando payload:", payload);
        
        if (this.editedIndex > -1) {
          // Update
          await ExpedicoesService.update(this.editedItem.id, payload);
        } else {
          // Create
          delete payload.id;
          await ExpedicoesService.create(payload);
        }
        await this.initialize(); // Recarrega a lista
        this.close();
      } catch (error) { 
        console.error(error);
        const msg = error.response?.data?.message || "Erro ao salvar.";
        alert("Erro: " + (Array.isArray(msg) ? msg.join(', ') : msg));
      }
    }
  },
};
</script>