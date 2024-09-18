<template>
    <v-container  style="max-width: 1200px; margin: 0 auto;">

        <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2 ">
            <v-card class="mx-auto" max-width="344">
                <v-card-text>
                    <div>Bem-Vinda</div>   
                    <p class="text-h6 font-weight-black">Camila Duarte</p>
                    <v-divider></v-divider>
            
                    <v-list density="compact">
                        <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            :value="item"
                            color="primary"
                        >
                            <template v-slot:prepend>
                                <v-icon :icon="item.icon"></v-icon>
                            </template>

                            <v-list-item-content class="text-right">
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            
                <v-card-actions>
                    <v-btn
                    color="indigo-darken-3"
                    text="Ir para Perfil"
                    variant="text"
                    @click="navigateToProfissional"
                    ></v-btn>
                </v-card-actions>
                </v-card>
          </v-sheet>
        </v-col>

        <v-col>
            <v-card class="mx-auto" >
                <v-card-text>
                    <p class="text-h6 font-weight-black">Curativos nos últimos dias</p>
                    <v-divider></v-divider>
                    <v-progress-linear
                        v-model="skill"
                        color="indigo-darken-3"
                        height="25"
                        v-for="(item, i) in quantidadeCurativos"
                            :key="i"
                            :value="item"
                        >
                        <template v-slot:default="{ value }">
                            <strong>{{ item.qtd }}%</strong>
                        </template>
                    </v-progress-linear>

                </v-card-text>
                </v-card>
        </v-col>
      </v-row>

        
    </v-container>
  </template>

<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToProfissional() {
  router.push({ path: '/profissional' }).catch(err => console.error(err));
}

const items = [
  { text: '586.589.468-60', icon: 'mdi-card-account-details-outline' },
  { text: 'camila_duarte@gmail.com', icon: 'mdi-email-outline' },
  { text: '(83) 98885-6989', icon: 'mdi-cellphone' },
]

const quantidadeCurativos = [
  {dia: 'Segunda', qtd: 5},
  {dia: 'Terça', qtd: 15}, 
  {dia: 'Quarta', qtd: 25}, 
  {dia: 'Quinta', qtd: 30}, 
  {dia: 'Sexta', qtd: 10},  
]
</script>

<style scoped>
.text-right {
  display: flex;
  justify-content: flex-end; /* Alinha o texto à direita */
}
</style>