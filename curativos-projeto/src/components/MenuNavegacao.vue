<template>
  <v-navigation-drawer
    app
    clipped
    permanent
    :class="{ 'drawer-expanded': isExpanded, 'drawer-collapsed': !isExpanded }"
    :width="drawerWidth"
    color="#f5f5f5"
  >
    <!-- <v-img
      class="my-logo"
      src="@/assets/logolimpa.png"
      contain
      max-width="80"
      max-height="80"
    ></v-img> -->
    <v-list density="default">
      <RouterLink
        v-for="(item, i) in menuItems"
        :key="i"
        :to="item.route"
        class="router-link"
      >
        <v-list-item class="my-list-item" :value="item" color="primary">
          <template v-slot:prepend>
            <v-icon :icon="item.icon" class="my-icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.title" class="my-title"></v-list-item-title>
        </v-list-item>
      </RouterLink>
    </v-list>
    <v-btn
      class="drawer-toggle-btn"
      icon
      @click="toggleDrawer"
      base-color="grey-lighten-3"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isExpanded = ref(true);
const drawerWidth = ref(210); 

const menuItems = [
  { title: 'Início', route: { name: 'Inicio' }, icon: 'mdi-home' },
  { title: 'Curativos', route: { name: 'Curativos' }, icon: 'mdi-bandage' },
  { title: 'Pacientes', route: { name: 'Pacientes' }, icon: 'mdi-account-group' },
  { title: 'Lesões', route: { name: 'Lesoes' }, icon: 'mdi-heart-pulse' },
  { title: 'Tratamentos', route: { name: 'Tratamentos' }, icon: 'mdi-medication-outline' },
  { title: 'Relatórios', route: { name: 'Relatorios' }, icon: 'mdi-file-document' },
];

function toggleDrawer() {
  isExpanded.value = !isExpanded.value;
  drawerWidth.value = isExpanded.value ? 210 : 80;
}

</script>

<style scoped>
.my-logo {
  padding: 16px;
  max-width: 100%;
  display: block;
  margin: 16px 0 0 0;
  border-radius: 50%;
}

.drawer-expanded .my-title {
  display: block;
}

.drawer-collapsed .my-title {
  display: none;
}

.my-list-item {
  border-radius: 8px;
  transition: background-color 0.3s;
}

.my-list-item:hover {
  background-color: #e3f2fd;
}

.my-list-item.v-list-item--active {
  background-color: #bbdefb;
}

.my-icon {
  color: #1e3a8a; 
  margin: 0 0 0 12px;
}

.my-title {
  color: #1e3a8a; 
  font-weight: 500;
}

.drawer-toggle-btn {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: #ffffff;
}

.router-link {
  text-decoration: none;
}

.v-list-item-icon {
  margin-right: 16px;
}
</style>
