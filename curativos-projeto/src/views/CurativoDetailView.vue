<template>
    <v-container style="max-width: 1200px; margin: 0 auto;">
      <!-- Título -->
      <h1 class="text-indigo-darken-3">Curativo</h1>
  
      <!-- Abas (Details, Invoice, Status) -->
      <v-tabs v-model="tab" class="text-indigo-darken-3">
        <v-tab :value="0">Detalhes</v-tab>
        <v-tab :value="1">Imagens</v-tab>
      </v-tabs>
  
      <!-- Conteúdo das Abas -->
      <v-tabs-window v-model="tab">
        <v-tabs-window-item :value="0">
          <!-- Detalhes do Pedido -->
          <v-row>
            <v-col cols="12">
              <v-card class="pa-3">
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
  
                <h3 class="text-indigo-darken-3 mb-4">Lesão</h3>
                <v-row>
                  <v-col cols="6">
                    <p>Detalhes: Lesão na perna esquerda</p>
                    <p>Região: Perna</p>
                    <p>Lado: Lado Esquerdo</p>
                  </v-col>
                  <v-col cols="6">
                    <p>Situação: Fechada</p>
                    <p>Status: Desbridamento</p>
                    <p>Manutenção: Em dia</p>
                  </v-col>
                </v-row>

                <v-divider class="mb-4 my-3"></v-divider>
  
                <v-row>
                  <v-col cols="6">
                    <h3 class="text-indigo-darken-3">Avaliação</h3>
                    <p>Altura: Joseph</p>
                    <p>Largura: William</p>
                    <p>Profundidade: 4898 Joanne Lane street</p>
                  </v-col>
                  <v-col cols="6">
                    <h3 class="text-indigo-darken-3">Coberturas</h3>
                    <p>Pomadas</p>
                    <p>Gases</p>
                    <p>Faixa</p>
                    <p>Oleo</p>
                    <p>Sabonete</p>
                    <p>Soro</p>
                  </v-col>
                </v-row>
  
                <!-- Status de pagamento e entrega -->
                <v-row>
                  <v-col cols="6">
                    <p><strong class="text-indigo-darken-3">Orientações:</strong> Paciente orientado 
                    a lavar com frequência e não inseriri pé no chão
                    para evitar dor.
                    </p>
                  </v-col>
                  <v-col cols="6">
                    <p><strong class="text-indigo-darken-3">Detalhes:</strong> 
                        Paciente orientado 
                    a lavar com frequência e não inseriri pé no chão
                    para evitar dor.
                    </p>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-tabs-window-item>

        <v-tabs-window-item :value="1">
            <v-container fluid>
          <v-row>
            <v-col
              v-for="i in 6"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :lazy-src="`https://picsum.photos/10/6?image=${1 * 1 * 5 + 10}`"
                :src="`https://picsum.photos/500/300?image=${1 * 1 * 5 + 10}`"
                height="205"
                cover
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
        </v-tabs-window-item>
            
        </v-tabs-window>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tab: 0,
      };
    },
  };
  </script>
  
  <style scoped>
  h3 {
    margin-top: 20px;
  }
  </style>
  