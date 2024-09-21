<template>
    <v-container style="max-width: 1200px; margin: 0 auto;">
      <!-- Título -->
      <h1 class="text-indigo-darken-3">Lesão</h1>
        
      <v-card class="pa-4">
      <v-row>
        <!-- Nome -->
        <v-col cols="12">
            <h3 class="text-indigo-darken-3 mb-4">Paciente</h3>
            <v-row>
                <v-col cols="4">
                <v-icon>mdi-account</v-icon> James Marshal
                </v-col>
                <v-col cols="4">
                <v-icon>mdi mdi-human-male-female</v-icon> Masculino
                </v-col>
                <v-col cols="4">
                <v-icon>mdi mdi-cake-variant-outline</v-icon> 11/02/1995
                </v-col>
            </v-row>

            <v-divider class="mb-4 my-3"></v-divider>
            <h3 class="text-indigo-darken-3 mb-4">Dados da Lesão</h3>

            <v-row>
                <v-col>
                    <p class="text-body-2 font-weight-medium">Detalhes</p>
                    <p>Lesão na perna esquerda</p>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="4">
                    <p class="text-body-2 font-weight-medium">Membro</p>
                    <p>Joelho</p>
                </v-col>
                <v-col cols="4">
                    <p class="text-body-2 font-weight-medium">Região</p>
                    <p>Esquerda</p>
                </v-col>
                <v-col cols="4">
                    <p class="text-body-2 font-weight-medium">Situação</p>
                    <v-chip
                    :color="situacao == 'Fechada' ? 'green' : 'red'"
                    :text="situacao"
                    class="text-uppercase"
                    size="small"
                    label
                    ></v-chip>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="4">
                    <p class="text-body-2 font-weight-medium">Tipo de Úlcera</p>
                    <p>Nenhuma</p>
                </v-col>
                <v-col cols="8">
                    <p class="text-body-2 font-weight-medium">Características</p>
                    <v-chip color="indigo-darken-3" label class="mr-3 mt-2"
                    v-for="carac in caracteristicas"
                    :key="carac">
                        <v-icon icon="mdi-label" start></v-icon>
                        {{carac}}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>       
      </v-row>
    </v-card>
      
    </v-container>
  </template>

<script setup>

    const situacao = "Granulação";
    const caracteristicas = ["Cirurgica", "Infectada", "Hanseniase",
        "Miiase", "Amputação", "Desbridamento", "Traumatica"
    ]

</script>
  
  <style scoped>
  h3 {
    margin-top: 20px;
  }

  p {
    margin-bottom: 8px;
  }
  </style>
  