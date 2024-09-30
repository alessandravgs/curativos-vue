<!-- src/components/RelatorioCurativo.vue -->
<template>
    <div class="container">
       <header>
           <div class="logo">
               <img src="/seminar1.png" alt="Curativo Vital">
           </div>
           <div class="titulo-container">
               <h1>Relatório de curativos por paciente por periodo</h1>
            </div>
        </header>
        
        <h3 class="centro">{{ dataInicioPaciente }} - {{ dateFimPaciente }}</h3>
       <section class="paciente">
           <h2 class="centro">Paciente</h2>
           <div class="paciente-info">
               <div>
                   <strong>Nome:</strong> {{ itemDetails?.nomePaciente }}
               </div>
               <div class="paciente-detalhes">
                   <div class="coluna-2">
                       <p><strong>Sexo:</strong> {{ mostrarSexo(itemDetails.sexo) }}</p>
                       <p><strong>Idade:</strong> {{calcularIdade(itemDetails.dataNascimento)}}</p>
                   </div>
                   <div class="coluna-2">
                       <p><strong>Cpf:</strong> {{itemDetails.cpf}}</p>
                       <p><strong>Contato:</strong> {{ itemDetails.contato }}</p>
                   </div>
               </div>
           </div>
       </section>

       <section class="paciente">
           <h2 class="centro">Lesão</h2>
           <div class="paciente-info">
               <div>
                    <strong>Descrição: </strong>{{ itemDetails?.lesao }}
               </div>
           </div>
       </section>

       <div v-if="itemDetails.curativos.length > 0">
           <div v-for="(curativo, index) in itemDetails.curativos" :key="index">
               <section class="curativo">
                   <h2 class="centro">Curativo</h2>
                   <div class="info">
                       <div class="row">
                           <strong>Profissional:</strong> {{ curativo.profissional }}
                       </div>
                   </div>
           
                   <div class="detalhes">
                       <h3>Detalhes</h3>
                       <div class="linha"></div>
                       <p><strong>Data:</strong> {{ mostrarData(curativo.data) }}</p>
                       <p><strong>Observações:</strong> {{ curativo.observacoes }}</p>
                       <p><strong>Orientações:</strong> {{ curativo.orientacoes }}</p>
                   </div>
       
                   <h3>Avaliação da Lesão</h3>
                   <div class="linha"></div>
                   <div class="avaliacao-lesao">
                       <div class="coluna-1">
                           <p><strong>Altura:</strong> {{ curativo.altura }} cm</p>
                           <p><strong>Largura:</strong> {{ curativo.largura }} cm</p>
                       </div>
                       <div class="coluna-2">
                           <p><strong>Profundidade:</strong> {{ curativo.profundidade }} cm</p>
                           <p><strong>Situação:</strong> {{ curativo.situacao ? SituacaoLesaoDisplayNames[curativo.situacao] : 'Nenhuma' }}</p>
                       </div>
                   </div>
       
                   <h3>Coberturas</h3>
                   <div class="linha"></div>

                   <ul v-for="(cobertura, index) in curativo.coberturas" :key="index">
                       <li>{{ cobertura.nome }}</li>
                   </ul>

               </section>
           </div>
       </div>
       <div v-else>
           <section class="curativo">
               <h2 class="centro">Curativo</h2>
               <h3 class="centro">Paciente não possui curativos no intervalo informado.</h3>
           </section>
       </div>
   </div> 
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted } from 'vue';
 import { LesaoCurativoRelatorio, criarLesaoCurativoRelatorio } from '@/types/relatorios';
