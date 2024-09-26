<template>
  <v-container style="max-width: 1200px; margin: 0 auto;">
      <v-responsive>
          <v-row no-gutters>
              <v-col>
                  <v-sheet class="mb-2 text-indigo-darken-3">
                      <h1>{{ isEditing ? 'Editar Lesão' : 'Cadastrar Lesão' }}</h1>
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
                      <h3 class="text-indigo-darken-3 mt-2">Paciente</h3>
                  </v-col>
                </v-row>

                <v-row class="mt-2">
                  <FindPaciente :id="pacienteDataId" @pacienteSelecionado="onPacienteSelecionado"/> 
                </v-row>

                <v-row>
                  <v-col>
                      <h3 class="text-indigo-darken-3">Localização</h3>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <v-combobox v-model="membroSelected" :rules="rulesMembro" :items="membros" 
                    label="Membros" chips color="indigo" class="rounded-textarea"></v-combobox>
                  </v-col>

                  <v-col cols="4">
                    <v-combobox v-model="regiaoSelected" :rules="rulesRegiao" :items="regiao" 
                    label="Região" chips color="indigo" class="rounded-textarea"></v-combobox>
                  </v-col>

                  <v-col cols="4" >
                    <v-combobox v-model="ladoRegiaoSelected" :rules="rulesLadoRegiao" :items="ladoRegiao" 
                    label="Lado Região" chips color="indigo" class="rounded-textarea"></v-combobox>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col>
                      <h3 class="text-indigo-darken-3 pb-2">Classificação</h3>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="3" class="pa-1">
                    <v-checkbox color="indigo-darken-3" label="Cirúrgica" v-model="cirurgica" hide-details></v-checkbox>
                  </v-col>

                  <v-col cols="3" class="pa-1">
                    <v-checkbox color="indigo-darken-3" label="Infectada" v-model="infectada" hide-details></v-checkbox>
                  </v-col>

                  <v-col cols="3" class="pa-1">
                    <v-checkbox
                      color="indigo-darken-3" label="Deiscência Cirúrgica" v-model="deiscencia" hide-details></v-checkbox>
                  </v-col>

                  <v-col cols="3" class="pa-1">
                    <v-checkbox color="indigo-darken-3" label="Hanseníase" v-model="hanseniase" hide-details></v-checkbox>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="3" class="pa-1">
                    <v-checkbox color="indigo-darken-3" label="Miíase" v-model="miiase" hide-details ></v-checkbox>
                  </v-col>

                  <v-col cols="3" class="pa-1">
                    <v-checkbox color="indigo-darken-3" label="Amputação" v-model="amputacao" hide-details ></v-checkbox>
                  </v-col>

                  <v-col cols="3" class="pa-1">
                    <v-checkbox v-model="desbridamento" color="indigo-darken-3" label="Desbridamento" hide-details ></v-checkbox>
                  </v-col>

                  <v-col cols="3" class="pa-1">
                    <v-checkbox color="indigo-darken-3" label="Traumática" v-model="traumatica" hide-details ></v-checkbox>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                      <h3 class="text-indigo-darken-3">Situação</h3>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-combobox v-model="situacaoSelected" :rules="rulesSituacao" :items="situacao" 
                      label="Situação" chips color="indigo" class="rounded-textarea"></v-combobox>
                  </v-col>

                  <v-col>
                    <v-combobox v-model="tipoUlceraSelected" :rules="rulesTipoUlcera" :items="tipoUlcera" 
                      label="Tipo de Úlcera" chips color="indigo" class="rounded-textarea"></v-combobox>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                      <h3 class="text-indigo-darken-3">Avaliação</h3>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field label="Altura" v-model="altura" :rules="[rulesNumber.number]" 
                    class="rounded-textarea"></v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field label="Largura" v-model="largura" :rules="[rulesNumber.number]" 
                    class="rounded-textarea"></v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field label="Profundidade" v-model="profundidade" :rules="[rulesNumber.number]" 
                    class="rounded-textarea"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                      <h3 class="text-indigo-darken-3">Detalhes</h3>
                  </v-col>
                </v-row>

                <v-row class="mb-3">
                  <v-col>
                    <v-textarea label="Detalhes da lesão" v-model="detalhes" hide-details required class="rounded-textarea"></v-textarea>
                  </v-col>
                </v-row>
                
                <div class="d-flex justify-end mt-3">
                    <v-btn @click="handleReset" size="large"> Limpar </v-btn>

                    <v-btn class="ms-4" type="submit" size="large" color="indigo-darken-3">
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
import { PacienteResumoResult,  } from '@/types/paciente';

