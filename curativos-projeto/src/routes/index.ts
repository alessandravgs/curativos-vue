import CurativosListView from "@/views/CurativosListView.vue";
import LesoesListView from "@/views/LesoesListView.vue";
import PacientesListView from "@/views/PacientesListView.vue";
import Relatorios from "@/views/Relatorios.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const rotas: RouteRecordRaw[] = [{
    path:'/',
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