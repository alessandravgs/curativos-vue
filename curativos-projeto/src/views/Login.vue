<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="400"
      src="/seminar1.png"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Login</div>
      <v-form ref="formRef" @submit.prevent="login">
        <v-text-field
          density="compact"
          placeholder="Email ou Login"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="loginForm.email"
          :rules="[v => !!v || 'Campo obrigatório']"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Senha
          <a
            class="text-caption text-decoration-none text-indigo-darken-3"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Esqueceu a senha?
          </a>
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Digite sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="loginForm.senha"
          :rules="[v => !!v || 'Campo obrigatório']"
        ></v-text-field>

        <v-card v-if="errorMessage"
          class="mb-12"
          color="red-lighten-1"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            {{ errorMessage }}
          </v-card-text>
        </v-card>

        <v-btn
          class="mb-8 mt-4"
          color="indigo-darken-3"
          size="large"
          variant="tonal"
          block
          type="submit"
        >
          Login
        </v-btn>
      </v-form>
      <v-card-text class="text-center" v-if="visibleCadastro">
        <a
          class="text-indigo-darken-3 text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Cadastre-se agora <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted  } from 'vue';
import { useRouter } from 'vue-router';
import { createApiClient } from '@/services/axios';
import axios from 'axios';

const visible = ref(false);
const visibleCadastro = ref(true);

onMounted(async () => {
  if(props.apresentacao){
    visibleCadastro.value = !props.apresentacao;
  }
});

const props = defineProps<{
  apresentacao?: boolean;
}>();

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
  
  if(loginForm.value.email === '' || loginForm.value.senha === '' ){
    errorMessage.value = 'Necessário preencher Login e Senha';
    return;
  }

  try {
    const response = await apiClient.post('/profissional/login', loginForm.value, {
      skipAuth: true, 
    });
    const token = response.data.token;

    localStorage.setItem('token', token);
    router.push({ name: 'Inicio' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorMessage.value = error.response?.data?.message || 'Falha no login. Verifique suas credenciais.';
    } else {
      errorMessage.value = 'Erro inesperado.';
    }
  }
};
</script>