import { getSelectedMembro, Membro, MembroDisplayNames } from '@/enums/Membro';
import { getSelectedRegiao, Regiao, RegiaoDisplayNames } from '@/enums/Regiao';
import { getSelectedLadoRegiao, LadoRegiao, LadoRegiaoDisplayNames } from '@/enums/LadoRegiao';
import { getSelectedSituacaoLesao, SituacaoLesao, SituacaoLesaoDisplayNames } from '@/enums/SituacaoLesao';
import { getSelectedTipoUlcera, TipoUlcera, TipoUlceraDisplayNames } from '@/enums/TipoUlcera';
import FindPaciente from '@/components/FindPaciente.vue';
import { UpdateLesaoRequest, RegisterLesaoRequest, LesaoDto } from '@/types/lesao';
import { createLesao, getLesaoById, updateLesao } from '@/services/LesaoService';

// Id de Lesão
const idItem = ref(0);

// Campos de Paciente
const pacienteSelecionado = ref<PacienteResumoResult>();
const loading = ref(false);

//Campos de Localização
const membros = Object.values(MembroDisplayNames);
const membroSelected = ref<string>();
const regiao = Object.values(RegiaoDisplayNames);
const regiaoSelected = ref<string>();
const ladoRegiao = Object.values(LadoRegiaoDisplayNames);
const ladoRegiaoSelected = ref<string>();

//Campos de Situação
const situacao = Object.values(SituacaoLesaoDisplayNames);
const situacaoSelected = ref<string>();
const tipoUlcera = Object.values(TipoUlceraDisplayNames);
const tipoUlceraSelected = ref<string>();

//Campos de Classificação
const cirurgica = ref(false);
const infectada = ref(false);
const deiscencia = ref(false);
const hanseniase = ref(false);
const miiase = ref(false);
const amputacao = ref(false);
const desbridamento = ref(false);
const traumatica = ref(false);

//Campos de avaliação
const altura = ref('');
const profundidade = ref('');
const largura = ref('');

//Campos de detalhes
const detalhes = ref<string>('');

//Rules

const rulesRequired = {
  required: (value: string | undefined) => !!value || 'Este campo é obrigatório.',
};

const rulesMembro = [rulesRequired.required];
const rulesRegiao = [rulesRequired.required];
const rulesLadoRegiao = [rulesRequired.required];
const rulesSituacao = [rulesRequired.required];
const rulesTipoUlcera = [rulesRequired.required];

const rulesNumber = {
  number: (value: string) => {
    const regex = /^-?\d+(\.\d+)?$/; // Permite números inteiros e floats, incluindo negativos
    return regex.test(value) || 'Apenas números válidos são permitidos.';
  },
};

// Emit de Paciente
const onPacienteSelecionado = (paciente: PacienteResumoResult) => {
  console.log('Paciente selecionado:', paciente);
  pacienteSelecionado.value = paciente;
};

const route = useRoute();
const router = useRouter();
const isEditing = ref(false);

// Função de resetar os campos
const handleReset = () => {
  // Id de Lesão
  if(!isEditing){
    idItem.value = 0;
  }

  // Campos de Paciente
  pacienteSelecionado.value = undefined; 
  loading.value = false;

  // Campos de Localização
  membroSelected.value = undefined; 
  regiaoSelected.value = undefined; 
  ladoRegiaoSelected.value = undefined; 

  // Campos de Situação
  situacaoSelected.value = undefined; 
  tipoUlceraSelected.value = undefined; 

  // Campos de Classificação
  cirurgica.value = false;
  infectada.value = false;
  deiscencia.value = false;
  hanseniase.value = false;
  miiase.value = false;
  amputacao.value = false;
  desbridamento.value = false;
  traumatica.value = false;

  // Campos de avaliação
  altura.value = '';
  profundidade.value = '';
  largura.value = '';

  // Campos de detalhes
  detalhes.value = '';
};


