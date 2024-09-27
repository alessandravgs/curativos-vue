<template>
    <v-row class="mt-2">
      <v-col cols="12">
        <v-row>
          <v-col>
            <v-combobox
                v-model="select"
                label="Selecione as coberturas"
                chips
                multiple
                @click="openDialog"
                readonly
                prepend-inner-icon="mdi-format-list-checks"
                 class="custom-padding"
            ></v-combobox>
          </v-col>
        </v-row>
  
        <!-- Dialog para buscar coberturas -->
        <v-dialog v-model="dialog" max-width="700px" persistent>
          <v-card>
            <v-row class="d-flex justify-space-between align-center">
                <v-col>
                    <v-card-title class="headline">
                    <h3 class="text-indigo-darken-3 mt-2">Selecionar Coberturas</h3>
                    </v-card-title>
                </v-col>

                
                <v-col cols="auto" class="d-flex justify-end">
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

              
            <v-card-text>
              <!-- Campo de busca dentro do dialog -->
              <v-row>
                <v-col cols="12">
                    <v-combobox
                        v-model="select"
                        label=""
                        chips
                        multiple
                        readonly
                        prepend-inner-icon="mdi-format-list-checkbox"
                    ></v-combobox>
                </v-col>
              </v-row>
  
              <!-- Lista de coberturas -->
              <v-data-table-server
                v-model:items-per-page="itemsPerPage"
                :items-per-page-options="configItems"
                :headers="headers"
                :items="coberturas"
                :items-length="totalItems"
                :loading="loading"
                :page="page"
                :no-data-text="semDados"
                @update:options="updateOptions"
                hover
              >
                <template v-slot:item="{ item }">
                    <tr>
                        <td><v-checkbox v-model="item.selected" @change="selectCobertura(item)"/></td>
                        <td>{{ item.nome }}</td>
                    </tr>
                </template>
              </v-data-table-server>
            </v-card-text>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" @click="limparSelecoes" :prepend-icon="'mdi mdi-broom'">Limpar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
</template>
  
<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from 'vue';
import { PaginacaoResult } from '@/types/geral';
import { CoberturaResumoResult, CoberturaResumoResultSelect } from '@/types/cobertura';
import { getCoberturasPaginado } from '@/services/TratamentoService';

const props = defineProps<{
      coberturasEdit: CoberturaResumoResultSelect[]; 
}>();

const emit = defineEmits(['coberturaSelecionado']);

const semDados = ref('Não foram encontrados dados.');
const totalItems = ref(0);
const loading = ref(true);
const configItems = ref([{value: 50, title: '50'}, {value: 100, title: '100'}]);
const itemsPerPage = ref(50);
const page = ref(1);
const headers = [{ title: 'Selecionar', value: 'selecionar' }, { title: 'Nome da Cobertura', value: 'nome' }];
const select = ref<string[]>([]);
const coberturas = ref<CoberturaResumoResultSelect[]>([]);
const coberturasSelecionadas = ref<CoberturaResumoResultSelect[]>([]);
const dialog = ref<boolean>(false); // Controla a exibição do popup

// Função para buscar coberturas com preservação de seleção
const fetchCoberturas = async () => {
    loading.value = true;
    try {
        const data: PaginacaoResult<CoberturaResumoResult> = await getCoberturasPaginado(page.value, itemsPerPage.value);
        
        // Garantir que os itens retornados sejam marcados como selecionados se já estiverem em 'coberturasSelecionadas'
        coberturas.value = data.items.map(item => {
            const isSelected = coberturasSelecionadas.value.some(selected => selected.id === item.id);
            return { ...item, selected: isSelected }; // Preserva a seleção dos itens
        });

        totalItems.value = data.totalItems;
    } catch (error) {
        console.error('Erro ao buscar coberturas:', error);
    } finally {
        loading.value = false;
    }
};

// Atualizar a tabela com as novas opções de paginação e refazer a busca
const updateOptions = (newOptions: any) => {
    page.value = newOptions.page;
    itemsPerPage.value = newOptions.itemsPerPage;
    fetchCoberturas();
};

// Função chamada ao mudar o checkbox de uma cobertura
const selectCobertura = (cobertura: CoberturaResumoResultSelect) => {
    const index = coberturasSelecionadas.value.findIndex(item => item.id === cobertura.id);

    if (cobertura.selected) {
        // Adiciona à lista de coberturas selecionadas se não estiver presente
        if (index === -1) {
            coberturasSelecionadas.value.push(cobertura);
        }
    } else {
        // Remove da lista de coberturas selecionadas se for desmarcado
        if (index !== -1) {
            coberturasSelecionadas.value.splice(index, 1);
        }
    }
};

// Confirma as coberturas selecionadas e fecha o dialog
const confirmarCobertura = () => {
    const selecionadas = coberturas.value.filter(item => item.selected);
    emit('coberturaSelecionado', selecionadas);
    closeDialog();
};

// Função para limpar as seleções
const limparSelecoes = () => {
    // Desmarcar todos os itens na lista de coberturas
    coberturas.value.forEach(item => {
        item.selected = false;
    });

    // Limpar as listas de coberturas selecionadas e o campo de busca (select)
    coberturasSelecionadas.value = [];
    select.value = [];
};

// Sincroniza o campo `v-combobox` com as coberturas selecionadas
watch(coberturasSelecionadas, (newVal) => {
    select.value = newVal.map(item => item.nome);
}, { deep: true });

// Abre o dialog de busca
const openDialog = () => {
    dialog.value = true;
};

// Fecha o dialog
const closeDialog = () => {
    dialog.value = false;
};

onMounted(() => {
    if(props.coberturasEdit){
        coberturasSelecionadas.value = props.coberturasEdit;
    }

    fetchCoberturas();
});
</script>


<style scoped>
.custom-padding {
padding-left: 10px; 
}
</style>