<template>
    <v-row class="home-page">
      <v-col class="text-center">
        <h1>Bem-vindo ao site</h1>
        <p>Informações gerais sobre o site...</p>
        <v-btn color="primary" @click="redirectToLogin">Fazer Login</v-btn>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const redirectToLogin = () => {
    router.push({ name: 'Login' });
  };
  </script>
  