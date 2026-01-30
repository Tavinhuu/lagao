<template>
    <div class="not-found">
      <h1>404 - Página não encontrada</h1>
      <p>A página que você tentou acessar não existe ou foi movida.</p>
      <router-link to="/">Voltar para a página inicial</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 2rem;
    color: #ff5252;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  
  a {
    display: inline-block;
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #42b983;
    text-decoration: none;
    border-radius: 5px;
    transition: 0.3s;
  }
  
  a:hover {
    background-color: #2c7a4b;
  }
  </style>
  