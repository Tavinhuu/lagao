import Vue from "vue";

export const globalState = Vue.observable({
  categoriaSelecionada: null
});

export const mutations = {
  setCategoria(categoria) {
    globalState.categoriaSelecionada = categoria;
  }
};
