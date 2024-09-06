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
            <CardCadastro titulo="Paciente">
                <InputElemento />
            </CardCadastro>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Lesão">
                <InputElemento />
            </CardCadastro>
          </v-sheet>
        </v-col>
      </v-row>
  
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Avaliação">
                <AvaliacaoFormulario />
            </CardCadastro>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Coberturas">
                <CoberturasSelecao />
            </CardCadastro>
          </v-sheet>
        </v-col>
  
        <v-responsive width="100%"></v-responsive>
  
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Orientações">
                <InputString />
            </CardCadastro>
          </v-sheet>
        </v-col>
  
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Detalhes">
                <InputString />
            </CardCadastro>
          </v-sheet>
        </v-col>
      </v-row>
  
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Imagens">
                <InputDados/>
            </CardCadastro>
          </v-sheet>
        </v-col>
      </v-row>
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