<template>
  <v-card class="mx-auto" hover style="max-width: 1200px; margin: 0 auto;">
    <v-card-item>
      <div class="d-flex align-center">
        <v-card-title class="mx-1 flex-grow-1 mb-4 text-indigo-darken-3" style="font-size: 1.8rem;">
          Profissional
        </v-card-title>
        <div>
          <v-btn class="mx-1" color="indigo-darken-3" variant="outlined" @click="alterarSenha">
            Alterar Senha
          </v-btn>
          <v-btn 
            class="mx-1" 
            :color="isEditing ? 'green' : 'indigo-darken-3'" 
            @click="toggleEdit"
            :prepend-icon="isEditing ? 'mdi-content-save' : 'mdi-pencil'"
          >
            {{ isEditing ? 'Salvar' : 'Editar' }}
          </v-btn>
        </div>
      </div>
      <v-divider class="mb-4"></v-divider>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Nome
      </div>
      <v-text-field
        density="compact"
        :model-value="itemDetails?.nome"
        @update:model-value="updateNome"
        prepend-inner-icon="mdi mdi-account"
        variant="outlined"
        :readonly="!isEditing"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Email
      </div>
      <v-text-field
        density="compact"
        :model-value="itemDetails?.email"
        @update:model-value="updateEmail"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        :readonly="!isEditing"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Cpf
      </div>
      <v-text-field
        density="compact"
        :model-value="itemDetails?.cpf"
        @update:model-value="updateCpf"
        prepend-inner-icon="mdi-card-account-details-outline"
        variant="outlined"
        :readonly="!isEditing"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Telefone
      </div>
      <v-text-field
        density="compact"
        :model-value="itemDetails?.telefone"
        @update:model-value="updateTelefone"
        prepend-inner-icon="mdi-cellphone"
        variant="outlined"
        :readonly="!isEditing"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Login
      </div>
      <v-text-field
        density="compact"
        :model-value="itemDetails?.login"
        @update:model-value="updateLogin"
        prepend-inner-icon="mdi mdi-login"
        variant="outlined"
        :readonly="!isEditing"
      ></v-text-field>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ProfissionalDto } from '@/types/profissional';
import { getProfissionalById, updateProfissional } from '@/services/ProfissionalService';

const itemDetails = ref<ProfissionalDto | null>(null);
const isEditing = ref(false);

onMounted(async () => {
  itemDetails.value = await getProfissionalById();
});

function toggleEdit() {
  if (isEditing.value) {
    saveChanges();
  }
  isEditing.value = !isEditing.value;
}

const saveChanges = async () => {
  try{
    const updatedProfissional = getUpdatedProfissional(); 
    await updateProfissional(updatedProfissional);
  }
  catch(error){
    alert('Não foi possível atualizar profissional.')
  }
}

function getUpdatedProfissional(): ProfissionalDto {
  if (!itemDetails.value) {
    throw new Error('Nenhum detalhe do profissional encontrado');
  }
  
  return {
    nome: itemDetails.value.nome,
    email: itemDetails.value.email,
    cpf: itemDetails.value.cpf,
    login: itemDetails.value.login,
    telefone: itemDetails.value.telefone,
  };
}

function alterarSenha() {
  console.log("Alterar Senha");
}

function updateNome(newValue: string) {
  if (itemDetails.value) {
    itemDetails.value.nome = newValue;
  }
}

function updateEmail(newValue: string) {
  if (itemDetails.value) {
    itemDetails.value.email = newValue;
  }
}

function updateCpf(newValue: string) {
  if (itemDetails.value) {
    itemDetails.value.cpf = newValue;
  }
}

function updateTelefone(newValue: string) {
  if (itemDetails.value) {
    itemDetails.value.telefone = newValue;
  }
}

function updateLogin(newValue: string) {
  if (itemDetails.value) {
    itemDetails.value.login = newValue;
  }
}
</script>
