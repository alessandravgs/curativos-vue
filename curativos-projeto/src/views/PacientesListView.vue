
<template>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi mdi-account"></v-icon> &nbsp;
        Pacientes
  
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
          Novo Paciente
        </v-btn>

      </v-card-title>
  
      <v-divider></v-divider>
      <v-data-table v-model:search="search" :items="pacientes" hover>
      <template v-slot:item="{ item }">
        <tr @click="navigateToDetalhes(item)">
          <td>{{ item.nome }}</td>
          <td>{{ item.sexo }}</td>
          <td>{{ item.datanasc }}</td>
        </tr>
      </template>
      <template v-slot:header.stock>
        <div class="text-end">Stock</div>
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
    const headers = [
      {
        title: 'Nome',
        align: 'start',
        key: 'nome',
      },
      { title: 'Sexo', align: 'end', key: 'sexo' },
      { title: 'Data de Nascimento', align: 'end', key: 'datanasc' },
    ]
    const pacientes = [
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
      {
        nome: 'José Napoleão',
        sexo: 'Masculino',
        datanasc: new Date(1995, 5,16).toLocaleDateString(),
      },
    ]
  </script>
  


