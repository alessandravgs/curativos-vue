<template>
    <v-row class="mt-2">
      <v-col cols="12">
        <v-row>
          <v-col>
            <v-text-field
              :key="selectedLesao" 
              v-model="selectedLesao"
              label="Selecionar Lesão"
              prepend-inner-icon="mdi-order-bool-ascending-variant"
              rounded
              @click="openDialog"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
  
        <!-- Dialog para buscar lesões -->
        <v-dialog v-model="dialog" max-width="700px" v-if="!isDialogDisabled" persistent>
          <v-card>
            <v-row>
                  <v-col>
                        <v-card-title class="headline"><h3 class="text-indigo-darken-3 mt-2">Buscar Lesões</h3></v-card-title>
                  </v-col>
            </v-row>
              
            <v-card-text>
              <!-- Campo de busca dentro do dialog -->
              <v-row>
                <v-col cols="9">
                  <v-text-field
                    v-model="search"
                    density="compact"
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
                    :prepend-icon="'mdi mdi-check-bold'"
                    @click="confirmarCobertura"
                  >
                    {{ 'Confirmar' }}
                  </v-btn>
                </v-col>
              </v-row>
              
              <v-spacer></v-spacer>

              <!-- Lista de lesões -->
              <v-data-table-server
                v-if="lesoes.length > 0"
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
                        <tr @click="selectLesao(item)">
                            <td>{{ item.detalhes }}</td>
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
    import { ref, defineProps, onMounted, watch } from 'vue';
    import { PaginacaoResult } from '@/types/geral';
    import { LesaoResumoResult } from '@/types/lesao';
    import { getLesoesSearchByPacientePaginado } from '@/services/LesaoService';
    import { SituacaoLesaoDisplayNames } from '@/enums/SituacaoLesao';
    import { RegiaoDisplayNames } from '@/enums/Regiao';
    import { LadoRegiaoDisplayNames } from '@/enums/LadoRegiao';

    // Definindo variáveis reativas
    const lesoes = ref<LesaoResumoResult[]>([]); 
    const lesaoSelecionada = ref<LesaoResumoResult>();

    // Definindo os cabeçalhos da tabela
    const headers = [
        { title: 'Detalhes', value: 'detalhes' },
        { title: 'Região', value: 'regiao' },
        { title: 'Lado', value: 'lado' },
        { title: 'Situação', value: 'situacao' },
    ];

    const props = defineProps<{
      idPaciente: number; 
    }>();

    const emit = defineEmits(['lesaoSelecionado']);
  
    const semDados = ref('Não foram encontradas lesões para o paciente selecionado.');

    // Total de items no servidor
    const totalItems = ref(0);

    // Estado do loading
    const loading = ref(true);

    // Configuração listagem da quantidade de elementos exibidos por vez
    const configItems = ref([
        {value: 10, title: '10'},
    ]);

    // Items exibidos por página
    const itemsPerPage = ref(10);

    // Número da página a ser exibida
    const page = ref(1);
    const selectedLesao = ref<string>();
    const search = ref<string>(''); // Campo de busca
    const dialog = ref<boolean>(false); // Controla a exibição do popup

    // Função para buscar lesões paginadas
    const fetchLesoes = async () => {
        console.log(props.idPaciente)
        if(props.idPaciente){
            try {
                const data: PaginacaoResult<LesaoResumoResult> = await getLesoesSearchByPacientePaginado(props.idPaciente, page.value, itemsPerPage.value);
                lesoes.value = data.items;
                totalItems.value = data.totalItems;
                loading.value = false;
                console.log(lesoes.value);
            } catch (error) {
                console.error('Erro ao buscar lesões:', error);
            }
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

    // Seleciona o lesão
    const selectLesao = (lesao: LesaoResumoResult) => {
        lesaoSelecionada.value = lesao;
        selectedLesao.value = lesao.detalhes; 
        search.value = lesao.detalhes;
    };

    //Confirma a lesão selecionada e fecha o dialog
    const confirmarCobertura = () => {
        if(lesaoSelecionada.value){
            emit('lesaoSelecionado', lesaoSelecionada.value); 
        }
        closeDialog();
    };

    const isDialogDisabled = ref(false);

    watch(() => props.idPaciente, fetchLesoes);

    onMounted(async () => {
      await fetchLesoes();
    });
  </script>
  
  <style scoped>
  .selected-paciente {
    background-color: rgba(0, 0, 255, 0.1); /* Indica o paciente selecionado */
  }
  </style>
  