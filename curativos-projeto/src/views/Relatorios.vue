<template>

  <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2 ">
            <h1 class="cabecalho-lg text-indigo-darken-3">Relatórios</h1>
          </v-sheet>
        </v-col>
      </v-row>

  <v-expansion-panels variant="popout" class="my-4">
    <v-expansion-panel>
      <v-expansion-panel-title>
        <template v-slot:default="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4">
              Relatório de curativos totais por paciente
            </v-col>
            <v-col class="text-grey" cols="8"></v-col>
          </v-row>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <FindPaciente :id="pacienteDataId" @pacienteSelecionado="onPacienteSelecionado"/> 

        <!-- Adicionar uma margem superior para o espaçamento -->
        <v-row justify="end" class="mt-4">
          <v-col cols="auto" class="pa-2">
            <v-btn
              class="text-none mb-4"
              color="indigo-darken-3"
              size="x-large"
              variant="flat"
              block
              @click="gerarRelatorioPacienteTotal"
            >
              Gerar Relatório
            </v-btn>
          </v-col>         
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        <template v-slot:default="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4">
              Relatório de curativos de pacientes por período
            </v-col>
            <v-col class="text-grey" cols="8"></v-col>
          </v-row>
        </template>
      </v-expansion-panel-title>
      
      <v-expansion-panel-text>
        <!-- Espaçamento uniforme para o campo de seleção de paciente -->
        <FindPaciente :id="pacienteDataId" @pacienteSelecionado="onPacienteSelecionadoPorData"/> 
        <!-- Espaçamento uniforme para os campos de data -->
        <v-row>
          <v-col cols="12" md="6" class="pa-2">
            <v-text-field
              v-model="dataInicioPaciente"
              label="Data Inicio"
              type="date"
              :min="minDate"
              :max="maxDate"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="pa-2">
            <v-text-field
              v-model="dateFimPaciente"
              label="Data Fim"
              type="date"
              :min="minDate"
              :max="maxDate"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Espaçamento uniforme para os botões -->
        <v-row justify="end" class="mt-4">
          <v-col cols="auto" class="pa-2">
            <v-btn
              class="text-none"
              color="indigo-darken-3"
              size="x-large"
              variant="flat"
              block
              @click="gerarRelatorioPacientePorData"
            >
              Gerar Relatório
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel >
      <v-expansion-panel-title>
        <template v-slot:default="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4">
              Relatório de curativos realizados por profissionais em período
            </v-col>
            <v-col
              class="text-grey"
              cols="8"
            >
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col cols="12" md="6" class="pa-2">
            <v-text-field
              v-model="dataInicioProfissional"
              label="Data Inicio"
              type="date"
              :min="minDate"
              :max="maxDate"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="pa-2">
            <v-text-field
              v-model="dateFimProfissional"
              label="Data Fim"
              type="date"
              :min="minDate"
              :max="maxDate"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Espaçamento uniforme para os botões -->
        <v-row justify="end" class="mt-4">
          <v-col cols="auto" class="pa-2">
            <v-btn
              class="text-none"
              color="indigo-darken-3"
              size="x-large"
              variant="flat"
              block
              @click="gerarRelatorioProfissionalPorData"
            >
              Gerar Relatório
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        <template v-slot:default="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4">
              Relatório de curativos por lesão
            </v-col>
            <v-col class="text-grey" cols="8"></v-col>
          </v-row>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <FindPaciente :id="pacienteDataId" @pacienteSelecionado="onPacienteSelecionadoForLesao"/> 
        <FindLesoeByPaciente :idPaciente="pacienteSelecionadoLesaoId" :nome-lesao="lesaoEditValue" @lesao-selecionado="onLesaoSelecionada"/>

        <!-- Adicionar uma margem superior para o espaçamento -->
        <v-row justify="end" class="mt-4">
          <v-col cols="auto" class="pa-2">
            <v-btn
              class="text-none mb-4"
              color="indigo-darken-3"
              size="x-large"
              variant="flat"
              block
              @click="gerarRelatorioLesao"
            >
              Gerar Relatório
            </v-btn>
          </v-col>         
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
    
  </v-expansion-panels>

</template>


<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import FindPaciente from '@/components/FindPaciente.vue';
import { PacienteResumoResult } from '@/types/paciente';
import printd from 'printd';
import { getRelatorioLesao, getRelatorioPacientePeriodo, getRelatorioPacienteTotal, getRelatorioProfissionalPeriodo } from '@/services/RelatorioService';
import { LesaoCurativoRelatorio, PacienteCurativoRelatorio, ProfissionalCurativoRelatorio } from '@/types/relatorios';
import { LesaoResumoResult } from '@/types/lesao';
import FindLesoeByPaciente from '@/components/FindLesoeByPaciente.vue';

//Relatório de curativos totais por paciente:
const pacienteDataId = ref(0);
const pacienteSelecionado = ref<PacienteResumoResult>();
const relatorioPacienteTotal = ref<PacienteCurativoRelatorio| null>(null);

const onPacienteSelecionado = (paciente: PacienteResumoResult) => {
  pacienteSelecionado.value = paciente;
};

async function gerarRelatorioPacienteTotal(){
    if(!pacienteSelecionado.value){
      console.log('Paciente', pacienteSelecionado.value)
      return;
    }

    relatorioPacienteTotal.value = await getRelatorioPacienteTotal(pacienteSelecionado.value.id);

    console.log('Relatorio', relatorioPacienteTotal.value)

    if(relatorioPacienteTotal.value.nomePaciente == ''){
      return;
    }

    localStorage.setItem('pacienteCurativoRelatorio', JSON.stringify(relatorioPacienteTotal.value));

    const url = `http://localhost:3000/#/relatorio-paciente-total`;
    const p = new printd(); 
    p.printURL(url, ({ launchPrint }) =>{
        launchPrint();
    });
}

