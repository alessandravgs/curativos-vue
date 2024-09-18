<template>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-heart-pulse"></v-icon> &nbsp;
        Lesões
  
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
        @click="navigateToNovaLesao">
          Nova Lesão
        </v-btn>

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
  
        <template v-slot:item.situacao="{ item }">
          <div class="text-end">
            <v-chip
              :color="item.situacao == 'Fechada' ? 'green' : 'red'"
              :text="item.situacao"
              class="text-uppercase"
              size="small"
              label
            ></v-chip>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';

    const router = useRouter();
    function navigateToNovaLesao() {
      router.push({ path: '/lesoes/novo' }).catch(err => console.error(err));
    }
  
    const search = ref('')
    const items = [
      {
        detalhes: 'Lesão na perna esquerda',
        paciente: 'José Napoleão',
        regiao: 'Cotovelo',
        lado: 'Lado esquerdo',
        situacao: 'Fechada'
      },
      {
        detalhes: 'Lesão na perna esquerda',
        paciente: 'José Napoleão',
        regiao: 'Cotovelo',
        lado: 'Lado esquerdo',
        situacao: 'Granulação'
      },
      {
        detalhes: 'Lesão na perna esquerda',
        paciente: 'José Napoleão',
        regiao: 'Cotovelo',
        lado: 'Lado esquerdo',
        situacao: 'Fechada'
      },
      {
        detalhes: 'Lesão na perna esquerda',
        paciente: 'José Napoleão',
        regiao: 'Cotovelo',
        lado: 'Lado esquerdo',
        situacao: 'Fibrinosa'
      },
      {
        detalhes: 'Lesão na perna esquerda',
        paciente: 'José Napoleão',
        regiao: 'Cotovelo',
        lado: 'Lado esquerdo',
        situacao: 'Bolhosa'
      },
    ]
  </script>
  
