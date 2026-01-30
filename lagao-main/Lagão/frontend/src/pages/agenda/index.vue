<template>
  <v-container class="my-15" :style="{ width: '90%' }" fluid>
    <!-- Controle de Navegação do Mês -->
    <div align="center">
      <v-row justify="space-between" align="center" class="month-navigation">
        <v-btn icon @click="mudarMes(-1)">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <h1 class="mx-15">{{ mesAtualNome }}/{{ anoAtual }}</h1>
        <v-btn icon @click="mudarMes(1)">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </div>

    <div class="calendar-wrapper">
      <!-- Calendario -->
      <div class="calendar pt-10">
        <!-- Cabeçalho do Calendário -->
        <div class="calendar-header">
          <div v-for="dia in diasSemana" :key="dia" class="calendar-header-item">
            {{ dia.toUpperCase() }}
          </div>
        </div>
        <!-- Corpo do Calendário -->
        <div class="calendar-body">
          <div v-for="(dia, index) in diasDoMes" :key="index" class="calendar-day px-5 pb-5" :class="{ vazio: !dia.numero }">
            <div v-if="dia.numero" class="day-number d-flex flex-row-reverse pt-1">{{ dia.numero }}</div>
  
            <!-- Botão Eventos -->
            <div v-if="dia.eventos.length">
              <div 
                v-for="evento in dia.eventos" 
                :key="evento.id" 
                class="pt-1"
                >
                <v-btn 
                @click="mostrarDetalhes(evento, $event)"
                block 
                rounded 
                class="d-flex justify-space-between align-center"
                :style="{ 
                  backgroundColor: pegarCorBotao(evento.tipo).backgroundColor, 
                  color: pegarCorBotao(evento.tipo).color, 
                  textTransform: 'none'}"
                >
                  <h5 class="ma-0 pa-0">{{ evento.nome }}</h5>
                  <v-icon
                    right
                    light
                  >
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
              </div>
            </div>
  
            <!-- Botão Cursos -->
            <div v-if="dia.cursos.length" class="event-marker">
              <div
                v-for="curso in dia.cursos"
                :key="curso.id"
                :class="['event-marker', 'curso']"
                class="pt-1"
                >
                <v-btn
                  @click="mostrarDetalhes(curso, $event)"
                  block 
                  rounded 
                  class="d-flex justify-space-between align-center"
                  :style="{ 
                    backgroundColor: pegarCorBotao(`curso`).backgroundColor, 
                    color: pegarCorBotao(`curso`).color, 
                    textTransform: 'none'}"
                >
                  <h5 class="ma-0 pa-0">{{ curso.nome }}</h5>
                  <v-icon
                    right
                    light
                  >
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
              </div>
            </div>
  
            <!-- Botão Viagens -->
            <div v-if="dia.viagens.length" class="event-marker">
              <div
                v-for="viagem in dia.viagens"
                :key="viagem.id"
                :class="['event-marker', 'viagem']"
                class="pt-1"
                >
                <v-btn
                  @click="mostrarDetalhes(viagem, $event)"
                  block 
                  rounded 
                  class="d-flex justify-space-between align-center"
                  :style="{ 
                    backgroundColor: pegarCorBotao(`viagem`).backgroundColor, 
                    color: pegarCorBotao(`viagem`).color, 
                    textTransform: 'none'}"
                >
                  <h5 class="ma-0 pa-0">{{ viagem.destino }}</h5>
                  <v-icon
                    right
                    light
                  >
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </div>

    <!-- Card de Detalhes do Evento -->
    <v-card 
      v-if="cardVisivel" 
      ref="card"
      class="event-details"
      elevation="20"
      :style="{ top: cardPosition.top, left: cardPosition.left, position: 'absolute' }"
      >
      <div class="d-flex flex-row-reverse">
        <v-btn 
          icon 
          small 
          @click="cardVisivel = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-no-wrap justify-space-between">
        <v-avatar
        class="mb-6 ml-5 mr-3"
        size="250"
        rounded
        >
          <v-img :src="detalhesEvento.volume.url"></v-img>
        </v-avatar>
      
        <div>
          <v-card-title v-if="detalhesEvento.nome" class="subtitle-1 font-weight-black">{{ detalhesEvento.nome }}</v-card-title>
          <v-card-title v-if="detalhesEvento.destino" class="subtitle-1 font-weight-black">{{ detalhesEvento.destino }}</v-card-title>
          
          <v-card-text>

            <!-- Tempo/Data Viagem -->
            <div v-if="detalhesEvento.inicioViagem" class="d-flex flex-no-wrap justify-space-between align-content-center">
              <p>  
                <v-icon color="#A92827">mdi-clock-time-four-outline</v-icon>
                {{ detalhesEvento.duracao }}
              </p>
              <p>
                <v-icon color="#A92827">mdi-calendar-month-outline</v-icon>
                {{ detalhesEvento.inicioViagem }}
              </p>
            </div>

            <!-- Tempo/Data Evento -->
            <div v-if="detalhesEvento.data" class="d-flex flex-no-wrap justify-space-between align-content-center">
              <p>  
                <v-icon color="#A92827">mdi-clock-time-four-outline</v-icon>
                {{ detalhesEvento.tempo }}
              </p>
              <p>
                <v-icon color="#A92827">mdi-calendar-month-outline</v-icon>
                {{ detalhesEvento.data }}
              </p>
            </div>

            <div>
              <p v-if="detalhesEvento.subtituloDescricao" class="subtitle-1 font-weight-bold">{{ detalhesEvento.subtituloDescricao }}</p>
              <p v-if="detalhesEvento.titulo" class="subtitle-1 font-weight-bold">{{ detalhesEvento.titulo }}</p>
              
              <p class="caption">{{ detalhesEvento.descricao }}</p>
            </div>

            <v-btn block color='#A92827' class="white--text text-capitalize font-weight-medium" :href="detalhesEvento.link">Mais Detalhes</v-btn>
          </v-card-text>
        </div>
      </div>
    </v-card>

    <!-- Legenda -->
    <div class="legend pt-10">
      <div class="legend-item">
        <span class="legend-box" style="background-color: #A92827;"></span>
        <span>Viagens</span>
      </div>
      <div class="legend-item">
        <span class="legend-box" style="background-color: #171717;"></span>
        <span>Cursos</span>
      </div>
      <div class="legend-item">
        <span class="legend-box" style="background-color: #E5E4E4;"></span>
        <span>Eventos</span>
      </div>
    </div>
  </v-container>
