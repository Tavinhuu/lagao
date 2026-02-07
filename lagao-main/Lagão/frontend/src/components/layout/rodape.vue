<template>
  <v-footer 
    app
    color="black" 
    height="116px"
    padless
    absolute
  >
    <v-card
      class="flex px-5"
      flat
      tile
      color="black"
      >
      <v-card-title>
        
        <div>
          <router-link to="/">
            <v-img
              src="/assets/avatar2.png"
              max-height="64"
              max-width="150"
              class="cursor-pointer"
            />
          </router-link>
        </div>
        
        <v-spacer/>
    
        <div>
          <span class="text-caption white--text" max-height="22">
            LAGÃO DIVE UNIVERSITY © 2025 Todos os direitos reservados
          </span>
        </div>
    
        <v-spacer/>
        
        <div>
          <v-btn icon class="white--text" href="https://www.youtube.com/@lagaodive" target="_blank">
            <v-icon size="20" color="white">mdi-youtube</v-icon>
          </v-btn>
          <v-btn icon class="white--text" href="https://www.instagram.com/lagaodive?igsh=dGdhMG04dHU5dng3" target="_blank">
            <v-icon size="20" color="white">mdi-instagram</v-icon>
          </v-btn>
          <v-btn outlined class="white--text font-weight-bold text-capitalize ml-2 px-4 border-white" href="https://www.youtube.com/@lagaodive" target="_blank">
            Podcast
          </v-btn>
  
  
        </div>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "IndexRodape"
};
</script>

<style scoped>
.border-white {
  border: 1px solid white;
  border-radius: 4px;
}
</style>