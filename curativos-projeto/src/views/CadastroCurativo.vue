<template>
    <v-container  style="max-width: 1200px; margin: 0 auto;">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2 ">
            <h1 class="cabecalho-lg">Novo Curativo</h1>
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
            <CardCadastro titulo="Lesão" icone="mdi-heart-pulse">
                <InputElemento />
            </CardCadastro>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Avaliação" icone="mdi mdi-text-box-check-outline">
                <AvaliacaoFormulario />
            </CardCadastro>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Coberturas" icone="mdi-medication-outline">
                <CoberturasSelecao />
            </CardCadastro>
          </v-sheet>
        </v-col>
  
        <v-responsive width="100%"></v-responsive>
  
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Orientações" icone="mdi mdi-information-outline">
                <InputString />
            </CardCadastro>
          </v-sheet>
        </v-col>
  
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Detalhes" icone="mdi mdi-format-annotation-plus">
                <InputString />
            </CardCadastro>
          </v-sheet>
        </v-col>
      </v-row>
  
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Imagens" icone="mdi mdi-image-plus-outline">
                <InputDados/>
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
import AvaliacaoFormulario from '@/components/AvaliacaoFormulario.vue';
import CardCadastro from '@/components/CardCadastro.vue';
import CoberturasSelecao from '@/components/CoberturasSelecao.vue';
import InputDados from '@/components/InputDados.vue';
import InputElemento from '@/components/InputElemento.vue';
import InputString from '@/components/InputString.vue';



</script>

<style scoped>
.container-small {
  max-width: 400px; /* Ajuste para telas pequenas */
}

.container-medium {
  max-width: 800px; /* Ajuste para telas médias e maiores */
}
</style>