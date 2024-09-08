<template>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
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
      </v-card-title>
  
      <v-divider></v-divider>
      <v-data-table v-model:search="search" :items="items">
        <template v-slot:header.stock>
          <div class="text-end">Stock</div>
        </template>
  
        <!-- <template v-slot:item.image="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img
              :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/5`"
              height="64"
              cover
            ></v-img>
          </v-card>
        </template> -->
  
        <!-- <template v-slot:item.rating="{ item }">
          <v-rating
            :model-value="item.rating"
            color="orange-darken-2"
            density="compact"
            size="small"
            readonly
          ></v-rating>
        </template> -->
  
        <!-- <template v-slot:item.stock="{ item }">
          <div class="text-end">
            <v-chip
              :color="item.stock ? 'green' : 'red'"
              :text="item.stock ? 'In stock' : 'Out of stock'"
              class="text-uppercase"
              size="small"
              label
            ></v-chip>
          </div>
        </template> -->
      </v-data-table>
    </v-card>
  </template>
  
  <script setup>
    import { ref } from 'vue'
  
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
  
