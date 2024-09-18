import CadastroCurativo from "@/views/CadastroCurativo.vue";
import CadastroLesao from "@/views/CadastroLesao.vue";
import CadastroPaciente from "@/views/CadastroPaciente.vue";
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
    children:[
        {
            path: '',
            name: 'Pacientes',
            component: PacientesListView
        },
        {
            path:'novo',
            name: 'Novo Paciente',
            component: CadastroPaciente
        },
    ]
},
{
    path: '/curativos',
    children:[
        {
            path: '',
            name: 'Curativos',
            component: CurativosListView
        },
        {
            path:'novo',
            name: 'Novo Curativo',
            component: CadastroCurativo
        },
    ]
},
{
    path: '/relatorios',
    name: 'Relatorios',
    component: Relatorios
},
{
    path: '/lesoes',
    children:[
        {
            path: '',
            name: 'Lesoes',
            component: LesoesListView
        },
        {
            path:'novo',
            name: 'Nova Lesao',
            component: CadastroLesao
        },
    ]
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