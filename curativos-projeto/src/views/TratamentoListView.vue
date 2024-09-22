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

         <!-- Botão de pesquisa -->
        <v-btn  
            class="ms-1" 
            color="indigo-darken-3"
            prepend-icon="mdi mdi-magnify"
            @click="searchCoberturas"
        >
            Buscar
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn  
        color="indigo-darken-3"
        prepend-icon="mdi mdi-plus"
        @click="navigateToNovoTratamento">
          Novo Tratamento
        </v-btn>

      </v-card-title>
  
      <v-divider></v-divider>

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :items-per-page-options = "configItems"
        :headers="headers"
        :items="coberturas"
        :items-length="totalItems"
        :loading="loading"
        :page="page"
        :no-data-text = "semDados"
        @update:options="updateOptions"
        hover
        >
            <template v-slot:item="{ item }">
                <tr @click="navigateToDetalhes(item)">
                    <td>{{ item.nome }}</td>
                    <td>{{ item.descricao }}</td>
                </tr>
            </template>
        </v-data-table-server>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { CoberturaResumoResult, PaginacaoResult } from '@/types/cobertura';
  import { getCoberturasPaginado, getCoberturasSearchPaginado } from '../services/tratamentoService';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  function navigateToNovoTratamento() {
    router.push({ path: '/tratamentos/novo' }).catch(err => console.error(err));
  }

  function navigateToDetalhes(item: CoberturaResumoResult) {
      router.push({ path: `/tratamentos/detalhes` }).catch(err => console.error(err));
  } 
  
  // Definindo variáveis reativas
  const semDados = ref('Não foram encontrados dados.')
  const search = ref(''); //Campo de dados do search
  const coberturas = ref<CoberturaResumoResult[]>([]); //Lista que renderizará os dados na tela

  // Total de items no servidor
  const totalItems = ref(0);

  // Estado do loading
  const loading = ref(true);

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
  
  // Definindo os cabeçalhos da tabela
  const headers = [
    { title: 'Nome', value: 'nome' },
    { title: 'Descrição', value: 'descricao' },
  ];
  
  // Função para buscar coberturas paginadas
  const fetchCoberturas = async () => {
    try {
      const data: PaginacaoResult<CoberturaResumoResult> = await getCoberturasPaginado(page.value, itemsPerPage.value);
      coberturas.value = data.items;
      totalItems.value = data.totalItems;
      loading.value = false;
    } catch (error) {
      console.error('Erro ao buscar coberturas:', error);
    }
  };

  // Função que é chamada quando o usuário clica no botão de pesquisa
    const searchCoberturas = async () => {
        loading.value = true;
        try {
            const data: PaginacaoResult<CoberturaResumoResult> 
                = await getCoberturasSearchPaginado(search.value, page.value, itemsPerPage.value);
            coberturas.value = data.items;
            totalItems.value = data.totalItems;
            loading.value = false;
        } catch (error) {
            loading.value = false;
            console.error('Erro ao buscar coberturas:', error);
        }
    };

  // Atualizar as opções de paginação e buscar novamente
    const updateOptions = (newOptions: any) => {
        page.value = newOptions.page;
        fetchCoberturas();
    };
  
  // Chamando a função na montagem do componente
  onMounted(() => {
    fetchCoberturas();
  });
  </script>
  