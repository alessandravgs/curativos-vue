<template>
    <v-card class="mx-auto" max-width="1200" border flat>
      <v-list-item class="px-6 height-75 bg-grey-lighten-2">
      <template v-slot:prepend>
        <v-icon class="text-indigo-darken-3">{{ icone }}</v-icon>
      </template>
      <v-list-item-content>
        <v-list-item-title class="text-indigo-darken-3">
          <h3 class="display-3">{{ titulo }}</h3>
        </v-list-item-title>
      </v-list-item-content>
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
  icone: string;
}>();

</script>