<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi mdi-account"></v-icon> &nbsp;
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

       <!-- Botão de pesquisa -->
      <v-btn  
          class="ms-1" 
          color="indigo-darken-3"
          :prepend-icon="limparSearch ? 'mdi mdi-broom' : 'mdi-magnify'"
          @click="searchCurativos"
      >
          {{ limparSearch ? 'Limpar' : 'Buscar' }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn  
      color="indigo-darken-3"
      prepend-icon="mdi mdi-plus"
      @click="navigateToNovoCurativo">
        Novo Curativo
      </v-btn>

    </v-card-title>

    <v-divider></v-divider>

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :items-per-page-options = "configItems"
      :headers="headers"
      :items="curativos"
      :items-length="totalItems"
      :loading="loading"
      :page="page"
      :no-data-text = "semDados"
      @update:options="updateOptions"
      hover
      >
          <template v-slot:item="{ item }">
              <tr @click="navigateToDetalhes(item.id)">
                  <td>{{ item.lesao }}</td>
                  <td>{{ item.paciente }}</td>
                  <td>{{ mostrarData(item.data) }}</td>
              </tr>
          </template>
      </v-data-table-server>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PaginacaoResult } from '@/types/geral';
import { useRouter } from 'vue-router';
import { CurativoResumoResult } from '@/types/curativo';
import { getCurativoSearchByPacientePaginado, getCurativosPaginado } from '@/services/CurativoService';

const router = useRouter();

function navigateToNovoCurativo() {
      router.push({ path: '/curativos/novo' }).catch(err => console.error(err));
}

function navigateToDetalhes(item: number) {
    router.push({ path: `/curativos/detalhes`, query: { item } }).catch(err => console.error(err));
} 

// Definindo variáveis reativas
const semDados = ref('Não foram encontrados dados.')
const search = ref(''); //Campo de dados do search
const curativos = ref<CurativoResumoResult[]>([]); //Lista que renderizará os dados na tela

// Total de items no servidor
const totalItems = ref(0);

// Estado do loading
const loading = ref(true);

//Tratar search
const limparSearch = ref<boolean>(false);

// Configuração listagem da quantidade de elementos exibidos por vez
const configItems = ref([
  {value: 10, title: '10'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
]);

// Items exibidos por página
const itemsPerPage = ref(10);

// Número da página a ser exibida
const page = ref(1);

const mostrarData = (dataInput: Date | undefined): string => {
      if(!dataInput) return '';
      const nascimento = typeof dataInput === 'string' ? new Date(dataInput) : dataInput;
      const data = nascimento.toLocaleDateString();
      return data;
    };


// Definindo os cabeçalhos da tabela
const headers = [
  { title: 'Lesão', value: 'lesao' },
  { title: 'Paciente', value: 'paciente' },
  { title: 'Data Cadastro', value: 'data' },
];

// Função para buscar pacientes paginadas
const fetchCurativos = async () => {
  try {
    const data: PaginacaoResult<CurativoResumoResult> = await getCurativosPaginado(page.value, itemsPerPage.value);
      curativos.value = data.items;
    totalItems.value = data.totalItems;
    loading.value = false;
    console.log(curativos.value);
  } catch (error) {
    console.error('Erro ao buscar curativos:', error);
  }
};

// Função que é chamada quando o usuário clica no botão de pesquisa
  const searchCurativos = async () => {
      if (search.value === '' && !limparSearch.value) 
      {
          return;
      }

      if(limparSearch.value){
          limparSearch.value = false;
          search.value = '';
          await fetchCurativos();
          return;
      }

      loading.value = true;
      try {
          const data: PaginacaoResult<CurativoResumoResult> 
              = await getCurativoSearchByPacientePaginado(search.value, page.value, itemsPerPage.value);
          curativos.value = data.items;
          totalItems.value = data.totalItems;
          loading.value = false;
          limparSearch.value = true;
      } catch (error) {
          loading.value = false;
          console.error('Erro ao buscar pacientes:', error);
      }
  };

// Atualizar as opções de paginação e buscar novamente
  const updateOptions = (newOptions: any) => {
      page.value = newOptions.page;
      fetchCurativos();
  };

// Chamando a função na montagem do componente
onMounted(() => {
  fetchCurativos();
});
</script>
