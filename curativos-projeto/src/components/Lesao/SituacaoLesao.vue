<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-combobox
            :items="situacao"
            label="Situação"
            chips
            multiple
          ></v-combobox>

          <v-combobox
            :items="tipoUlcera"
            label="Tipo de Úlcera"
            chips
            multiple
          ></v-combobox>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
    import { ref } from 'vue'
   
    const situacao = [
        'Granulacao',
        'Hiperqueratosa',
        'Descamativa',
        'Necrose',
        'Eritematosa',
        'Maceracao',
        'Bolhosa',
        'Fibrinosa'
    ]

    const tipoUlcera = [
        'Nenhuma',
        'Mista',
        'Venosa',
        'Arterial'  
    ]

  </script>
  
