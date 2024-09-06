<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-combobox
            :items="membros"
            label="Membros"
            chips
            multiple
          ></v-combobox>

          <v-combobox
            :items="regiao"
            label="Região"
            chips
            multiple
          ></v-combobox>

          <v-combobox
            :items="ladoRegiao"
            label="Lado Região"
            chips
            multiple
          ></v-combobox>

        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
    import { ref } from 'vue'
  
    const select = ref(['Vuetify', 'Programming'])
  
    const membros = [
      'Membros Superiores',
      'Membros Inferiores',
      'Membro Superior Esquerdo',
      'Membro Superior Direito',
      'Membro Inferior Direito',
      'Membro Inferior Esquerdo',
    ]

    const regiao = [
        'PavilhaoAuditivo',
        'RegiaoOcciptal',
        'Cotovelo',
        'Mao',
        'Trocanter',
        'Joelho',
        'RegiaoSacral',
        'Quirodactilo',
        'Pododáctilo',
        'Halux',
        'MaleoloLateral',
        'MaleoloInterno',
        'Calcanhar',
        'RegiaoPlanar',
        'Dorso', 
        'Coto', 
        'Anterior',
        'Posterior',
        'Medio',
        'Lateral'
    ]

    const ladoRegiao = [
        'Nenhuma',
        'Esquerda', 
        'Direita'
    ]
  </script>
  
