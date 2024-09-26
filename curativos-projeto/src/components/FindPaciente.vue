<template>
    <v-row class="mt-2">
      <v-col cols="12">
        <v-row>
          <v-col>
            <v-text-field
              :key="selectedPaciente" 
              v-model="selectedPaciente"
              label="Buscar Paciente"
              prepend-inner-icon="mdi-magnify"
              class="mx-1 rounded-textarea"
              @click="openDialog"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
  
        <!-- Dialog para buscar pacientes -->
        <v-dialog v-model="dialog" max-width="700px" :disabled="isDialogDisabled">
          <v-card>
            <v-row>
                  <v-col>
                        <v-card-title class="headline"><h3 class="text-indigo-darken-3 mt-2">Buscar Paciente</h3></v-card-title>
                  </v-col>
            </v-row>
              
            <v-card-text>
              <!-- Campo de busca dentro do dialog -->
              <v-row>
                <v-col cols="9">
                  <v-text-field
                    v-model="search"
                    density="compact"
                    label="Buscar Paciente"
                    prepend-inner-icon="mdi-magnify"
                    variant="solo-filled"
                    flat
                    hide-details
                    single-line
                    class="mx-1"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="d-flex justify-end">
                  <v-btn
                    class="mx-1"
                    color="indigo-darken-3"
                    :prepend-icon="'mdi-magnify'"
                    @click="searchPacientes"
                  >
                    {{ 'Buscar' }}
                  </v-btn>
                </v-col>
              </v-row>
  
              <!-- Lista de pacientes -->
                <v-data-table-server
                    v-if="pacientes.length > 0"
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
                            <tr @click="selectPaciente(item)">
                                <td>{{ item.nome }}</td>
                                <td>{{ item.cpf }}</td>
                            </tr>
                        </template>
                </v-data-table-server>
            </v-card-text>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1"  @click="closeDialog">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </template>
  
  <script setup lang="ts">
    import { ref, defineProps, onMounted, computed   } from 'vue';
    import { PacienteResumoResult } from '@/types/paciente';
    import { getPacientesSearchPaginado, getPacienteById } from '@/services/PacienteService';
    import { PaginacaoResult } from '@/types/geral';

    const props = defineProps<{
      id: number; 
    }>();

    const emit = defineEmits(['pacienteSelecionado']);
  
    const semDados = ref('Não foram encontrados dados.');

    // Total de items no servidor
    const totalItems = ref(0);

    // Estado do loading
    const loading = ref(true);

    // Configuração listagem da quantidade de elementos exibidos por vez
    const configItems = ref([
        {value: 10, title: '10'},
        {value: 25, title: '25'},
    ]);

    // Items exibidos por página
    const itemsPerPage = ref(10);

    // Número da página a ser exibida
    const page = ref(1);

    // Definindo os cabeçalhos da tabela
    const headers = [
        { title: 'Nome', value: 'nome' },
        { title: 'Cpf', value: 'cpf' },
    ];

    const search = ref<string>(''); // Campo de busca
    const pacientes = ref<PacienteResumoResult[]>([]); // Lista de pacientes buscados
    const selectedPaciente = ref<string>(''); // Paciente selecionado
    const dialog = ref<boolean>(false); // Controla a exibição do popup

    // Função que é chamada quando o usuário clica no botão de pesquisa
    const searchPacientes = async () => {
        if (search.value === '') 
        {
            return;
        }

        loading.value = true;
        try {
            const data: PaginacaoResult<PacienteResumoResult> 
                = await getPacientesSearchPaginado(search.value, page.value, itemsPerPage.value);
            pacientes.value = data.items;
            totalItems.value = data.totalItems;
            loading.value = false;
        } catch (error) {
            loading.value = false;
            console.error('Erro ao buscar pacientes:', error);
        }
    };

    // Atualizar as opções de paginação e buscar novamente
    const updateOptions = (newOptions: any) => {
        page.value = newOptions.page;
    };

    // Abre o dialog de busca
    const openDialog = () => {
        dialog.value = true;
    };

    // Fecha o dialog
    const closeDialog = () => {
        dialog.value = false;
    };

    // Seleciona o paciente e fecha o dialog
    const selectPaciente = (paciente: PacienteResumoResult) => {
        selectedPaciente.value = paciente.nome;
        dialog.value = false; // Fecha o popup
        emit('pacienteSelecionado', paciente); // Emite o paciente selecionado para o componente pai
    };

    const fetchPacientesById = async () => {
      if (props.id) {
        loading.value = true;
        try {
          const data = await getPacienteById(props.id);
          selectedPaciente.value = data.nome;
        } catch (error) {
          console.error('Erro ao buscar pacientes:', error);
        } finally {
          loading.value = false;
        }
      }
    };

    const isDialogDisabled = computed(() => {
      return props.id === 0; 
    });

    onMounted(async () => {
      await fetchPacientesById();
    });
  </script>
  
  <style scoped>
  .selected-paciente {
    background-color: rgba(0, 0, 255, 0.1); /* Indica o paciente selecionado */
  }
  </style>
  