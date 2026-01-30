<template>
    <v-card 
        class="pa-4 card-container" 
        elevation="10" 
        style="border-radius: 8px; background-color: #fff;">
        <v-row>
            <v-container fluid>
                <!-- Avatar + Nome + Rating -->
                <v-col cols="12">
                    <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center">
                            <v-avatar size="80" class="mr-3">
                                <img :src="depoimento.volume.url" alt="Foto" />
                            </v-avatar>
                            <h1 class="font-weight-black">
                                {{ depoimento.nome }}
                            </h1>
                        </div>
                        <v-rating :value="depoimento.rating" dense readonly color="yellow darken-2" size="40"></v-rating>
                    </div>
                </v-col>
    
                <!-- Linha Vermelha -->
                <v-col cols="12" class="pt-1 pb-3">
                    <v-divider color="red"></v-divider>
                </v-col>
    
                <!-- Título e Texto do Depoimento -->
                <v-col cols="12">
                    <h1 class="font-weight-black">{{ depoimento.titulo }}</h1>
                    <p class="mb-4">
                        {{ depoimento.texto }}
                    </p>
                </v-col>
    
                <!-- Data e Local -->
                <v-col cols="12" class="d-flex justify-space-between">
                    <span class="body-2 font-weight-black" style="color: #A92827;">{{ depoimento.data }}</span>
                    <span class="body-2 font-weight-black" style="color: #A92827;">{{ depoimento.local }}</span>
                </v-col>
            </v-container>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: "CardDepoimentos",
    props: {
        depoimento: Object
    }
};
</script>

<style scoped>
.card-container {
    width: 100%;
    max-width: 700px;
    height: auto;
    display: flex;
    flex-direction: column;
}
</style>