</template>

<script>
import viagensService from '@/services/viagens.service';
import cursoService from "@/services/cursos.service";

export default {
  name: "indexAgenda",
  data() {
    return {
      mesAtual: new Date().getMonth(),
      anoAtual: new Date().getFullYear(),
      eventos: [],
      viagens: [],
      cursos: [],
      detalhesEvento: null,
      diasSemana: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      cardPosition: { top: "0px", left: "0px" },
      cardVisivel: false
    }
  },
  computed: {
    mesAtualNome() {
      let mes = new Date(this.anoAtual, this.mesAtual).toLocaleString('default', { month: 'long' });
      return mes.charAt(0).toUpperCase() + mes.slice(1)
    },
    diasDoMes() {
      let dias = [];
      let primeiroDiaSemana = new Date(this.anoAtual, this.mesAtual, 1).getDay();
      let totalDias = new Date(this.anoAtual, this.mesAtual + 1, 0).getDate();
      
      for (let i = 0; i < primeiroDiaSemana; i++) {
        dias.push({ numero: null, eventos: [], viagens: [], cursos: [] });
      }
      console.log(this.eventos);
      
      for (let i = 1; i <= totalDias; i++) {
        let data = `${this.anoAtual}/${String(this.mesAtual + 1).padStart(2, '0')}/${String(i).padStart(2, '0')}`
        dias.push({
          numero: i,
          data,
          eventos: this.eventos.filter(e => e.data === data),
          cursos: this.cursos.filter(e => 
                          e.agendas.some(a => {
                            const dataInv = a.data.split('/').reverse().join('/')
                            return dataInv === data
                          })),
          viagens: this.viagens.filter(e =>
                          e.agendas.some(a => {
                            const dataInv = a.data.split('/').reverse().join('/')
                            return dataInv === data
                          }))

        });
      }

      const resto = dias.length % 7;
      if (resto !== 0) {
        const diasFaltantes = 7 - resto;
        for (let i = 0; i < diasFaltantes; i++) {
          dias.push({ numero: null, eventos: [], viagens: [], cursos: [] });
        }
      }
      
      return dias;
    }
  },
  methods: {
    mudarMes(valor) {
      this.mesAtual += valor;
      if (this.mesAtual < 0) {
        this.mesAtual = 11;
        this.anoAtual-=1;
      } else if (this.mesAtual > 11) {
        this.mesAtual = 0;
        this.anoAtual+=1;
      }
      this.carregarEventos();
    },
    async carregarEventos() {
      this.viagens = await viagensService.getViagens()
      this.cursos = await cursoService.getCursos()
      
      this.eventos = [
        { id: 1, nome: "Ação de graças",subtituloDescricao: "Evento especial", descricao: "Mergulho nas águas cristalinas.", data: "2025/03/15", tipo: "evento", link: "#", tempo: '7 dias', volume: { id: 1, url: "https://lh3.googleusercontent.com/fife/ALs6j_G-cGJsOqJsL8SspJkSwws1wUIgFHMgUw1LEARXufYB7LR1XAomWVmIFXOlHKMV0RxSp9ZQL6OdryJMOS72Oa9WZrFnt9l1F2btoFVcIxUVuXYn-ZronMZZbP9rSCoAEcw-ZBknzZ6hpOSG24kDq7hZ7nxiDlLVD1WAabbSjl-wZZjEa_J2XmhmYd596nJ1qG7S3LlQtLCRC4d4zgkKEdlKWp74DjS5omlvffyfFHcbdLWg-x4nhy4JRIr6Tb6DoYLWgNtc2VAk3nBWhxMgExf66NoGUAJsaPQHPBUupXXDZhS1qfkdmz2mtM4MERDSowzj-nr0eZW49eCCICAmjSM2CaPAjzFTLKXmoT3bM0Fux0bB-6gVWUR_FBdCq5zozq0g7yUd3ylNtq2hm3HW3s2gF5qgPXyWVJk1b4zMkJ3D0c7sTgE-YyeL35gLSZfpvNzHPimmSlCLsduGJCq5GaDpllthq0qPam6A0lQm0pkwsgvNOtDKqz2aA7bK339L7Tm9XlcPE2pXVeLZwowfyhgXktlhNAfKfGx3DO375sICfwARC2T6g7EMVl6ziuSR1dHsX61AdKjjvqwAhXZPymwHHDBSBGcl_wWdHA2YDibcPMjwDlYLXk8a9UDWR1mrFyh3SU45AlpxT2imUjZ49y1F_AmNYf-BzoHs5qNpnyTrgr_QKJd5f0zJJK7_5n_pISoLlTZ0de6zIXrl_ygIurkRyzcnWusGL0cBMJYW1s9vHzGbA9LAnAMOZh-c83RHzX7H3Tt8J7TFprnv9EDF2b5L5_WTlBkx6a367M0OmCGkbIlTVsqMhl9lXGuhXX9VPwHOUH921pLe_tQFZqOSLvB8AbIShB7T57j_WQtYpsno1HO7Uzn3tcrZdDlxXQUung_v3yhcy8L-giouOvUUFuuSmpf26Hr0yShUGB1PfLIvAEFrlE-jPbh3oWrAxxKeKrGNE896XgdoE8g75HdeecA3kwq_KQGaCpSZLGCB_0sHWqAX09hFcwApMnwTd9tvoIpTo7V9pQ0BVscr6FZtVz_YyxJaegfdzfDZYxfmkGgPWaEspCPOBxA0KImV88hmniRkO5f9wgbdVk2RrQ3ksy8b0rpFxTyCn6ic9H3sjGEYSS4uAE5VzCvjm8I2acQOXNs7BfUIgdpFCNvc7lbSOJTphsjc7xAxQYABsNf5_9QC0Gmza2aXkly5IBXax6qrA9_PgXXHOYcw_xQCJpdf4bJBAxUjvosYjM0Lxg_mGi7ejQvH0uGkpivM_jzO7hFHYGyCcmERWvDgKuEzwntqDKJJQ-5rXvW_x5dWsmrfmmmL7kOV-jrIp7Ax2KgUfxP8GGi0t5gM_cgzIMP0BeR_kAkLJ6ORU6Hf4YnNJ1xQfSf3yGWzysvDPA1ahBYQms7yTFPJcF-c6O0SpXM8CqnutyJg6VW_1HA-SNvWvN1sWMmo7899YFJDsAa6uS2pAReXSGOvv_LkveAUzPWS8DHi9dHXVAlrk60U_GG37OJhAnefpenBvkJfbyhryP5n9GWE0vAzGm3ZDZTWBJmCblGV8qE8k-HBPW5yUbBq2bxfU9r_xtQjcCepFS0usxO-k1VHrxD6y2V_RptoWYm653lHvqbA-y2hthZmYdRTOFazEboSIzOH3orafFkmUd-_KnUjGUqe_TkAL1uHxBfGn5C9BXYsq7bm12WiSKQuxZKM-7Vp3S4Wem2IIs6HdxRJLg=w1318-h694"}, },
        { id: 2, nome: "Ação de graças",subtituloDescricao: "Evento especial", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", data: "2025/03/20", tipo: "evento", link: "#", tempo: '7 dias', volume: { id: 1, url: "https://lh3.googleusercontent.com/fife/ALs6j_G-cGJsOqJsL8SspJkSwws1wUIgFHMgUw1LEARXufYB7LR1XAomWVmIFXOlHKMV0RxSp9ZQL6OdryJMOS72Oa9WZrFnt9l1F2btoFVcIxUVuXYn-ZronMZZbP9rSCoAEcw-ZBknzZ6hpOSG24kDq7hZ7nxiDlLVD1WAabbSjl-wZZjEa_J2XmhmYd596nJ1qG7S3LlQtLCRC4d4zgkKEdlKWp74DjS5omlvffyfFHcbdLWg-x4nhy4JRIr6Tb6DoYLWgNtc2VAk3nBWhxMgExf66NoGUAJsaPQHPBUupXXDZhS1qfkdmz2mtM4MERDSowzj-nr0eZW49eCCICAmjSM2CaPAjzFTLKXmoT3bM0Fux0bB-6gVWUR_FBdCq5zozq0g7yUd3ylNtq2hm3HW3s2gF5qgPXyWVJk1b4zMkJ3D0c7sTgE-YyeL35gLSZfpvNzHPimmSlCLsduGJCq5GaDpllthq0qPam6A0lQm0pkwsgvNOtDKqz2aA7bK339L7Tm9XlcPE2pXVeLZwowfyhgXktlhNAfKfGx3DO375sICfwARC2T6g7EMVl6ziuSR1dHsX61AdKjjvqwAhXZPymwHHDBSBGcl_wWdHA2YDibcPMjwDlYLXk8a9UDWR1mrFyh3SU45AlpxT2imUjZ49y1F_AmNYf-BzoHs5qNpnyTrgr_QKJd5f0zJJK7_5n_pISoLlTZ0de6zIXrl_ygIurkRyzcnWusGL0cBMJYW1s9vHzGbA9LAnAMOZh-c83RHzX7H3Tt8J7TFprnv9EDF2b5L5_WTlBkx6a367M0OmCGkbIlTVsqMhl9lXGuhXX9VPwHOUH921pLe_tQFZqOSLvB8AbIShB7T57j_WQtYpsno1HO7Uzn3tcrZdDlxXQUung_v3yhcy8L-giouOvUUFuuSmpf26Hr0yShUGB1PfLIvAEFrlE-jPbh3oWrAxxKeKrGNE896XgdoE8g75HdeecA3kwq_KQGaCpSZLGCB_0sHWqAX09hFcwApMnwTd9tvoIpTo7V9pQ0BVscr6FZtVz_YyxJaegfdzfDZYxfmkGgPWaEspCPOBxA0KImV88hmniRkO5f9wgbdVk2RrQ3ksy8b0rpFxTyCn6ic9H3sjGEYSS4uAE5VzCvjm8I2acQOXNs7BfUIgdpFCNvc7lbSOJTphsjc7xAxQYABsNf5_9QC0Gmza2aXkly5IBXax6qrA9_PgXXHOYcw_xQCJpdf4bJBAxUjvosYjM0Lxg_mGi7ejQvH0uGkpivM_jzO7hFHYGyCcmERWvDgKuEzwntqDKJJQ-5rXvW_x5dWsmrfmmmL7kOV-jrIp7Ax2KgUfxP8GGi0t5gM_cgzIMP0BeR_kAkLJ6ORU6Hf4YnNJ1xQfSf3yGWzysvDPA1ahBYQms7yTFPJcF-c6O0SpXM8CqnutyJg6VW_1HA-SNvWvN1sWMmo7899YFJDsAa6uS2pAReXSGOvv_LkveAUzPWS8DHi9dHXVAlrk60U_GG37OJhAnefpenBvkJfbyhryP5n9GWE0vAzGm3ZDZTWBJmCblGV8qE8k-HBPW5yUbBq2bxfU9r_xtQjcCepFS0usxO-k1VHrxD6y2V_RptoWYm653lHvqbA-y2hthZmYdRTOFazEboSIzOH3orafFkmUd-_KnUjGUqe_TkAL1uHxBfGn5C9BXYsq7bm12WiSKQuxZKM-7Vp3S4Wem2IIs6HdxRJLg=w1318-h694"}, },
        { id: 3, nome: "Ação de polvilho",subtituloDescricao: "Evento especial", descricao: "Curso técnico para mergulhadores.", data: "2025/03/31", tipo: "evento", link: "#", tempo: '7 dias', volume: { id: 1, url: "https://lh3.googleusercontent.com/fife/ALs6j_G-cGJsOqJsL8SspJkSwws1wUIgFHMgUw1LEARXufYB7LR1XAomWVmIFXOlHKMV0RxSp9ZQL6OdryJMOS72Oa9WZrFnt9l1F2btoFVcIxUVuXYn-ZronMZZbP9rSCoAEcw-ZBknzZ6hpOSG24kDq7hZ7nxiDlLVD1WAabbSjl-wZZjEa_J2XmhmYd596nJ1qG7S3LlQtLCRC4d4zgkKEdlKWp74DjS5omlvffyfFHcbdLWg-x4nhy4JRIr6Tb6DoYLWgNtc2VAk3nBWhxMgExf66NoGUAJsaPQHPBUupXXDZhS1qfkdmz2mtM4MERDSowzj-nr0eZW49eCCICAmjSM2CaPAjzFTLKXmoT3bM0Fux0bB-6gVWUR_FBdCq5zozq0g7yUd3ylNtq2hm3HW3s2gF5qgPXyWVJk1b4zMkJ3D0c7sTgE-YyeL35gLSZfpvNzHPimmSlCLsduGJCq5GaDpllthq0qPam6A0lQm0pkwsgvNOtDKqz2aA7bK339L7Tm9XlcPE2pXVeLZwowfyhgXktlhNAfKfGx3DO375sICfwARC2T6g7EMVl6ziuSR1dHsX61AdKjjvqwAhXZPymwHHDBSBGcl_wWdHA2YDibcPMjwDlYLXk8a9UDWR1mrFyh3SU45AlpxT2imUjZ49y1F_AmNYf-BzoHs5qNpnyTrgr_QKJd5f0zJJK7_5n_pISoLlTZ0de6zIXrl_ygIurkRyzcnWusGL0cBMJYW1s9vHzGbA9LAnAMOZh-c83RHzX7H3Tt8J7TFprnv9EDF2b5L5_WTlBkx6a367M0OmCGkbIlTVsqMhl9lXGuhXX9VPwHOUH921pLe_tQFZqOSLvB8AbIShB7T57j_WQtYpsno1HO7Uzn3tcrZdDlxXQUung_v3yhcy8L-giouOvUUFuuSmpf26Hr0yShUGB1PfLIvAEFrlE-jPbh3oWrAxxKeKrGNE896XgdoE8g75HdeecA3kwq_KQGaCpSZLGCB_0sHWqAX09hFcwApMnwTd9tvoIpTo7V9pQ0BVscr6FZtVz_YyxJaegfdzfDZYxfmkGgPWaEspCPOBxA0KImV88hmniRkO5f9wgbdVk2RrQ3ksy8b0rpFxTyCn6ic9H3sjGEYSS4uAE5VzCvjm8I2acQOXNs7BfUIgdpFCNvc7lbSOJTphsjc7xAxQYABsNf5_9QC0Gmza2aXkly5IBXax6qrA9_PgXXHOYcw_xQCJpdf4bJBAxUjvosYjM0Lxg_mGi7ejQvH0uGkpivM_jzO7hFHYGyCcmERWvDgKuEzwntqDKJJQ-5rXvW_x5dWsmrfmmmL7kOV-jrIp7Ax2KgUfxP8GGi0t5gM_cgzIMP0BeR_kAkLJ6ORU6Hf4YnNJ1xQfSf3yGWzysvDPA1ahBYQms7yTFPJcF-c6O0SpXM8CqnutyJg6VW_1HA-SNvWvN1sWMmo7899YFJDsAa6uS2pAReXSGOvv_LkveAUzPWS8DHi9dHXVAlrk60U_GG37OJhAnefpenBvkJfbyhryP5n9GWE0vAzGm3ZDZTWBJmCblGV8qE8k-HBPW5yUbBq2bxfU9r_xtQjcCepFS0usxO-k1VHrxD6y2V_RptoWYm653lHvqbA-y2hthZmYdRTOFazEboSIzOH3orafFkmUd-_KnUjGUqe_TkAL1uHxBfGn5C9BXYsq7bm12WiSKQuxZKM-7Vp3S4Wem2IIs6HdxRJLg=w1318-h694"}, },
        { id: 4, nome: "Ação de graças",subtituloDescricao: "Evento especial", descricao: "Mergulho nas águas cristalinas.", data: "2025/03/20", tipo: "evento", link: "#", tempo: '7 dias', volume: { id: 1, url: "https://lh3.googleusercontent.com/fife/ALs6j_G-cGJsOqJsL8SspJkSwws1wUIgFHMgUw1LEARXufYB7LR1XAomWVmIFXOlHKMV0RxSp9ZQL6OdryJMOS72Oa9WZrFnt9l1F2btoFVcIxUVuXYn-ZronMZZbP9rSCoAEcw-ZBknzZ6hpOSG24kDq7hZ7nxiDlLVD1WAabbSjl-wZZjEa_J2XmhmYd596nJ1qG7S3LlQtLCRC4d4zgkKEdlKWp74DjS5omlvffyfFHcbdLWg-x4nhy4JRIr6Tb6DoYLWgNtc2VAk3nBWhxMgExf66NoGUAJsaPQHPBUupXXDZhS1qfkdmz2mtM4MERDSowzj-nr0eZW49eCCICAmjSM2CaPAjzFTLKXmoT3bM0Fux0bB-6gVWUR_FBdCq5zozq0g7yUd3ylNtq2hm3HW3s2gF5qgPXyWVJk1b4zMkJ3D0c7sTgE-YyeL35gLSZfpvNzHPimmSlCLsduGJCq5GaDpllthq0qPam6A0lQm0pkwsgvNOtDKqz2aA7bK339L7Tm9XlcPE2pXVeLZwowfyhgXktlhNAfKfGx3DO375sICfwARC2T6g7EMVl6ziuSR1dHsX61AdKjjvqwAhXZPymwHHDBSBGcl_wWdHA2YDibcPMjwDlYLXk8a9UDWR1mrFyh3SU45AlpxT2imUjZ49y1F_AmNYf-BzoHs5qNpnyTrgr_QKJd5f0zJJK7_5n_pISoLlTZ0de6zIXrl_ygIurkRyzcnWusGL0cBMJYW1s9vHzGbA9LAnAMOZh-c83RHzX7H3Tt8J7TFprnv9EDF2b5L5_WTlBkx6a367M0OmCGkbIlTVsqMhl9lXGuhXX9VPwHOUH921pLe_tQFZqOSLvB8AbIShB7T57j_WQtYpsno1HO7Uzn3tcrZdDlxXQUung_v3yhcy8L-giouOvUUFuuSmpf26Hr0yShUGB1PfLIvAEFrlE-jPbh3oWrAxxKeKrGNE896XgdoE8g75HdeecA3kwq_KQGaCpSZLGCB_0sHWqAX09hFcwApMnwTd9tvoIpTo7V9pQ0BVscr6FZtVz_YyxJaegfdzfDZYxfmkGgPWaEspCPOBxA0KImV88hmniRkO5f9wgbdVk2RrQ3ksy8b0rpFxTyCn6ic9H3sjGEYSS4uAE5VzCvjm8I2acQOXNs7BfUIgdpFCNvc7lbSOJTphsjc7xAxQYABsNf5_9QC0Gmza2aXkly5IBXax6qrA9_PgXXHOYcw_xQCJpdf4bJBAxUjvosYjM0Lxg_mGi7ejQvH0uGkpivM_jzO7hFHYGyCcmERWvDgKuEzwntqDKJJQ-5rXvW_x5dWsmrfmmmL7kOV-jrIp7Ax2KgUfxP8GGi0t5gM_cgzIMP0BeR_kAkLJ6ORU6Hf4YnNJ1xQfSf3yGWzysvDPA1ahBYQms7yTFPJcF-c6O0SpXM8CqnutyJg6VW_1HA-SNvWvN1sWMmo7899YFJDsAa6uS2pAReXSGOvv_LkveAUzPWS8DHi9dHXVAlrk60U_GG37OJhAnefpenBvkJfbyhryP5n9GWE0vAzGm3ZDZTWBJmCblGV8qE8k-HBPW5yUbBq2bxfU9r_xtQjcCepFS0usxO-k1VHrxD6y2V_RptoWYm653lHvqbA-y2hthZmYdRTOFazEboSIzOH3orafFkmUd-_KnUjGUqe_TkAL1uHxBfGn5C9BXYsq7bm12WiSKQuxZKM-7Vp3S4Wem2IIs6HdxRJLg=w1318-h694"}, }
      ];
    },
    mostrarDetalhes(evento, e) {
      this.detalhesEvento = evento;
      this.cardVisivel = true;

      const buttonRect  = e.currentTarget.getBoundingClientRect();

      this.$nextTick(() => {
        const cardEl = this.$refs.card.$el
        const cardRect = cardEl.getBoundingClientRect()
        const containerRect = this.$el.getBoundingClientRect()
        const spacing = 70
        
        let top = buttonRect.top - containerRect.top + spacing + buttonRect.height;
        let left = buttonRect.left + (buttonRect.width / 2) - (cardRect.width / 2) + window.scrollX;
        
        if (left + cardRect.width > containerRect.width) {
          left = buttonRect.left + (buttonRect.width / 2) - (cardRect.width / 2) + window.scrollX - spacing*2.5
        }
        // Verifica se o card ultrapassa a borda esquerda da tela
        if (left < spacing) {
          left = spacing*1.5
        }
        if (top + cardRect.height > containerRect.height) {
          top = containerRect.height - cardRect.height - spacing*3.4
        }

        this.cardPosition.top = `${top}px`;
        this.cardPosition.left = `${left}px`;
      });
    },
    pegarCorBotao(tipo) {
      if (tipo === 'viagem') {
        return { backgroundColor:'#A92827', color: '#FFFFFF' };
      } else if (tipo === 'curso') {
        return { backgroundColor: '#171717', color: '#FFFFFF' };
      } else if (tipo === 'evento') {
        return { backgroundColor: '#B4B9C1', color: '#A92827' };
      }
    }
  },
  mounted() {
    this.carregarEventos();
  }
};
</script>

<style scoped>
.calendar-wrapper {
  overflow-x: auto;
  width: 100%;
}
.calendar {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.test {
  background-color: aqua !important;
}
.month-navigation {
  max-width: 600px;
}
.calendar-header,
.calendar-body {
  display: inline-grid;
  grid-template-columns: repeat(7, minmax(200px, 1fr));
  min-width: 1400px;
  text-align: center;
}
.calendar-body {
  background-color: #ddd;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid #B4B9C1;
}
.calendar-header-item {
  font-weight: bold;
  padding: 5px;
  font-size: 13.64px;
}
.calendar-day {
  min-width: 200px;
  height: 215px;
  background-color: #FEFEFE;
  padding: 0px;
  box-sizing: border-box;
  border-right: 2px solid #B4B9C1;
  border-bottom: 2px solid #B4B9C1;
}
.calendar-body .calendar-day:nth-child(7n+1) {
  background-color: #eeeeee
}
.calendar-day:nth-last-child(-n+7) {
  border-bottom: none;
}
.calendar-day:nth-child(7n) {
  border-right: none;
  background-color: #eeeeee
}
.vazio {
  background-color: #fff;
  border-bottom: 2px solid #B4B9C1;
}
.day-number {
  font-weight: bold;
}
.legend {
  display: flex;
  justify-content: start;
  margin-top: 20px;
  gap: 15px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}
.legend-box {
  width: 20px;
  height: 20px;
  border-radius: 3px;
}
.event-details {
  background: white;
  padding: 10px;
  border-radius: 12px;
  min-height: 200px;

  max-width: 600px !important;
  position: absolute !important;
}
</style>
