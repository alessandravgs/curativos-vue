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
            <template v-if="loading">
              <v-row justify="center">
                <v-col>
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-col>
              </v-row>
            </template>

            <template v-else>
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
                  <v-col cols="7">
                    <v-text-field
                    v-model="email"
                    :rules="rulesEmail"
                    label="E-mail"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="2">
                    <v-text-field
                    v-model="ddd"
                    :rules="rulesDDD"
                    label="DDD"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="3" >
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
            </template>
          </v-card>
      </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createPaciente, fetchAlergias, fetchComorbidades, getPacienteById, updatePaciente } from '@/services/PacienteService';
import { Paciente, UpdatePacienteRequest } from '@/types/paciente';
import { Alergia, Comorbidade, RegisterPacienteRequest } from '@/types/paciente';
import { Sexo } from '@/types/enums';


// Campos e validações
const idItem = ref(0);
const nome = ref<string>('');
const cpf = ref<string>('');
const dataNasc = ref<string>();
const sexoSelecionado = ref<string>();
const ddd = ref<string>('');
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
const rulesDDD = [
  (value: string) => !!value || 'Campo é obrigatório.',
  (value: string) => value.length >= 2 || 'O ddd deve ter pelo menos 2 caracteres.',
  (value: string) => value.length < 3 || 'O ddd não pode ter mais de 2 caracteres.',
];
const rulesTelefone = [
  (value: string) => !!value || 'Campo é obrigatório.',
  (value: string) => value.length >= 9 || 'O telefone deve ter pelo menos 5 caracteres.',
  (value: string) => value.length < 10 || 'O ddd não pode ter mais de 9 caracteres.',
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
const loading = ref(true);

// Função de resetar os campos
const handleReset = () => {
  nome.value = '';
  cpf.value = '';
  telefone.value = '';
  email.value = '';
  dataNasc.value = '';
  sexoSelecionado.value = undefined;
  alergiasSelecionadas.value = [];
  comorbidadesSelecionadas.value = [];
};

// Preencher os campos se estiver editando
onMounted(async () => {
  try {
    loading.value = true;
    alergias.value = await fetchAlergias();
    comorbidades.value = await fetchComorbidades();

    const id = Number(route.query.item);
    idItem.value = id;

    if (id) {
        isEditing.value = true;
        await nextTick();
        const pacienteData = await getPacienteById(id);
        preencherDadosTela(pacienteData);
    } 

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
  finally {
    loading.value = false; 
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
    
    if(isEditing.value){
      var pacienteUpdate = getUpdaterPaciente();
      await updatePaciente(pacienteUpdate);    
    }
    else{
      console.log("Entrou pra salvar")
      var novoPaciente = getRegisterPaciente();
      var pacienteCriado = await createPaciente(novoPaciente);
      console.log(pacienteCriado);
      idItem.value = pacienteCriado?.id || 0;
    }

    console.log(idItem.value)
    navigateToDetalhes(idItem.value);
    
  } catch (error) {
      alert("Erro ao registrar/atualizar paciente");
      console.error('Erro ao registrar/atualizar paciente:', error);
  }
};

function navigateToDetalhes(item: number | null | undefined) {
      router.push({ path: `/pacientes/detalhes`, query: { item } }).catch(err => console.error(err));
} 

function camposEstaoPreenchidos() {
  return (
    nome.value.trim() !== '' &&
    cpf.value.trim() !== '' &&
    telefone.value.trim() !== ''
  );
}

function preencherDadosTela(paciente: Paciente){
      nome.value = paciente.nome;
      cpf.value = paciente.cpf;
      sexoSelecionado.value = paciente.sexo === 0 ? 'Feminino' : 'Masculino',
      email.value = paciente.email;

      const dataNascimento = new Date(paciente.dataNascimento);
      const formattedDate = dataNascimento.toISOString().split('T')[0]; 
      dataNasc.value = formattedDate;

      const parseTelefone = parseTelefoneMovel(paciente.telefone);
      if(parseTelefone){
        ddd.value = parseTelefone.ddd;
        telefone.value = parseTelefone.fone;
      }
      alergiasSelecionadas.value = paciente.alergias;
      comorbidadesSelecionadas.value = paciente.comorbidades;
}

function parseTelefoneMovel(telefone: string): { ddd: string, fone: string } | null {
    const regex = /^\((\d{2})\) (\d{5})-(\d{4})$/;

    const match = telefone.match(regex);
    if (match) {
        const ddd = match[1]; // Captura o DDD
        const fone = match[2] + match[3]; // Captura o número e junta
        return { ddd, fone }; // Retorna um objeto com DDD e telefone
    }

    return null; 
}

function getRegisterPaciente() : RegisterPacienteRequest{
  const novoPaciente: RegisterPacienteRequest = {
      nome: nome.value,
      cpf: cpf.value,
      dataNascimento: dataNasc.value ? new Date(dataNasc.value) : new Date(),
      sexo: sexoSelecionado.value === 'Feminino' ? Sexo.Feminino : Sexo.Masculino,
      email: email.value,
      ddd: ddd.value,
      telefone: telefone.value,
      alergias: alergiasSelecionadas.value.map(alergia => alergia.id),
      comorbidades: comorbidadesSelecionadas.value.map(com => com.id),
    };
  return novoPaciente;
}

function getUpdaterPaciente() : UpdatePacienteRequest{
  const updatePaciente: UpdatePacienteRequest = {
      id: idItem.value,
      nome: nome.value,
      cpf: cpf.value,
      dataNascimento: dataNasc.value ? new Date(dataNasc.value) : new Date(),
      sexo: sexoSelecionado.value === 'Feminino' ? Sexo.Feminino : Sexo.Masculino,
      email: email.value,
      ddd: ddd.value,
      telefone: telefone.value,
      alergias: alergiasSelecionadas.value.map(alergia => alergia.id),
      comorbidades: comorbidadesSelecionadas.value.map(com => com.id),
    };
  return updatePaciente;
}
</script>

