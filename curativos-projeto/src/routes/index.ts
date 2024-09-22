import PacienteDetailView from '@/views/PacienteDetailView.vue';
import CadastroCurativo from "@/views/CadastroCurativo.vue";
import CadastroLesao from "@/views/CadastroLesao.vue";
import CadastroPaciente from "@/views/CadastroPaciente.vue";
import CurativoDetailView from "@/views/CurativoDetailView.vue";
import CurativosListView from "@/views/CurativosListView.vue";
import LesoesListView from "@/views/LesoesListView.vue";
import PacientesListView from "@/views/PacientesListView.vue";
import PaginaInicial from "@/views/PaginaInicial.vue";
import ProfissionalDetailView from "@/views/ProfissionalDetailView.vue";
import Relatorios from "@/views/Relatorios.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LesoesDetailView from '@/views/LesoesDetailView.vue';
import TratamentoListView from '@/views/TratamentoListView.vue';
import CadastroTratamento from '@/views/CadastroTratamento.vue';
import TratamentoDetailView from '@/views/TratamentoDetailView.vue';

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
        {
            path:'detalhes',
            name: 'Detalhes Paciente',
            component: PacienteDetailView,
        }
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
        {
            path:'detalhes',
            name: 'Detalhes Curativo',
            component: CurativoDetailView,
        }
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
        {
            path:'detalhes',
            name: 'Detalhes Lesoes',
            component: LesoesDetailView,
        }
    ]
},
{
    path: '/tratamentos',
    children:[
        {
            path: '',
            name: 'Tratamentos',
            component: TratamentoListView
        },
        {
            path:'novo',
            name: 'Novo Tratamento',
            component: CadastroTratamento
        },
        {
            path:'detalhes',
            name: 'Detalhes Tratamento',
            component: TratamentoDetailView,
        }
    ]
},
{
    path: '/profissional',
    name: 'Profissional',
    component: ProfissionalDetailView
}
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;