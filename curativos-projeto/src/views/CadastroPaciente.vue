<template>
  <v-container style="max-width: 1200px; margin: 0 auto;">
      <v-responsive>
          <v-row no-gutters>
              <v-col>
                  <v-sheet class="mb-2 text-indigo-darken-3">
                      <h1>{{ isEditing ? 'Editar Paciente' : 'Cadastrar Paciente' }}</h1>
                  </v-sheet>
              </v-col>
          </v-row>
          <v-spacer></v-spacer>

          <v-card>
            <form @submit.prevent="submitForm">

              <v-row>
                <v-col>
                    <h3 class="text-indigo-darken-3 mt-2">Dados Pessoais</h3>
                </v-col>
              </v-row>

              <v-row class="mt-2">
                <v-col cols="8">
                  <v-text-field
                      v-model="nome"
                      :rules="rulesNome"
                      label="Nome Paciente"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="4">
                  <v-text-field
                      v-model="cpf"
                      :rules="rulesCpf"
                      label="Cpf"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="mt-0">
                <v-col cols="6">
                  <v-text-field
                    v-model="dataNasc"
                    label="Data de Nascimento"
                    type="date"
                    :rule="rulesDataNasc"
                  ></v-text-field>
                </v-col>

                <v-col cols="6" >
                  <v-select
                    v-model="sexoSelecionado"
                    :items="sexos"
                    label="Sexo"
                    :rules="rulesSexo"
                    return-object
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                    <h3 class="text-indigo-darken-3">Contatos</h3>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="8">
                  <v-text-field
                  v-model="email"
                  :rules="rulesEmail"
                  label="E-mail"
                  ></v-text-field>
                </v-col>

                <v-col cols="4" >
                  <v-text-field
                    v-model="telefone"
                    :rules="rulesTelefone"
                    label="Telefone"
                  ></v-text-field>
                </v-col>
              </v-row>
              
              <v-row>
                <v-col>
                    <h3 class="text-indigo-darken-3">Comorbidades e Alergias</h3>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-select
                    v-model="alergiasSelecionadas"
                    :items="alergias"
                    item-title="nome"
                    item-value="id"
                    label="Alergias"
                    persistent-hint
                    return-object
                    multiple
                    chips                  
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col>
                  <v-select
                    v-model="comorbidadesSelecionadas"
                    :items="comorbidades"
                    item-title="nome"
                    item-value="id"
                    label="Comorbidades"
                    persistent-hint
                    return-object
                    multiple
                    chips                  
                  ></v-select>
                </v-col>
              </v-row>
              
              <div class="d-flex justify-end">
                  <v-btn @click="handleReset" size="large">
                      Limpar
                  </v-btn>

                  <v-btn
                      class="ms-4"
                      type="submit"
                      size="large"
                      color="indigo-darken-3"
                  >
                      {{ isEditing ? 'Salvar' : 'Registrar' }}
                  </v-btn>
              </div>
          </form>       
          </v-card>
      </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createPaciente, fetchAlergias, fetchComorbidades } from '@/services/PacienteService';
import { CoberturaResumoResult } from '../types/cobertura';
import { Alergia, Comorbidade, RegisterPacienteRequest } from '@/types/paciente';
import { Sexo } from '@/types/enums';


// Campos e validações
const id = ref<number>(0);
const nome = ref<string>('');
const cpf = ref<string>('');
const dataNasc = ref<Date>();
const sexoSelecionado = ref<string>();
const telefone = ref<string>('');
const email = ref<string>('');
const alergiasSelecionadas = ref<Alergia[]>([]);
const comorbidadesSelecionadas = ref<Comorbidade[]>([]);
const sexos = [
  'Feminino',
  'Masculino'
];

const rulesNome = [
  (value: string) => value?.length >= 2 || 'O nome deve ter ao menos 2 caracteres.'
];
const rulesCpf = [
  (value: string) => !!value || 'CPF é obrigatório'
];
const rulesTelefone = [
  (value: string) => !!value || 'Campo é obrigatório.',
  (value: string) => value.length >= 5 || 'O telefone deve ter pelo menos 5 caracteres.',
  (value: string) => /^[0-9]+$/.test(value) || 'O telefone deve conter apenas números.'
];
const rulesEmail = [
  (value: string) => value.length >= 5 || 'O email deve ter pelo menos 5 caracteres.',
  (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email inválido.'
];
const rulesSexo =[
  (value: string) => !!value || 'Campo é obrigatório.',
];
const rulesDataNasc =[
  (value: Date) => !!value || 'Campo data de nascimento é obrigatório.',
];

// Listas de alergias e comorbidades existentes
const alergias = ref<Alergia[]>([]); 
const comorbidades = ref<Comorbidade[]>([]);

const route = useRoute();
const router = useRouter();
const isEditing = ref(false);

// Função de resetar os campos
const handleReset = () => {
  nome.value = '';
  cpf.value = '';
  telefone.value = '';
  email.value = '';
  dataNasc.value = new Date();
  sexoSelecionado.value = undefined;
  alergiasSelecionadas.value = [];
  comorbidadesSelecionadas.value = [];
};

// Preencher os campos se estiver editando
onMounted(async () => {
  try {
    alergias.value = await fetchAlergias();
    comorbidades.value = await fetchComorbidades();
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
});

// Função de submit
const submitForm = async () => {
  try {
    const camposPreenchidos = camposEstaoPreenchidos();
    if(!camposPreenchidos){
      alert("Campos obrigatórios ainda não foram preenchidos.");
      return;
    }
    const novoPaciente: RegisterPacienteRequest = {
      nome: nome.value,
      cpf: cpf.value,
      dataNascimento: dataNasc.value || new Date(),
      sexo: sexoSelecionado.value === 'Feminino' ? Sexo.Feminino : Sexo.Masculino,
      email: email.value,
      telefone: telefone.value,
      alergias: alergiasSelecionadas.value.map(alergia => alergia.id),
      comorbidades: comorbidadesSelecionadas.value.map(com => com.id),
    };
    
    await createPaciente(novoPaciente);

  } catch (error) {
      console.error('Erro ao registrar/atualizar tratamento:', error);
  }
};

function navigateToDetalhes(item: CoberturaResumoResult) {
  console.log(item);
  router.push({ path: `/tratamentos/detalhes`, query: { ...item }}).catch(err => console.error(err));
}

function camposEstaoPreenchidos() {
  return (
    nome.value.trim() !== '' &&
    cpf.value.trim() !== '' &&
    telefone.value.trim() !== ''
  );
}
</script>

