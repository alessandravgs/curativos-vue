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
import Apresentacao from '@/views/Apresentacao.vue';
import Login from '@/views/Login.vue';

const rotas: RouteRecordRaw[] = [
{
    path:'/',
    name: 'Apresentacao',
    component: Apresentacao
},
{
    path:'/login',
    name: 'Login',
    component: Login
},      
{
    path:'/inicio',
    name: 'Inicio',
    component: PaginaInicial,
    meta: { requiresAuth: true }
},    
{
    path:'/pacientes',
    children:[
        {
            path: '',
            name: 'Pacientes',
            component: PacientesListView,
            meta: { requiresAuth: true }
        },
        {
            path:'novo',
            name: 'Novo Paciente',
            component: CadastroPaciente,
            meta: { requiresAuth: true }
        },
        {
            path:'detalhes',
            name: 'Detalhes Paciente',
            component: PacienteDetailView,
            meta: { requiresAuth: true }
        }
    ]
},
{
    path: '/curativos',
    children:[
        {
            path: '',
            name: 'Curativos',
            component: CurativosListView,
            meta: { requiresAuth: true }
        },
        {
            path:'novo',
            name: 'Novo Curativo',
            component: CadastroCurativo,
            meta: { requiresAuth: true }
        },
        {
            path:'detalhes',
            name: 'Detalhes Curativo',
            component: CurativoDetailView,
            meta: { requiresAuth: true }
        }
    ]
},
{
    path: '/relatorios',
    name: 'Relatorios',
    component: Relatorios,
    meta: { requiresAuth: true }
},
{
    path: '/lesoes',
    children:[
        {
            path: '',
            name: 'Lesoes',
            component: LesoesListView,
            meta: { requiresAuth: true }
        },
        {
            path:'novo',
            name: 'Nova Lesao',
            component: CadastroLesao,
            meta: { requiresAuth: true }
        },
        {
            path:'detalhes',
            name: 'Detalhes Lesoes',
            component: LesoesDetailView,
            meta: { requiresAuth: true }
        }
    ]
},
{
    path: '/tratamentos',
    children:[
        {
            path: '',
            name: 'Tratamentos',
            component: TratamentoListView,
            meta: { requiresAuth: true }
        },
        {
            path:'novo',
            name: 'Novo Tratamento',
            component: CadastroTratamento,
            meta: { requiresAuth: true }
        },
        {
            path:'detalhes',
            name: 'Detalhes Tratamento',
            component: TratamentoDetailView,
            meta: { requiresAuth: true }
        }
    ]
},
{
    path: '/profissional',
    name: 'Profissional',
    component: ProfissionalDetailView,
    meta: { requiresAuth: true }
}
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

// Verifica se a rota precisa de autenticação antes de acessar 
// e redireciona para login caso não ache token válido
roteador.beforeEach((to, from, next) => {  
    const token = localStorage.getItem('token');
 
    // Verifica se a rota requer autenticação e se o token está ausente
    if (to.meta.requiresAuth && !token) {
      next({ name: 'Login' });  // Redireciona para a página de login se não houver token
    } else {
      next();  // Permite a navegação normalmente
    }
});

export default roteador;