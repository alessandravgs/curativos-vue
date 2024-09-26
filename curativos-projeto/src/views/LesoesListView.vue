<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi mdi-account"></v-icon> &nbsp;
      Lesões

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Buscar por nome ou cpf do paciente"
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
          @click="searchLesoes"
      >
          {{ limparSearch ? 'Limpar' : 'Buscar' }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="indigo-darken-3" prepend-icon="mdi mdi-plus" @click="navigateToNovaLesao">
        Nova Lesao
      </v-btn>

    </v-card-title>

    <v-divider></v-divider>

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :items-per-page-options = "configItems"
      :headers="headers"
      :items="lesoes"
      :items-length="totalItems"
      :loading="loading"
      :page="page"
      :no-data-text = "semDados"
      @update:options="updateOptions"
      hover
      >
          <template v-slot:item="{ item }">
            <tr @click="navigateToDetalhes(item?.id)">
              <td>{{ item.detalhes }}</td>
              <td>{{ item.paciente }}</td>
              <td>{{ RegiaoDisplayNames[item.regiao] }}</td>
              <td>{{ LadoRegiaoDisplayNames[item.ladoRegiao]}}</td>
              <td>
                <v-chip
                  :color="SituacaoLesaoDisplayNames[item.situacao] == 'Fechada' ? 'green' : 'red'"
                  :text="SituacaoLesaoDisplayNames[item.situacao]"
                  class="text-uppercase"
                  size="small"
                  label
                ></v-chip>
              </td>
            </tr>
          </template>
      </v-data-table-server>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PaginacaoResult } from '@/types/geral';
import { useRouter } from 'vue-router';
import { LesaoResumoResult } from '@/types/lesao';
import { getLesoesPaginado, getLesoesSearchPaginado } from '@/services/LesaoService';
import { SituacaoLesaoDisplayNames } from '@/enums/SituacaoLesao';
import { RegiaoDisplayNames } from '@/enums/Regiao';
import { LadoRegiaoDisplayNames } from '@/enums/LadoRegiao';


const router = useRouter();

// Navegar para a página de criar nova lesão
function navigateToNovaLesao() {
  router.push({ path: '/lesoes/novo' }).catch(err => console.error(err));
}


function navigateToDetalhes(item: number | null | undefined) {
      router.push({ path: `/lesoes/detalhes`, query: { item } }).catch(err => console.error(err));
} 

// Definindo variáveis reativas
const semDados = ref('Não foram encontrados dados.')
const search = ref(''); //Campo de dados do search
const lesoes = ref<LesaoResumoResult[]>([]); //Lista que renderizará os dados na tela

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

// Definindo os cabeçalhos da tabela
const headers = [
  { title: 'Detalhes', value: 'detalhes' },
  { title: 'Paciente', value: 'paciente' },
  { title: 'Região', value: 'regiao' },
  { title: 'Lado', value: 'lado' },
  { title: 'Situação', value: 'situacao' },
];

// Função para buscar pacientes paginadas
const fetchLesoes = async () => {
  try {
    const data: PaginacaoResult<LesaoResumoResult> = await getLesoesPaginado(page.value, itemsPerPage.value);
      lesoes.value = data.items;
    totalItems.value = data.totalItems;
    loading.value = false;
    console.log(lesoes.value);
  } catch (error) {
    console.error('Erro ao buscar lesões:', error);
  }
};

// Função que é chamada quando o usuário clica no botão de pesquisa
  const searchLesoes = async () => {
      if (search.value === '' && !limparSearch.value) 
      {
          return;
      }

      if(limparSearch.value){
          limparSearch.value = false;
          search.value = '';
          await fetchLesoes();
          return;
      }

      loading.value = true;
      try {
          const data: PaginacaoResult<LesaoResumoResult> 
              = await getLesoesSearchPaginado(search.value, page.value, itemsPerPage.value);
          lesoes.value = data.items;
          totalItems.value = data.totalItems;
          loading.value = false;
          limparSearch.value = true;
      } catch (error) {
          loading.value = false;
          console.error('Erro ao buscar lesões:', error);
      }
  };

// Atualizar as opções de paginação e buscar novamente
  const updateOptions = (newOptions: any) => {
      page.value = newOptions.page;
      fetchLesoes();
  };

// Chamando a função na montagem do componente
onMounted(() => {
  fetchLesoes();
});
</script>
