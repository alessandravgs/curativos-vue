<template>
    <v-container style="max-width: 1200px; margin: 0 auto;">
        <v-responsive>
            <v-row no-gutters>
                <v-col>
                    <v-sheet class="mb-2 text-indigo-darken-3">
                        <h1>{{ isEditing ? 'Editar Tratamento' : 'Cadastrar Tratamento' }}</h1>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <form @submit.prevent="submitForm">
                <v-text-field
                    v-model="nome"
                    :rules="rulesNome"
                    label="Nome Tratamento"
                ></v-text-field>

                <v-textarea
                    v-model="descricao"
                    :rules="rulesDescricao"
                    label="Descrição"
                ></v-textarea>

                <div class="d-flex justify-end">
                    <v-btn @click="handleReset" size="large">
                        Limpar
                    </v-btn>

                    <v-btn
                        class="ms-4"
                        type="submit"
                        size="large"
                        color="indigo-darken-3"
                    >
                        {{ isEditing ? 'Salvar' : 'Registrar' }}
                    </v-btn>
                </div>
            </form>       
        </v-responsive>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createTratamento, updateCobertura } from '../services/TratamentoService'; 
import { CoberturaResumoResult } from '../types/cobertura'

// Campos e validações
const id = ref<number>(0);
const nome = ref<string>('');
const descricao = ref<string>('');
const rulesNome = [
    (value: string) => value?.length >= 2 || 'O nome deve ter ao menos 2 caracteres.'
];
const rulesDescricao = [
    (value: string) => value?.length >= 5 || 'Deve ser preenchida a descrição.'
];

const route = useRoute();
const router = useRouter();
const isEditing = ref(false);

// Função de resetar os campos
const handleReset = () => {
    nome.value = '';
    descricao.value = '';
};

// Preencher os campos se estiver editando
onMounted(async () => {
    const tratamento = route.query as { id?: number; nome?: string; descricao?: string };
    console.log(tratamento);

    if (tratamento && tratamento.nome && tratamento.descricao) {
        isEditing.value = true;
        await nextTick();

        id.value = Number(tratamento.id);
        nome.value = tratamento.nome;
        descricao.value = tratamento.descricao;
    }
});

// Função de submit
const submitForm = async () => {
    try {

        const coberturaResumoResult = ref<CoberturaResumoResult | null>(null);

        if (isEditing.value) {
            const tratamentoUpdate ={
                id: id.value, 
                nome: nome.value,
                descricao: descricao.value
            };
            const reponse = await updateCobertura(tratamentoUpdate);
            coberturaResumoResult.value = reponse;
        } else {

            const tratamentoData = {
                nome: nome.value,
                descricao: descricao.value
            };

            const response = await createTratamento(tratamentoData);
            coberturaResumoResult.value = response;
        }

        navigateToDetalhes(coberturaResumoResult.value);
    } catch (error) {
        console.error('Erro ao registrar/atualizar tratamento:', error);
    }
};

function navigateToDetalhes(item: CoberturaResumoResult) {
            console.log(item)
            router.push({ path: `/tratamentos/detalhes`, query: { ...item }}).catch(err => console.error(err));
        } 
</script>
