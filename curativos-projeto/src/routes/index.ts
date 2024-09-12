import CurativosListView from "@/views/CurativosListView.vue";
import LesoesListView from "@/views/LesoesListView.vue";
import PacientesListView from "@/views/PacientesListView.vue";
import PaginaInicial from "@/views/PaginaInicial.vue";
import Relatorios from "@/views/Relatorios.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const rotas: RouteRecordRaw[] = [
{
    path:'/',
    name: 'Inicio',
    component: PaginaInicial
},    
{
    path:'/pacientes',
    name: 'Pacientes',
    component: PacientesListView
},
{
    path: '/curativos',
    name: 'Curativos',
    component: CurativosListView
},
{
    path: '/relatorios',
    name: 'Relatorios',
    component: Relatorios
},
{
    path: '/lesoes',
    name: 'Lesoes',
    component: LesoesListView
},
{
    path: '/tratamentos',
    name: 'Tratamentos',
    component: LesoesListView
}
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;