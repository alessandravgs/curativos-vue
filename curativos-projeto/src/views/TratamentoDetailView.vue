<template>
    <v-container style="max-width: 1200px; margin: 0 auto;">
        <v-row>
            <!-- Título -->
            <v-col>
                <h1 class="text-indigo-darken-3">Tratamento</h1>
            </v-col>

            <v-spacer></v-spacer>

            <!-- Botão Editar -->
            <v-col class="text-right">
                <v-btn  
                    color="indigo-darken-3"
                    prepend-icon="mdi-pencil-outline"
                    @click="navigateToEdit(itemDetails)"
                >
                    Editar
                </v-btn>
            </v-col>
        </v-row>
        
        <v-card class="pa-4">
            <v-row>
                <!-- Nome -->
                <v-col>
                    <v-row>
                        <v-col>
                            <p class="text-body-2 font-weight-bold">Nome</p>
                            <p>{{ itemDetails?.nome }}</p>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row>
                <!-- Detalhes -->
                <v-col>
                    <v-row>
                        <v-col>
                            <p class="text-body-2 font-weight-bold">Detalhes</p>
                            <p>{{ itemDetails?.descricao }}</p>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CoberturaResumoResult } from '@/types/cobertura';

const route = useRoute();
const router = useRouter();
const itemDetails = ref<CoberturaResumoResult | null>(null);

function navigateToEdit(item: CoberturaResumoResult | null) {
    console.log(item);
    router.push({ path: `/tratamentos/novo`, query: { ...item }}).catch(err => console.error(err));
} 

onMounted(() => {
    itemDetails.value = {
        id: route.query.id as string, 
        nome: route.query.nome as string || '', 
        descricao: route.query.descricao as string || '', 
    } as unknown as CoberturaResumoResult;
});
</script>

<style scoped>
h3 {
    margin-top: 20px;
}

p {
    margin-bottom: 8px;
}
</style>
