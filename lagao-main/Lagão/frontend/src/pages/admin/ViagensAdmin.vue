<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center">
        Portfólio de Viagens (Já Realizadas)
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="openDialog()">
          Nova Viagem
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="viagens"
        :loading="loading"
        class="elevation-1"
      >
        <template v-slot:[`item.imagem`]="{ item }">
           <img :src="getImagemUrl(item)" height="40" style="border-radius: 4px;" v-if="getImagemUrl(item)" />
        </template>
        
        <template v-slot:[`item.inicioViagem`]="{ item }">
          {{ formataData(item.inicioViagem) }}
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
                <v-text-field v-model="editedItem.destino" label="Destino (Local)"></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-text-field 
                  v-model="editedItem.inicioViagem" 
                  label="Quando foi? (Início)" 
                  type="date"
                  InputLabelProps="{ shrink: true }"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field 
                  v-model="editedItem.fimViagem" 
                  label="Quando voltou? (Fim)" 
                  type="date"
                  InputLabelProps="{ shrink: true }"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field 
                  v-model="editedItem.urlImagem" 
                  label="Foto da Viagem (URL)"
                  hint="Cole o link de uma foto para relembrar a viagem"
                  persistent-hint
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-textarea v-model="editedItem.descricao" label="Como foi a viagem? (Descrição)" rows="3"></v-textarea>
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
        <v-card-title class="text-h5">Excluir esta viagem?</v-card-title>
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
import ViagensService from '@/services/viagens.service';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Foto', value: 'imagem', sortable: false },
      { text: 'Destino', value: 'destino' },
      { text: 'Data', value: 'inicioViagem' }, // Removido Preço
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    viagens: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      destino: '',
      descricao: '',
      inicioViagem: '',
      fimViagem: '',
      urlImagem: ''
      // Removido Preço e Vagas
    },
    defaultItem: {
      id: null,
      destino: '',
      descricao: '',
      inicioViagem: '',
      fimViagem: '',
      urlImagem: ''
    },
  }),

  computed: {
    formTitle() { return this.editedIndex === -1 ? 'Registrar Viagem' : 'Editar Viagem'; },
  },

  created() { this.initialize(); },

  methods: {
    async initialize() {
      this.loading = true;
      try {
        const res = await ViagensService.getAll();
        this.viagens = res.data;
      } catch (e) { console.error(e); } 
      finally { this.loading = false; }
    },

    getImagemUrl(item) {
      if (item.volume && item.volume.length > 0) return item.volume[0].url;
      return '';
    },

    formataData(data) {
      if (!data) return '';
      // Ajuste para fuso horário simples
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
      this.editedIndex = this.viagens.indexOf(item);
      this.editedItem = Object.assign({}, item);
      
      this.editedItem.urlImagem = this.getImagemUrl(item);
      
      // Ajusta datas para o input type="date"
      if(this.editedItem.inicioViagem && typeof this.editedItem.inicioViagem === 'string') 
          this.editedItem.inicioViagem = this.editedItem.inicioViagem.split('T')[0];
      if(this.editedItem.fimViagem && typeof this.editedItem.fimViagem === 'string') 
          this.editedItem.fimViagem = this.editedItem.fimViagem.split('T')[0];

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.viagens.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        await ViagensService.delete(this.editedItem.id);
        this.viagens.splice(this.editedIndex, 1);
        this.closeDelete();
      } catch (error) { alert("Erro ao excluir viagem"); }
    },

    close() { this.dialog = false; },
    closeDelete() { this.dialogDelete = false; },

    async save() {
      try {
        const payload = {
          destino: this.editedItem.destino,
          descricao: this.editedItem.descricao,
          inicioViagem: this.editedItem.inicioViagem, // Já está no formato YYYY-MM-DD do input date
          fimViagem: this.editedItem.fimViagem,       // Já está no formato YYYY-MM-DD do input date
          urlImagem: this.editedItem.urlImagem
        };

        if (this.editedIndex > -1) {
          await ViagensService.update(this.editedItem.id, payload);
        } else {
          await ViagensService.create(payload);
        }
        
        await this.initialize();
        this.close();
      } catch (error) {
        console.error("Erro detalhado:", error);
        alert("Erro ao salvar. Verifique se as datas estão preenchidas.");
      }
    }
  },
};
</script>