// Relatório de curativos por data para paciente
const relatorioPacientePorData = ref<PacienteCurativoRelatorio| null>(null);
const pacienteSelecionadoPorData = ref<PacienteResumoResult>();
const onPacienteSelecionadoPorData = (paciente: PacienteResumoResult) => {
  pacienteSelecionadoPorData.value = paciente;
};

const dateFimPaciente = ref<string>('');
const dataInicioPaciente = ref<string>('');

const mostrarData = (dataInput: Date | undefined): string => {
     if(!dataInput) return '';
     const nascimento = typeof dataInput === 'string' ? new Date(dataInput) : dataInput;
     const data = nascimento.toLocaleDateString();
     return data;
   };


async function gerarRelatorioPacientePorData(){
    if(!pacienteSelecionadoPorData.value){
      console.log('Paciente', pacienteSelecionadoPorData.value)
      return;
    }

    if(!dataInicioPaciente || !dateFimPaciente){
      return;
    }

    const inicio = new Date(dataInicioPaciente.value);
    const fim  = new Date(dateFimPaciente.value);

    relatorioPacientePorData.value = await getRelatorioPacientePeriodo(pacienteSelecionadoPorData.value.id, inicio, fim);
  
    if(relatorioPacientePorData.value.nomePaciente == ''){
      return;
    }

    localStorage.setItem('pacienteCurativoRelatorioPeriodo', JSON.stringify(relatorioPacientePorData.value));
    localStorage.setItem('dataInicioRelatorioPacientePeriodo', JSON.stringify(mostrarData(inicio)));
    localStorage.setItem('dataFimRelatorioPacientePeriodo', JSON.stringify(mostrarData(fim)));

    const url = `http://localhost:3000/#/relatorio-paciente-periodo`;
    const p = new printd(); 
    p.printURL(url, ({ launchPrint }) =>{
        launchPrint();
    });
}

//Relatório por período de profissional
const relatorioProfissionalPeriodo = ref<ProfissionalCurativoRelatorio| null>(null);
const dateFimProfissional = ref<string>('');
const dataInicioProfissional = ref<string>('');


async function gerarRelatorioProfissionalPorData(){

    if(!dataInicioPaciente || !dateFimPaciente){
      return;
    }

    const inicio = new Date(dataInicioProfissional.value);
    const fim  = new Date(dateFimProfissional.value);

    relatorioProfissionalPeriodo.value = await getRelatorioProfissionalPeriodo( inicio, fim);
  
    if(relatorioProfissionalPeriodo.value.nomeProfissional == ''){
      return;
    }

    localStorage.setItem('profissionalCurativoRelatorioPeriodo', JSON.stringify(relatorioProfissionalPeriodo.value));
    localStorage.setItem('dataInicioRelatorioProfissionalPeriodo', JSON.stringify(mostrarData(inicio)));
    localStorage.setItem('dataFimRelatorioProfissionalPeriodo', JSON.stringify(mostrarData(fim)));

    const url = `http://localhost:3000/#/relatorio-profissional-periodo`;
    const p = new printd(); 
    p.printURL(url, ({ launchPrint }) =>{
        launchPrint();
    });
}


//Relatório por Lesão

const pacienteSelecionadoLesao = ref<PacienteResumoResult>();
const pacienteSelecionadoLesaoId = ref(0);
const relatorioLesao = ref<LesaoCurativoRelatorio| null>(null);

const onPacienteSelecionadoForLesao = (paciente: PacienteResumoResult) => {
  pacienteSelecionadoLesao.value = paciente;
  pacienteSelecionadoLesaoId.value = paciente.id;
};

const lesaoSelecionada = ref<LesaoResumoResult>();
const lesaoEditValue = ref('');
const lesaoDataId = ref(0);

const onLesaoSelecionada = (lesao: LesaoResumoResult) => {
  lesaoSelecionada.value = lesao;
  lesaoDataId.value = lesao.id;
};

async function gerarRelatorioLesao(){

if(!pacienteSelecionadoLesao || !lesaoDataId){
  return;
}


relatorioLesao.value = await getRelatorioLesao(lesaoDataId.value);

if(relatorioLesao.value.nomePaciente == ''){
  return;
}

console.log(relatorioLesao.value)

localStorage.setItem('lesaoRelatorio', JSON.stringify(relatorioLesao.value));

const url = `http://localhost:3000/#/relatorio-lesao`;
const p = new printd(); 
p.printURL(url, ({ launchPrint }) =>{
    launchPrint();
});
}


const minDate = '2020-01-01'; // Data mínima
const maxDate = '2100-12-31'; // Data máxima

onUnmounted(() => {
    localStorage.removeItem('lesaoRelatorio');
    localStorage.removeItem('profissionalCurativoRelatorioPeriodo');
    localStorage.removeItem('dataInicioRelatorioProfissionalPeriodo');
    localStorage.removeItem('dataFimRelatorioProfissionalPeriodo');
    localStorage.removeItem('pacienteCurativoRelatorioPeriodo');
    localStorage.removeItem('dataInicioRelatorioPacientePeriodo');
    localStorage.removeItem('dataFimRelatorioPacientePeriodo');
    localStorage.removeItem('pacienteCurativoRelatorio');
});
</script>
