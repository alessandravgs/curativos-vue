
<template>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-medication-outline"></v-icon> &nbsp;
        Tratamentos
  
        <v-spacer></v-spacer>
  
        <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn  
        color="indigo-darken-3"
        prepend-icon="mdi mdi-plus"
        @click="navigateToNovoPaciente">
          Novo Tratamento
        </v-btn>

      </v-card-title>
  
      <v-divider></v-divider>
      <v-data-table v-model:search="search" :items="tratamentos" hover>
      <template v-slot:item="{ item }">
        <tr @click="navigateToDetalhes(item)">
          <td>{{ item.nome }}</td>
          <td>{{ item.descricao }}</td>
        </tr>
      </template>
    </v-data-table>
    </v-card>
  </template>
  
  <script setup>
      import { useRouter } from 'vue-router';

      const router = useRouter();
      function navigateToNovoPaciente() {
        router.push({ path: '/pacientes/novo' }).catch(err => console.error(err));
      }

      function navigateToDetalhes(item) {
         router.push({ path: `/pacientes/detalhes` }).catch(err => console.error(err));
      } 
    
      const tratamentos = [
        {
            nome: "Gaze",
            descricao: "Cobertura de gaze"
        },
        {
            nome: "Faixa",
            descricao: "Cobertura de faixa"
        },
        {
            nome: "Oléo Girassol",
            descricao: "Oléo de Girassol"
        },
        {
            nome: "Dexametasona",
            descricao: "Pomada para tratamento"
        },
        {
            nome: "Soro Fisiológico",
            descricao: "Soro para tratamento"
        },
        {
            nome: "Sabonete neutro",
            descricao: "Sabonete para limpeza"
        },
        {
            nome: "Sulfato de prata",
            descricao: "Pomada para tratamento"
        },
      ]
  </script>
  


