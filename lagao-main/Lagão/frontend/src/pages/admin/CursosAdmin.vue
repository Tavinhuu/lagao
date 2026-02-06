<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center">
        Gerenciar Cursos
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="openDialog()">
          Novo Curso
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="cursos"
        :loading="loading"
        class="elevation-1"
      >
        <template v-slot:[`item.categoriaCurso`]="{ item }">
          {{ item.categoriaCurso ? item.categoriaCurso.nome : 'Sem Categoria' }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.nome" label="Nome do Curso"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.categoriaCurso"
                  :items="listaCategorias"
                  item-text="nome"
                  item-value="id"
                  label="Categoria"
                ></v-select>
              </v-col>
              <v-col cols="12">
  <v-text-field 
    v-model="editedItem.urlImagem" 
    label="URL da Imagem (Ex: https://site.com/foto.jpg)"
    hint="Cole o link de uma imagem da internet"
    persistent-hint
  ></v-text-field>
</v-col>
              <v-col cols="12">
                <v-textarea v-model="editedItem.descricao" label="Descrição Geral" rows="2"></v-textarea>
              </v-col>
              
              <v-col cols="12">
                <h3 class="text-subtitle-1">Detalhes do Conteúdo</h3>
              </v-col>
              <v-col cols="12" md="4">
                <v-textarea v-model="editedItem.descricaoTeorico" label="Descrição Teórica" rows="3"></v-textarea>
              </v-col>
              <v-col cols="12" md="4">
                <v-textarea v-model="editedItem.descricaoAguasConfinadas" label="Águas Confinadas" rows="3"></v-textarea>
              </v-col>
              <v-col cols="12" md="4">
                <v-textarea v-model="editedItem.descricaoAguasAbertas" label="Águas Abertas" rows="3"></v-textarea>
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
        <v-card-title class="text-h5">Excluir este curso?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">Sim, Excluir</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CursosService from '@/services/cursos.service';
// Importamos o service de categoria para preencher o select
import CategoriaService from '@/services/categoriacurso.service';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    // CORREÇÃO AQUI: Vuetify 2 usa 'text' e 'value'
    headers: [
      { text: 'ID', value: 'id', align: 'start' },
      { text: 'Nome', value: 'nome' },
      { text: 'Categoria', value: 'categoriaCurso' }, // Usa o slot personalizado acima
      { text: 'Descrição', value: 'descricao' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    cursos: [],
    listaCategorias: [], // Para o select
    editedIndex: -1,
    editedItem: {
      id: null,
      nome: '',
      urlImagem: '',
      descricao: '',
      descricaoTeorico: '',
      descricaoAguasConfinadas: '',
      descricaoAguasAbertas: '',
      categoriaCurso: null,
    },
    defaultItem: {
      id: null,
      nome: '',
      descricao: '',
      urlImagem: '',
      descricaoTeorico: '',
      descricaoAguasConfinadas: '',
      descricaoAguasAbertas: '',
      categoriaCurso: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Curso' : 'Editar Curso';
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.loading = true;
      try {
        // Carrega cursos e categorias em paralelo
        const [cursosRes, catRes] = await Promise.all([
          CursosService.getAll(),
          CategoriaService.getCategoriaCursos() // Assumindo que você tem esse método
        ]);
        
        this.cursos = cursosRes.data;
        // Se o service de categorias retornar array direto ou dentro de .data, ajuste aqui:
        this.listaCategorias = Array.isArray(catRes) ? catRes : (catRes.data || []);
        
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        this.loading = false;
      }
    },

    openDialog() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.cursos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      
      // Ajuste 1: Pegar o ID da Categoria corretamente
      if (this.editedItem.categoriaCurso && typeof this.editedItem.categoriaCurso === 'object') {
        this.editedItem.categoriaCurso = this.editedItem.categoriaCurso.id;
      }

      // Ajuste 2: Pegar a URL da Imagem (Volume) para preencher o campo de texto
      // O backend retorna 'volume' como um array. Pegamos o primeiro item se existir.
      if (item.volume && Array.isArray(item.volume) && item.volume.length > 0) {
        this.editedItem.urlImagem = item.volume[0].url;
      } else {
        this.editedItem.urlImagem = ''; // Garante que não fique undefined
      }
      
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.cursos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        await CursosService.delete(this.editedItem.id);
        this.cursos.splice(this.editedIndex, 1);
        this.closeDelete();
      } catch (error) {
        alert("Erro ao excluir curso");
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      try {
        // CORREÇÃO: Montamos um payload limpo, APENAS com os campos que o backend espera.
        // Isso remove campos como 'volume', 'agendas', 'createdAt' que causam erro no preload.
        const payload = {
          nome: this.editedItem.nome,
          descricao: this.editedItem.descricao,
          urlImagem: this.editedItem.urlImagem,
          descricaoTeorico: this.editedItem.descricaoTeorico,
          descricaoAguasConfinadas: this.editedItem.descricaoAguasConfinadas,
          descricaoAguasAbertas: this.editedItem.descricaoAguasAbertas,
          // Garante que é número ou null
          categoriaCurso: this.editedItem.categoriaCurso ? Number(this.editedItem.categoriaCurso) : null,
        };

        if (this.editedIndex > -1) {
          // No update, passamos o ID na URL e o payload limpo no corpo
          await CursosService.update(this.editedItem.id, payload);
        } else {
          await CursosService.create(payload);
        }
        
        // Atualiza a tabela e fecha
        this.initialize();
        this.close();
      } catch (error) {
        console.error("Erro detalhado:", error); // Ajuda a ver o erro real no console do navegador
        alert("Erro ao salvar. Verifique o console para mais detalhes.");
      }
    },
  },
};
</script>