<template>
    <v-container  style="max-width: 1200px; margin: 0 auto;">

        <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2 ">
            <v-card class="mx-auto" max-width="344">
                <v-card-text>
                    <div>Bem-Vindo(a)</div>   
                    <p class="text-h6 font-weight-black">{{ itemDetails?.nome }}</p>
                    <v-divider></v-divider>
            
                    <v-list density="compact">
                        <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            :value="item"
                            color="primary"
                        >
                            <template v-slot:prepend>
                                <v-icon :icon="item.icon"></v-icon>
                            </template>

                            <div class="text-right">
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </div>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            
                <v-card-actions>
                    <v-btn
                    color="indigo-darken-3"
                    text="Ir para Perfil"
                    variant="text"
                    @click="navigateToProfissional"
                    ></v-btn>
                </v-card-actions>
                </v-card>
          </v-sheet>
        </v-col>
      </v-row>

        
    </v-container>
  </template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ProfissionalDto } from '@/types/profissional';
import { getProfissionalById } from '@/services/ProfissionalService';

const itemDetails = ref<ProfissionalDto | null>(null);
const items = ref<Array<{ text: string; icon: string }>>([]); 

onMounted(async () => {
  itemDetails.value = await getProfissionalById();
  if (itemDetails.value) {
    items.value = [
      { text: itemDetails.value.cpf, icon: 'mdi-card-account-details-outline' },
      { text: itemDetails.value.email, icon: 'mdi-email-outline' },
      { text: itemDetails.value.telefone, icon: 'mdi-cellphone' },
    ];
  }
});
const router = useRouter();

function navigateToProfissional() {
  router.push({ path: '/profissional' }).catch(err => console.error(err));
}

</script>

<style scoped>
.text-right {
  display: flex;
  justify-content: flex-end; /* Alinha o texto à direita */
}
</style>