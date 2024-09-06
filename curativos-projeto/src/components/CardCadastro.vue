<template>
    <v-card class="mx-auto" max-width="1200" border flat>
      <v-list-item class="px-6" height="88">
        <template v-slot:prepend>
          <v-avatar color="surface-light" size="32">🔰</v-avatar>
        </template> 
        <v-typography>
          <h3 class="display-3">{{titulo}}</h3>
        </v-typography>
      </v-list-item>
  
      <v-divider></v-divider>
  
      <v-card-text class="text-medium-emphasis pa-6">
        <slot></slot>
      </v-card-text>
    </v-card>
  </template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  titulo: string; 
}>();

</script>