// Preencher os campos se estiver editando
onMounted(async () => {
  try {
    loading.value = true;

    const id = Number(route.query.item);
    idItem.value = id;

    if (id) {
        isEditing.value = true;
        await nextTick();
        const lesaoData = await getLesaoById(id);
        preencherDadosTela(lesaoData);
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
      var lesaoUpdate = getUpdateLesao();
      await updateLesao(lesaoUpdate);    
    }
    else{
      var novaLesao = getRegisterLesao();
      console.log(novaLesao)
      var lesaoCriada = await createLesao(novaLesao);

      if(lesaoCriada == null){
        throw new Error("Lesão não foi criada."); 
      }

      idItem.value = lesaoCriada?.id || 0;
    }

    navigateToDetalhes(idItem.value);
    
  } catch (error) {
      alert("Erro ao registrar/atualizar lesão");
      console.error('Erro ao registrar/atualizar lesão:', error);
  }
};

function navigateToDetalhes(item: number | null | undefined) {
      router.push({ path: `/lesoes/detalhes`, query: { item } }).catch(err => console.error(err));
} 

function camposEstaoPreenchidos() {
  return (
    !!pacienteSelecionado.value &&
    !!membroSelected.value &&
    !!regiaoSelected.value &&
    !!ladoRegiaoSelected.value &&
    !! situacaoSelected.value &&
    !! tipoUlceraSelected.value &&
    !! detalhes.value
  );
}

const pacienteDataId = ref(0);

function preencherDadosTela(lesao: LesaoDto) {
  // Preenchendo os campos básicos
  pacienteDataId.value = lesao.paciente.id;

  // Preenchendo os campos de localização
  membroSelected.value = MembroDisplayNames[lesao.membro];
  regiaoSelected.value = RegiaoDisplayNames[lesao.regiao];
  ladoRegiaoSelected.value = LadoRegiaoDisplayNames[lesao.ladoRegiao];

  // Preenchendo os campos de situação
  situacaoSelected.value = SituacaoLesaoDisplayNames[lesao.situacao];
  tipoUlceraSelected.value = TipoUlceraDisplayNames[lesao.tipoUlcera];

  // Preenchendo os campos de classificação
  cirurgica.value = lesao.cirurgica;
  infectada.value = lesao.infectada;
  deiscencia.value = lesao.deiscenciaCirurgica;
  hanseniase.value = lesao.hanseniase;
  miiase.value = lesao.miiase;
  amputacao.value = lesao.amputacao;
  desbridamento.value = lesao.desbridamento;
  traumatica.value = lesao.traumatica;

  // Preenchendo os campos de avaliação
  altura.value = lesao.altura.toString(); // Convertendo para string para v-model
  largura.value = lesao.largura.toString();
  profundidade.value = lesao.profundidade.toString();

  // Preenchendo os detalhes
  detalhes.value = lesao.detalhes;
}



function getRegisterLesao(): RegisterLesaoRequest {
  const novoRegistro: RegisterLesaoRequest = {
    pacienteId: pacienteSelecionado.value ? pacienteSelecionado.value.id : 0, 
    membro: membroSelected.value ? getSelectedMembro(membroSelected.value) : Membro.None,
    regiao: regiaoSelected.value ? getSelectedRegiao(regiaoSelected.value) : Regiao.None,
    ladoReigao: ladoRegiaoSelected.value ? getSelectedLadoRegiao(ladoRegiaoSelected.value) : LadoRegiao.Nenhuma,
    situacao: situacaoSelected.value ? getSelectedSituacaoLesao(situacaoSelected.value) : SituacaoLesao.None,
    altura: parseFloat(altura.value) || 0, 
    largura: parseFloat(largura.value) || 0,
    profundidade: parseFloat(profundidade.value) || 0,
    tipoUlcera: tipoUlceraSelected.value ? getSelectedTipoUlcera(tipoUlceraSelected.value) : TipoUlcera.Nenhuma,
    cirurgica: cirurgica.value,
    infectada: infectada.value,
    deiscenciaCirurgica: deiscencia.value,
    hanseniase: hanseniase.value,
    miiase: miiase.value,
    amputacao: amputacao.value,
    desbridamento: desbridamento.value,
    traumatica: traumatica.value,
    detalhes: detalhes.value || ''
  };

  return novoRegistro;
}

function getUpdateLesao(): UpdateLesaoRequest {
  const updateRegistro: UpdateLesaoRequest = {
    id: idItem.value,
    pacienteId: pacienteSelecionado.value ? pacienteSelecionado.value.id : 0, // ou tratar o caso de paciente não selecionado
    membro: membroSelected.value ? getSelectedMembro(membroSelected.value) : Membro.None,
    regiao: regiaoSelected.value ? getSelectedRegiao(regiaoSelected.value) : Regiao.None,
    ladoReigao: ladoRegiaoSelected.value ? getSelectedLadoRegiao(ladoRegiaoSelected.value) : LadoRegiao.Nenhuma,
    situacao: situacaoSelected.value ? getSelectedSituacaoLesao(situacaoSelected.value) : SituacaoLesao.None,
    altura: parseFloat(altura.value) || 0,
    largura: parseFloat(largura.value) || 0,
    profundidade: parseFloat(profundidade.value) || 0,
    tipoUlcera: tipoUlceraSelected.value ? getSelectedTipoUlcera(tipoUlceraSelected.value) : TipoUlcera.Nenhuma,
    cirurgica: cirurgica.value,
    infectada: infectada.value,
    deiscenciaCirurgica: deiscencia.value,
    hanseniase: hanseniase.value,
    miiase: miiase.value,
    amputacao: amputacao.value,
    desbridamento: desbridamento.value,
    traumatica: traumatica.value,
    detalhes: detalhes.value || ''
  };

  return updateRegistro;
}

</script>

