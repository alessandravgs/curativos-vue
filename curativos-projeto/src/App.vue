<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <MenuNavegacao/>

      <v-app-bar title="Curativos" class="px-3">
        <v-spacer></v-spacer>
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Tema"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <Relatorios/>
        </v-container>
      </v-main>

    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import MenuNavegacao from './components/MenuNavegacao.vue';
import Relatorios from './views/Relatorios.vue';

  const theme = ref('light')

  function onClick () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
</script>
