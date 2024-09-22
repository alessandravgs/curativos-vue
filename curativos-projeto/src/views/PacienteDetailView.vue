<template>
    <v-container style="max-width: 1200px; margin: 0 auto;">
      <!-- Título -->
      <h1 class="text-indigo-darken-3">Paciente</h1>
        
      <v-card class="pa-4">
        <v-row>
            <v-col>
                <h3 class="text-indigo-darken-3">Detalhes</h3>
            </v-col>
        </v-row>

      <v-row>
        <!-- Nome -->
        <v-col cols="6">
          <v-row>
            <v-col>
              <p class="text-body-2 font-weight-bold">Nome</p>
              <p>José Napoleão Medeiros</p>
            </v-col>
          </v-row>
        </v-col>

        <!-- Cpf -->
        <v-col cols="6">
          <v-row>
            <v-col>
              <p class="text-body-2 font-weight-bold">Cpf</p>
              <p>126.758.694-58</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <!-- Data nascimento -->
        <v-col cols="6">
            <v-row>
                <v-col>
                    <p class="text-body-2 font-weight-bold">Data de Nascimento</p>
                    <p>05/08/1986</p>
                </v-col>
            </v-row>
        </v-col>
        
        <!-- Sexo -->
        <v-col cols="6">
            <v-row>
            <v-col>
                <p class="text-body-2 font-weight-bold">Sexo</p>
                <p>Masculino</p>
            </v-col>
            </v-row>
        </v-col>

      </v-row>
     
      <v-row>
        <!-- Email -->
        <v-col cols="6">
          <v-row>
            <v-col>
              <p class="text-body-2 font-weight-bold">Email</p>
              <p>anshan.dh81@gmail.com</p>
            </v-col>
          </v-row>
        </v-col>

        <!-- Telefone -->
        <v-col cols="6">
            <v-row>
            <v-col>
                <p class="text-body-2 font-weight-bold">Telefone</p>
                <p>(+55) 83 98707-6482</p>
            </v-col>
            </v-row>
        </v-col>
      </v-row>

      <v-divider class="mb-2 mt-2"></v-divider>

      <v-row>
            <v-col>
                <h3 class="text-indigo-darken-3">Alergias e Comorbidades</h3>
            </v-col>
        </v-row>

        <v-row>
        <!-- Email -->
        <v-col cols="6">
          <v-row>
            <v-col>
              <p class="text-body-2 font-weight-bold">Alergias</p>
              <p>Amendoin</p>

            </v-col>
          </v-row>
        </v-col>

        <!-- Telefone -->
        <v-col cols="6">
            <v-row>
            <v-col>
                <p class="text-body-2 font-weight-bold">Comorbidades</p>
                <p>Diabetes</p>
                <p>Pressão alta</p>
            </v-col>
            </v-row>
        </v-col>
      </v-row>

    </v-card>
      
    </v-container>
  </template>
  
  <style scoped>
  h3 {
    margin-top: 20px;
  }

  p {
    margin-bottom: 8px;
  }
  </style>
  