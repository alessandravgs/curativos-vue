<template>
    <v-responsive class="border rounded">
      <v-app :theme="theme">
        <!-- Renderizar MenuNavegacao e AppBar somente se a rota não for login ou home -->
        <template v-if="!isLoginOrHomePage">
          <v-app-bar app elevation="0" color="#f5f5f5" class="px-3 text-indigo-darken-3 font-weight-bold border-bottom">
            <v-img
              src="/seminar1.png"  
              max-width="200"        
              class="mr-2"        
            ></v-img>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              prepend-icon="mdi-logout"
              @click="logout"
              v-if="token"
            >
              Logout
            </v-btn>
          </v-app-bar>
            <v-main>
              <v-container>
                  <MenuNavegacao/>
                  <RouterView />
                </v-container>
            </v-main>
        </template>
        <RouterView v-else />
      </v-app>
    </v-responsive>
  </template>
  <script setup lang="ts">
  import { ref, watchEffect  } from 'vue';
  import { useRoute, useRouter  } from 'vue-router';
  import MenuNavegacao from './components/MenuNavegacao.vue';
  const theme = ref('light');

  // Definir as rotas de login e home onde o layout deve ser simplificado
  const route = useRoute();
  const router = useRouter();
  const isLoginOrHomePage = ref(false);
  const token = ref<string | null>(localStorage.getItem('token'));
  // Verifica a rota atual para aplicar a condição
  watchEffect(() => {
    const currentRouteName = route.name;

    isLoginOrHomePage.value = (currentRouteName === 'Login' 
      || currentRouteName === 'Apresentacao' 
      || currentRouteName === 'RelatorioCurativo'
      || currentRouteName === 'RelatorioPacienteTotal'
      || currentRouteName ==='RelatorioProfissionalPeriodo'
      || currentRouteName ==='RelatorioPorLesao'
      || currentRouteName ==='RelatorioPacientePeriodo');

    token.value = localStorage.getItem('token'); 
  });
  // Função de logout
  function logout() {
    localStorage.removeItem('token');  // Remover o token do localStorage
    token.value = null;                // Atualiza o estado do token (se estiver sendo monitorado)
    router.push({ name: 'Login' });    // Redireciona para a página de login
  }
  </script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12); /* ou a cor que preferir */
}
</style>