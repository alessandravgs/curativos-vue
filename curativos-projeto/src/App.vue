<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <!-- Renderizar MenuNavegacao e AppBar somente se a rota não for login ou home -->
      <template v-if="!isLoginOrHomePage">
        <MenuNavegacao/>
        <v-app-bar class="px-3 text-indigo-darken-3 font-weight-bold">
          <v-img
            src="/seminar.png"  
            max-width="200"        
            class="mr-2"        
          ></v-img>
          <v-spacer></v-spacer>
          <v-btn
            :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            text="Tema"
            slim
            @click="onClick"
          ></v-btn>
          <v-btn
            color="error"
            prepend-icon="mdi-logout"
            @click="logout"
            v-if="token"
          >
            Logout
          </v-btn>
        </v-app-bar>
      </template>

      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
import { ref, watchEffect  } from 'vue';
import { useRoute, useRouter  } from 'vue-router';
import MenuNavegacao from './components/MenuNavegacao.vue';

const theme = ref('light');

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}

// Definir as rotas de login e home onde o layout deve ser simplificado
const route = useRoute();
const router = useRouter();
const isLoginOrHomePage = ref(false);
const token = ref<string | null>(localStorage.getItem('token'));

// Verifica a rota atual para aplicar a condição
watchEffect(() => {
  const currentRouteName = route.name;
  isLoginOrHomePage.value = (currentRouteName === 'Login' || currentRouteName === 'Apresentacao');
  token.value = localStorage.getItem('token'); 
});

// Função de logout
function logout() {
  localStorage.removeItem('token');  // Remover o token do localStorage
  token.value = null;                // Atualiza o estado do token (se estiver sendo monitorado)
  router.push({ name: 'Login' });    // Redireciona para a página de login
}
</script>
