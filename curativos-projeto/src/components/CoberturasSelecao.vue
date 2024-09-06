<template>
    <v-container>
      <v-row>
        <v-col cols="9" md="9">
          <!-- Campo para buscar ingredientes -->
          <v-text-field
            v-model="searchQuery"
            label="Buscar Coberturas"
            @keyup.enter="addIngredient"
          />
          <!-- Botão para adicionar ingrediente -->
          
        </v-col>

        <v-col cols="3" md="3">
            <v-btn size="x-small" @click="addIngredient" color="primary">Adicionar</v-btn>
        </v-col>
      </v-row>
      
      <v-row>
            <v-col cols="12" md="12">
               <!-- Lista de ingredientes com v-virtual-scroll -->
                <v-virtual-scroll :items="ingredients" height="113" item-height="48">
                    <template v-slot:default="{ item, index }">
                        <v-list-item :key="index">
                            <v-row>
                                <v-col cols="9" md="9">
                                    <v-list-item-content>
                                        <v-list-item-title>{{ item }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-col>
                                <v-col cols="3" md="3">
                                    <v-list-item-action>
                                        <v-btn
                                        icon="mdi-delete"
                                        size="x-small"
                                        variant="tonal"
                                        @click="removeIngredient(index)"
                                        />
                                    </v-list-item-action>
                                </v-col>
                            </v-row>
                        </v-list-item>
                    </template>
                </v-virtual-scroll>
            </v-col>
        </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Estado para armazenar a lista de ingredientes e a busca
  const ingredients = ref<string[]>([]);
  const searchQuery = ref<string>('');
  
  // Função para adicionar um ingrediente
  function addIngredient() {
    const ingredient = searchQuery.value.trim();
    if (ingredient && !ingredients.value.includes(ingredient)) {
      ingredients.value.push(ingredient);
      searchQuery.value = ''; // Limpa o campo de busca
    }
  }
  
  // Função para remover um ingrediente
  function removeIngredient(index: number) {
    ingredients.value.splice(index, 1);
  }
  </script>
  
  <style scoped>
  /* Adicione estilos personalizados aqui, se necessário */
  </style>
  