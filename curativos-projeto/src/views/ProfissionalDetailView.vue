<template>
  <v-card class="mx-auto" hover style="max-width: 1200px; margin: 0 auto;">
    <v-card-item>
      <div class="d-flex align-center">
        <v-card-title class="mx-1 flex-grow-1 mb-4 text-indigo-darken-3"  style="font-size: 1.8rem;">
          Profissional
        </v-card-title>

        <div>
          <v-btn
            class="mx-1"
            color="indigo-darken-3"
            variant="outlined"
            @click="alterarSenha"
          >
            Alterar Senha
          </v-btn>
          <v-btn
            class="mx-1"
            color="indigo-darken-3"
            @click="editar"
          >
            Editar
          </v-btn>
        </div>
      </div>

      <v-divider class="mb-4"></v-divider>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Nome
      </div>
      <v-text-field
        density="compact"
        model-value="Camila Duarte"
        prepend-inner-icon="mdi mdi-account"
        variant="outlined"
        readonly
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Email
      </div>
      <v-text-field
        density="compact"
        model-value="camila_duarte@gmail.com"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        readonly
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Cpf
      </div>
      <v-text-field
        density="compact"
        model-value="586.589.468-60"
        prepend-inner-icon="mdi-card-account-details-outline"
        variant="outlined"
        readonly
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Telefone
      </div>
      <v-text-field
        density="compact"
        model-value="(83) 98885-6989"
        prepend-inner-icon="mdi-cellphone"
        variant="outlined"
        readonly
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Login
      </div>
      <v-text-field
        density="compact"
        model-value="camila_duarte"
        prepend-inner-icon="mdi mdi-login"
        variant="outlined"
        readonly
      ></v-text-field>

    </v-card-item>
  </v-card>
</template>

<script setup>
function alterarSenha() {
  // Lógica para alterar a senha
  console.log("Alterar Senha");
}

function editar() {
  // Lógica para editar
  console.log("Editar");
}
</script>
