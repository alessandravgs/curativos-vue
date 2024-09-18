<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi mdi-bandage"></v-icon> &nbsp;
      Curativos

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
        @click="navigateToNovoCurativo"
      >
        Novo Curativo
      </v-btn>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table v-model:search="search" :items="items">
      <template v-slot:header.stock>
        <div class="text-end">Stock</div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToNovoCurativo() {
  router.push({ path: '/curativos/novo' }).catch(err => console.error(err));
}

const search = ref('')
const items = [
  {
    lesao: 'Lesão na perna esquerda',
    paciente: 'José Napoleão',
    data: new Date(2024,9,5).toLocaleDateString(),
  },
  {
    lesao: 'Lesão na perna direita',
    paciente: 'José Napoleão',
    data: new Date(2024,9,5).toLocaleDateString(),
  },
  {
    lesao: 'Lesão na braço esquerdo',
    paciente: 'José Napoleão',
    data: new Date(2024,9,5).toLocaleDateString(),
  },
  {
    lesao: 'Lesão na perna esquerda',
    paciente: 'José Napoleão',
    data: new Date(2024,9,5).toLocaleDateString(),
  },
  {
    lesao: 'Lesão na perna esquerda',
    paciente: 'José Napoleão',
    data: new Date(2024,9,5).toLocaleDateString(),
  },
]
</script>
