<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <MenuNavegacao/>

      <v-app-bar title="Curativo Vital" class="px-3 text-indigo-darken-3 font-weight-bold" >
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
          <RouterView></RouterView>
        </v-container>
      </v-main>

    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import MenuNavegacao from './components/MenuNavegacao.vue';

  const theme = ref('light')

  function onClick () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
</script>
