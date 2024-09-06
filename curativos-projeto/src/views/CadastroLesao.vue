<template>
    <v-container  style="max-width: 1200px; margin: 0 auto;">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2 ">
            <h1 class="cabecalho-lg">Nova Lesão</h1>
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
            <CardCadastro titulo="Localização">
                <LocalizacaoLesao />
            </CardCadastro>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Classificação da Lesão">
                <ClassificacaoLesao />
            </CardCadastro>
          </v-sheet>
        </v-col>

      </v-row>

      <v-row no-gutters>
       
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <CardCadastro titulo="Situação da Lesão">
                <SituacaoLesao />
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
  

    </v-container>
  </template>

<script setup lang="ts">
// import AvaliacaoFormulario from '@/components/AvaliacaoFormulario.vue';
import CardCadastro from '@/components/CardCadastro.vue';
// import CoberturasSelecao from '@/components/CoberturasSelecao.vue';
// import InputDados from '@/components/InputDados.vue';
import InputElemento from '@/components/InputElemento.vue';
import InputString from '@/components/InputString.vue';
import ClassificacaoLesao from '@/components/Lesao/ClassificacaoLesao.vue';
// import InputString from '@/components/InputString.vue';
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