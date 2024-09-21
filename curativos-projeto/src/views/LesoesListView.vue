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
    
    <v-data-table v-model:search="search" :items="items" hover>
      <template v-slot:item="{ item }">
        <tr @click="navigateToDetalhes(item)">
          <td>{{ item.detalhes }}</td>
          <td>{{ item.paciente }}</td>
          <td>{{ item.regiao }}</td>
          <td>{{ item.lado }}</td>
          <td>
            <v-chip
              :color="item.situacao == 'Fechada' ? 'green' : 'red'"
              :text="item.situacao"
              class="text-uppercase"
              size="small"
              label
            ></v-chip>
          </td>
        </tr>
      </template>

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

// Navegar para a página de criar nova lesão
function navigateToNovaLesao() {
  router.push({ path: '/lesoes/novo' }).catch(err => console.error(err));
}

// Navegar para a página de detalhes de uma lesão
function navigateToDetalhes(item) {
  router.push({ path: `/lesoes/detalhes`, query: { detalhes: item.detalhes, paciente: item.paciente, situacao: item.situacao } }).catch(err => console.error(err));
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
