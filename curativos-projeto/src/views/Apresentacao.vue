<template>
  <v-app>
  <!-- <v-container fluid> -->
      <v-row no-gutters>
        <!-- Parte esquerda -->
        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column justify-center align-center"
          style="background-color: #1e1e2f; color: white; height: 100vh;"
        >
          <div class="banner">
              <p class="cabecalho-lg frase-cabecalho">
                <span class="texto-verde">Faça acompanhamento de lesões com o</span>
                Curativo Vital
              </p>
          </div>
          <div class="banner2">
            <h2 class="text-h5 mb-4">Acompanhe seus pacientes de forma prática e tenha acesso ao
              histórico de curativos e a linha do tempo das lesões
            </h2>
          </div>
          <v-btn
            color="light-blue-darken-2"
            class="mb-3"
            append-icon="mdi-arrow-right-bold"
            size="x-large"
            @click="toggleLoginRegister"
          >
            {{ isRegistering ? 'Fazer Login' : 'Cadastre-se agora!' }}
          </v-btn>
         <p class="mt-5 text-center">Gere relatórios, acesse os registros em imagens e muito mais... </p>
        
        </v-col>

        <!-- Parte direita -->
        <v-col
          cols="12"
          md="6"
          class="justify-center align-center"
          style="background-color: #f5f5f5; height: 100vh;"
        >
        <div :class="isRegistering ? 'banner4' : 'banner3'">
          <div v-if="isRegistering"><CadastroProfissional/> </div>
          <div v-else="isRegistering"><Login/> </div>
        </div>
        </v-col>
      </v-row>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Login from './Login.vue';
import CadastroProfissional from '@/components/CadastroProfissional.vue';

const isRegistering = ref(false);

function toggleLoginRegister() {
  isRegistering.value = !isRegistering.value;
}
</script>

<style scoped>
html, body, #app {
  margin: 0;
  height: 100%;
}

.cabecalho-lg {
  font-family: var(--cabecalhos);
  font-size: 3.35625em;
  line-height: 120%; /* 4.0275em */
}

.cabecalho {
  font-family: var(--cabecalhos);
  font-size: 2.75em;
  line-height: 120%; /* 3.3em */
}

@media only screen and (max-width: 767px) {
  .cabecalho-lg {
    font-size: 2.75em;
  }

  .cabecalho {
    font-size: 2.3125em;
  }

  .banner2{
    padding: 6rem 6rem;
  }
}

.banner {
  padding: 4rem 7.5rem;
  color: var(--creme);

  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 3.25rem;
}

.banner2 {
  padding: 6rem 9.5rem;
  color: var(--creme);

  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 3.25rem;
  text-align: center;
}

.banner3 {
  padding: 11rem 7.5rem;
  color: var(--creme);

  justify-content: space-between;
  align-items: center;
  column-gap: 3.25rem;
}

.banner4 {
  padding: 3rem 7.5rem;
  color: var(--creme);

  justify-content: space-between;
  align-items: center;
  column-gap: 3.25rem;
}

.texto-verde {
  color: var(--verde-medio, #3D6D4A);
}
  
</style>


  

  