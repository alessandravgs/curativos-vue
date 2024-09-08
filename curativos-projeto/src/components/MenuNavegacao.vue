<template>
  <v-navigation-drawer
    app
    clipped
    permanent
  >
    <v-avatar class="my-avatar" color="primary" size="50">🔰</v-avatar>
    <v-list density="default">
      <v-list-item v-for="(item, i) in menuItems"
      :key="i"
      :value="item"
      color="primary">
      
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
      
        <RouterLink :to="item.route" >
          <v-list-item-title v-text="item.title"></v-list-item-title>
          </RouterLink>
        </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const menuItems = [
  { title: 'Início', route: { name: 'Pacientes' }, icon: 'mdi-home' },
  { title: 'Curativos', route: { name: 'Curativos' }, icon: 'mdi-bandage' },
  { title: 'Pacientes', route: { name: 'Pacientes' }, icon: 'mdi-account-group' },
  { title: 'Lesões', route: { name: 'Lesoes' }, icon: 'mdi-heart-pulse' },
  { title: 'Tratamentos', route: { name: 'Tratamentos' }, icon: 'mdi-pills' },
  { title: 'Relatórios', route: { name: 'Relatorios' }, icon: 'mdi-file-document' },
];
</script>

<style scoped>
.my-navigation-drawer {
  background-color: #f5f5f5;
  width: 250px; /* Ajuste a largura conforme necessário */
}

.my-avatar {
  margin: 16px auto;
  background-color: #1976d2; /* Altere a cor conforme necessário */
}

.my-list-item {
  border-radius: 8px;
  transition: background-color 0.3s;
}

.my-list-item:hover {
  background-color: #e3f2fd; /* Cor ao passar o mouse */
}

.my-list-item.v-list-item--active {
  background-color: #bbdefb; /* Cor do item ativo */
}

.v-list-item-icon {
  margin-right: 16px; /* Ajuste o espaçamento do ícone conforme necessário */
}

.v-list-item-title {
  font-weight: 500; /* Ajuste o peso da fonte conforme necessário */
}
</style>
