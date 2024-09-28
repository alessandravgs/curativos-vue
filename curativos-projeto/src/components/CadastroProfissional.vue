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
        max-width="600"
        rounded="lg"
      >
      <h2 class="mb-4 text-center text-indigo-darken-3">Cadastre-se</h2>

        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
        <v-form @submit.prevent="cadastro">
          <v-text-field
            density="compact"
            placeholder="Digite seu nome"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            v-model="cadastroForm.nome"
            :rules="rulesNome"
          ></v-text-field>
  
          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Email
          </div>
  
          <v-text-field
            density="compact"
            placeholder="Digite seu email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            v-model="cadastroForm.email"
            :rules="rulesEmail"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Cpf
          </div>
  
          <v-text-field
            density="compact"
            placeholder="Digite seu Cpf"
            prepend-inner-icon="mdi-badge-account-horizontal-outline"
            variant="outlined"
            v-model="cadastroForm.cpf"
            :rules="rulesCpf"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Telefone
          </div>
  
          <v-text-field
            density="compact"
            placeholder="Digite seu telefone"
            prepend-inner-icon="mdi-phone"
            variant="outlined"
            v-model="cadastroForm.telefone"
            :rules="rulesTelefone"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Login
          </div>
  
          <v-text-field
            density="compact"
            placeholder="Digite seu login"
            prepend-inner-icon="mdi-login"
            variant="outlined"
            v-model="cadastroForm.login"
            :rules="rulesLoginSenha"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Senha
          </div>
  
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Digite sua senha"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            v-model="cadastroForm.senha"
            :rules="rulesLoginSenha"
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
            Cadastrar
          </v-btn>
        </v-form>
      </v-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { RegisterProfissionalRequest } from '@/types/profissional';
  import { createProfissional } from '@/services/ProfissionalService';
  
  const visible = ref(false);
  
  const cadastroForm = ref<RegisterProfissionalRequest>({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    telefone: '',
    login: ''
  });

const rulesNome = [
(value: string) => value?.length >= 2 || 'O nome deve ter ao menos 2 caracteres.'
];
const rulesCpf = [
(value: string) => !!value || 'CPF é obrigatório',
(value: string) => /^[0-9]+$/.test(value) || 'O cpf deve conter apenas números.',
(value: string) => value.length >= 11 || 'O cpf deve ter pelo menos 11 caracteres.',
(value: string) => value.length < 12 || 'O cpf não pode ter mais de 11 caracteres.',
];
const rulesTelefone = [
(value: string) => !!value || 'Campo é obrigatório.',
(value: string) => value.length >= 9 || 'O telefone deve ter pelo menos 9 caracteres.',
(value: string) => value.length < 12 || 'O telefone não pode ter mais de 11 caracteres.',
(value: string) => /^[0-9]+$/.test(value) || 'O telefone deve conter apenas números.'
];
const rulesEmail = [
(value: string) => value.length >= 5 || 'O email deve ter pelo menos 5 caracteres.',
(value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email inválido.'
];
const rulesLoginSenha = [
  (value: string) => !!value || 'O campo não pode estar vazio.',
  (value: string) => !/\s/.test(value) || 'O campo não pode conter espaços.',
  (value: string) => value.length >= 3 || 'O campo deve ter pelo menos 3 caracteres.'
];


  const errorMessage = ref<string>('');
  const router = useRouter(); 
  const cadastro = async () => {
    
    const validationResults = validateForm();

    if (validationResults !== true) {
        errorMessage.value = validationResults.join(' '); 
        return; 
    }
  
    try {
      const response = await createProfissional(cadastroForm.value);
        
      if(response){
        alert('Cadastrado com sucesso.');
        router.push({ name: 'Login' });
      }

    } catch (error) {
      console.log('Erro ao cadastrar profissional', error)
    }
  };

  const validateForm = () => {
    const validations = [
        ...rulesNome.map(rule => rule(cadastroForm.value.nome)),
        ...rulesEmail.map(rule => rule(cadastroForm.value.email)),
        ...rulesCpf.map(rule => rule(cadastroForm.value.cpf)),
        ...rulesTelefone.map(rule => rule(cadastroForm.value.telefone)),
        ...rulesLoginSenha.map(rule => rule(cadastroForm.value.login)),
        ...rulesLoginSenha.map(rule => rule(cadastroForm.value.senha))
    ];

    const errors = validations.filter(result => result !== true);
    return errors.length === 0 ? true : errors;
};
  </script>
  