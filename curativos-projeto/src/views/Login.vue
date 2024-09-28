<template>
    <v-row class="login-page">
      <v-col class="text-center">
        <h1>Login</h1>
        <v-form @submit.prevent="login">
          <v-text-field v-model="loginForm.email" label="Email" required></v-text-field>
          <v-text-field v-model="loginForm.senha" label="Senha" type="password" required></v-text-field>
          <v-btn type="submit" color="primary">Entrar</v-btn>
        </v-form>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </v-col>
    </v-row>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { createApiClient } from '@/services/axios';
  import axios from 'axios'; 
  
  interface LoginForm {
    email: string;
    senha: string;
  }
  
  const loginForm = ref<LoginForm>({
    email: '',
    senha: '',
  });
  
  const errorMessage = ref<string>('');
  const router = useRouter();
  const apiClient = createApiClient(router);
  
  const login = async () => {
    try {
      console.log(loginForm.value);
      const response = await apiClient.post('/profissional/login', loginForm.value, {
            skipAuth: true, 
        });
      console.log(response.data);
      const token = response.data.token;

      localStorage.setItem('token', token);
      router.push({ name: 'Inicio' });
    } catch (error) {
      console.log(error); 
      if (axios.isAxiosError(error)) {
        console.error('Erro Axios:', error.response?.data || error.message);
        errorMessage.value = error.response?.data?.message || 'Falha no login. Verifique suas credenciais.';
      } else {
        errorMessage.value = 'Erro inesperado.';
      }
    }
};

  </script>
  