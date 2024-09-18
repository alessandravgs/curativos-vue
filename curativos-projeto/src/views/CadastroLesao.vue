<template>
    <v-container  style="max-width: 1200px; margin: 0 auto;">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2 ">
            <h1 class="text-indigo-darken-3">Nova Lesão</h1>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Paciente" icone="mdi mdi-account">
                <InputElemento />
            </CardCadastro>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Localização" icone="mdi mdi-map-marker-outline">
                <LocalizacaoLesao />
            </CardCadastro>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Classificação da Lesão" icone="mdi mdi-order-bool-descending">
                <ClassificacaoLesao />
            </CardCadastro>
          </v-sheet>
        </v-col>

      </v-row>

      <v-row no-gutters>
       
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Situação da Lesão" icone="mdi mdi-circle-edit-outline">
                <SituacaoLesao />
            </CardCadastro>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Detalhes" icone="mdi mdi-details">
                <InputString />
            </CardCadastro>
          </v-sheet>
        </v-col>

      </v-row>
      
      <v-col class="d-flex justify-end">
        <v-btn  
          color="indigo-darken-3"
          prepend-icon="mdi mdi-content-save-outline"
          size="large"
        >
          Salvar
        </v-btn>
      </v-col>

    </v-container>
  </template>

<script setup lang="ts">
import CardCadastro from '@/components/CardCadastro.vue';
import InputElemento from '@/components/InputElemento.vue';
import InputString from '@/components/InputString.vue';
import ClassificacaoLesao from '@/components/Lesao/ClassificacaoLesao.vue';
import LocalizacaoLesao from '@/components/Lesao/LocalizacaoLesao.vue';
import SituacaoLesao from '@/components/Lesao/SituacaoLesao.vue';



</script>

<style scoped>
.container-small {
  max-width: 400px; /* Ajuste para telas pequenas */
}

.container-medium {
  max-width: 800px; /* Ajuste para telas médias e maiores */
}
</style>