import { SituacaoLesaoDisplayNames } from '@/enums/SituacaoLesao';
 
 const calcularIdade = (dataNascimento: Date): string => {
     const nascimento = typeof dataNascimento === 'string' ? new Date(dataNascimento) : dataNascimento;
     const hoje = new Date();
     let idade = hoje.getFullYear() - nascimento.getFullYear();
     const mes = hoje.getMonth() - nascimento.getMonth();
 
     if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
       idade--;
     }
 
     return `${idade} anos`;
 };
 
 const mostrarSexo = (sexoInput: number | undefined): string => {
   return sexoInput === 0 ? 'Feminino' : 'Masculino';
 };

 const mostrarData = (dataInput: Date | undefined): string => {
     if(!dataInput) return '';
     const nascimento = typeof dataInput === 'string' ? new Date(dataInput) : dataInput;
     const data = nascimento.toLocaleDateString();
     return data;
   };
 
 const itemDetails = ref<LesaoCurativoRelatorio>(criarLesaoCurativoRelatorio());
 const dateFimPaciente = ref<string>('');
 const dataInicioPaciente = ref<string>('');
 
 onMounted(() => {

   const storedData = localStorage.getItem('lesaoRelatorio');
   if (storedData) {
       const parsedData = JSON.parse(storedData || '{}');
       if (Array.isArray(parsedData) && parsedData.length > 0) {
           itemDetails.value = parsedData[0];
       } else if (parsedData && parsedData.nomePaciente) {
           itemDetails.value = parsedData; 
       } else {
           console.warn('Dados inválidos recuperados do localStorage', parsedData);
       }
   } else {
       console.warn('Nenhum dado encontrado no localStorage');
   }

 });
 </script>
 
 <style lang="postcss" scoped>
 body {
   font-family: Arial, sans-serif;
   background-color: #f7f7f7;
   padding: 20px;
}

.container {
   width: 100%;
   max-width: 700px;
   margin: 0 auto;
   background-color: white;
   padding: 20px;
   border: 1px solid #ddd;
   border-radius: 8px;
}

header {
   display: flex;
   flex-direction: column; /* Alinha os itens em coluna */
   align-items: flex-start; /* Alinha à esquerda */
   margin-bottom: 20px;
}

.titulo-container {
   display: flex;
   justify-content: center; /* Centraliza o título */
   width: 100%; /* Para garantir que ocupe toda a largura do header */
   margin-top: 10px; /* Espaço entre a logo e o título, se desejado */
}

.logo img {
   max-width: 100%; /* Ajusta a logo para que não ultrapasse o container */
   height: auto; /* Mantém a proporção da imagem */
}

header h1 {
   font-size: 24px;
   text-align: center;
}

.logo img {
   width: 100px;
}

.paciente, .curativo, .row {
   border: 1px solid #ccc;
   padding: 15px;
   border-radius: 8px;
   margin-bottom: 20px;
}

.paciente h2, .curativo h2 {
   font-size: 20px;
   color: #555;
   margin-bottom: 10px;
}

.info, .detalhes {
   margin-bottom: 15px;
}

div, .row, p {
   margin-bottom: 8px;
}

.paciente-info{
   margin-bottom: 2px;
}

strong {
   color: #000;
}

h3 {
   color: #3f51b5;
   font-size: 18px;
   margin-bottom: 2px;
}

ul {
   list-style-type: none;
   padding-left: 20px;
}

ul li {
   margin-bottom: 5px;
   position: relative;
}

ul li::before {
   content: '•';
   color: #3f51b5;
   position: absolute;
   left: -10px;
}

.centro {
   text-align: center;
}

.linha {
   height: 2px; /* Altura da linha */
   background-color: #ccc; /* Cor da linha */
   margin-top: 0; /* Espaço acima da linha */
   margin-bottom: 20px; /* Espaço abaixo da linha */
   width: 100%; /* Ocupa toda a largura */
}

.paciente-detalhes 
{
   display: flex; /* Ativa o Flexbox */
   justify-content: space-between; /* Espaça as colunas */
}

.avaliacao-lesao {
   display: flex; /* Ativa o Flexbox */
   justify-content: space-between; /* Espaça as colunas */
   margin-bottom: 15px; /* Espaço abaixo do contêiner */
}

.coluna-1,
.coluna-2 {
   flex: 1; /* Permite que ambas as colunas ocupem o mesmo espaço */
   margin-right: 10px; /* Espaço entre as colunas */
}

.coluna-2 {
   margin-right: 0; /* Remove a margem da última coluna */
}

.fotos {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.foto-item {
    flex: 1 1 150px;
}

 </style>
 