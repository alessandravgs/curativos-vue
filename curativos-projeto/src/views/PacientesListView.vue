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

         <!-- Botão de pesquisa -->
        <v-btn  
            class="ms-1" 
            color="indigo-darken-3"
            :prepend-icon="limparSearch ? 'mdi mdi-broom' : 'mdi-magnify'"
            @click="searchPacientes"
        >
            {{ limparSearch ? 'Limpar' : 'Buscar' }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn  
        color="indigo-darken-3"
        prepend-icon="mdi mdi-plus"
        @click="navigateToNovoPaciente">
          Novo Paciente
        </v-btn>

      </v-card-title>
  
      <v-divider></v-divider>

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :items-per-page-options = "configItems"
        :headers="headers"
        :items="pacientes"
        :items-length="totalItems"
        :loading="loading"
        :page="page"
        :no-data-text = "semDados"
        @update:options="updateOptions"
        hover
        >
            <template v-slot:item="{ item }">
                <tr @click="navigateToDetalhes(item.id)">
                    <td>{{ item.nome }}</td>
                    <td>{{ item.cpf }}</td>
                    <td>{{ calcularIdade( item.dataNascimento) }}</td>
                    <td>{{ item.telefone }}</td>
                </tr>
            </template>
        </v-data-table-server>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { PacienteResumoResult } from '@/types/paciente';
  import { getPacientesPaginado, getPacientesSearchPaginado } from '@/services/PacienteService';
  import { PaginacaoResult } from '@/types/geral';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function navigateToNovoPaciente() {
        router.push({ path: '/pacientes/novo' }).catch(err => console.error(err));
  }

  function navigateToDetalhes(item: number) {
      router.push({ path: `/pacientes/detalhes`, query: { item } }).catch(err => console.error(err));
  } 
  
  // Definindo variáveis reativas
  const semDados = ref('Não foram encontrados dados.')
  const search = ref(''); //Campo de dados do search
  const pacientes = ref<PacienteResumoResult[]>([]); //Lista que renderizará os dados na tela

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

  // Função para calcular a idade
  const calcularIdade = (dataNascimento: Date): number => {
    const nascimento = typeof dataNascimento === 'string' ? new Date(dataNascimento) : dataNascimento;

    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    // Ajusta a idade se ainda não tiver feito aniversário este ano
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  };

  
  // Definindo os cabeçalhos da tabela
  const headers = [
    { title: 'Nome', value: 'nome' },
    { title: 'Cpf', value: 'cpf' },
    { title: 'Idade', value: 'idade' },
    { title: 'Telefone', value: 'telefone' },
  ];
  
  // Função para buscar pacientes paginadas
  const fetchPacientes = async () => {
    try {
      const data: PaginacaoResult<PacienteResumoResult> = await getPacientesPaginado(page.value, itemsPerPage.value);
      pacientes.value = data.items;
      totalItems.value = data.totalItems;
      loading.value = false;
      console.log(pacientes.value);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  };

  // Função que é chamada quando o usuário clica no botão de pesquisa
    const searchPacientes = async () => {
        if (search.value === '' && !limparSearch.value) 
        {
            return;
        }

        if(limparSearch.value){
            limparSearch.value = false;
            search.value = '';
            await fetchPacientes();
            return;
        }

        loading.value = true;
        try {
            const data: PaginacaoResult<PacienteResumoResult> 
                = await getPacientesSearchPaginado(search.value, page.value, itemsPerPage.value);
            pacientes.value = data.items;
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
        fetchPacientes();
    };
  
  // Chamando a função na montagem do componente
  onMounted(() => {
    fetchPacientes();
  });
  </script>
  