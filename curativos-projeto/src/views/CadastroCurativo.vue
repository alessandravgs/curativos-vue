<template>
  <v-container style="max-width: 1200px; margin: 0 auto;">
      <v-responsive>
          <v-row no-gutters>
              <v-col>
                  <v-sheet class="mb-2 text-indigo-darken-3">
                      <h1>{{ isEditing ? 'Editar Curativo' : 'Cadastrar Curativo' }}</h1>
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
                <v-row class="mt-1">
                  <v-col class="d-flex align-center">
                    <v-icon color="indigo-darken-3" class="mr-2" style="font-size: 24px;">mdi mdi-account</v-icon>
                    <h3 class="text-indigo-darken-3 mb-0">Paciente</h3>
                  </v-col>
                </v-row>

                <v-row class="mt-2">
                  <FindPaciente :id="pacienteDataId" @pacienteSelecionado="onPacienteSelecionado"/> 
                </v-row>

                <v-row>
                  <v-col class="d-flex align-center">
                    <v-icon color="indigo-darken-3" class="mr-2" style="font-size: 24px;">mdi-heart-pulse</v-icon>
                    <h3 class="text-indigo-darken-3 mb-0">Lesão</h3>
                  </v-col>
                </v-row>

                <v-row>
                  <FindLesoeByPaciente :idPaciente="pacienteDataId" :nome-lesao="lesaoEditValue" @lesao-selecionado="onLesaoSelecionada"/>
                </v-row>
                
               <v-row>
                  <v-col class="d-flex align-center">
                    <v-icon color="indigo-darken-3" class="mr-2" style="font-size: 24px;">mdi-medication-outline</v-icon>
                    <h3 class="text-indigo-darken-3 mb-0">Coberturas</h3>
                  </v-col>
                </v-row>

                <v-row>
                  <FindCoberturas :coberturasEdit="coberturasSelecionadasEdit" @cobertura-selecionado="onCoberturaSelecionada"/> 
                </v-row>

                <v-row>
                  <v-col class="d-flex align-center">
                    <v-icon color="indigo-darken-3" class="mr-2" style="font-size: 24px;">mdi mdi-text-box-check-outline</v-icon>
                    <h3 class="text-indigo-darken-3 mb-0">Avaliação</h3>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field label="Altura (cm)" v-model="altura" :rules="[rulesNumber.number]" 
                    class="rounded-textarea"></v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field label="Largura (cm)" v-model="largura" :rules="[rulesNumber.number]" 
                    class="rounded-textarea"></v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field label="Profundidade (cm)" v-model="profundidade" :rules="[rulesNumber.number]" 
                    class="rounded-textarea"></v-text-field>
                  </v-col>
                  
                  <v-col>
                    <v-combobox v-model="situacaoSelected" :rules="rulesSituacao" :items="situacao" 
                      label="Situação" chips color="indigo" class="rounded-textarea"></v-combobox>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="d-flex align-center">
                    <v-icon color="indigo-darken-3" class="mr-2" style="font-size: 24px;">mdi-format-annotation-plus</v-icon>
                    <h3 class="text-indigo-darken-3 mb-0">Detalhes</h3>
                  </v-col>
                </v-row>

                <v-row class="mb-3">
                  <v-col>
                    <v-textarea label="Detalhes da lesão" v-model="detalhes" hide-details required class="rounded-textarea"></v-textarea>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="d-flex align-center">
                    <v-icon color="indigo-darken-3" class="mr-2" style="font-size: 24px;">mdi-information-outline</v-icon>
                    <h3 class="text-indigo-darken-3 mb-0">Orientações</h3>
                  </v-col>
                </v-row>

                <v-row class="mb-3">
                  <v-col>
                    <v-textarea label="Orientações ao Paciente" v-model="orientacoes" hide-details required class="rounded-textarea"></v-textarea>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="d-flex align-center">
                    <v-icon color="indigo-darken-3" class="mr-2" style="font-size: 24px;">mdi-camera-outline</v-icon>
                    <h3 class="text-indigo-darken-3 mb-0">Imagens</h3>
                  </v-col>
                </v-row>

                <v-row class="mb-3">
                  <v-col>
                    <v-file-input
                      label="Fotos"
                      v-model="fotos"
                      multiple
                      accept="image/*"
                    ></v-file-input>
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
import FindPaciente from '@/components/FindPaciente.vue';
import { LesaoResumoResult } from '@/types/lesao';
import FindCoberturas from '@/components/FindCoberturas.vue';
import { CoberturaResumoResult, CoberturaResumoResultSelect } from '@/types/cobertura';
import FindLesoeByPaciente from '@/components/FindLesoeByPaciente.vue';
import { CurativoDto, RegisterCurativoRequest, PacienteCurativoDto, LesaoCurativoDto, UpdateCurativoRequest } from '@/types/curativo';
import { SituacaoLesaoDisplayNames, getSelectedSituacaoLesao, SituacaoLesao } from '@/enums/SituacaoLesao';
import { createCurativo, getCurativoById, updateCurativo } from '@/services/CurativoService';

// Id de Curativo
const idItem = ref(0);

// Campos de Paciente
const pacienteSelecionado = ref<PacienteResumoResult>();
const pacienteDataId = ref(0);
const loading = ref(false);

//Campos de Coberturas
const cobeturasSelecionadas = ref<CoberturaResumoResultSelect[]>([]);
const coberturasSelecionadasEdit = ref<CoberturaResumoResultSelect[]>([]);

//Campos lesões 
const lesaoSelecionada = ref<LesaoResumoResult>();
const lesaoDataId = ref(0);
const lesaoEditValue = ref('');

//Campos de avaliação
const altura = ref('');
const profundidade = ref('');
const largura = ref('');

//Campos de Situação
const situacao = Object.values(SituacaoLesaoDisplayNames);
const situacaoSelected = ref<string>();

//Campos de detalhes
const detalhes = ref<string>('');

//Campos de orientações
const orientacoes = ref<string>('');

//Campos de fotos
const fotos = ref<File[]>([]);

//Rules

const rulesRequired = {
  required: (value: string | undefined) => !!value || 'Este campo é obrigatório.',
};

const rulesSituacao = [rulesRequired.required];

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
  pacienteDataId.value = paciente.id;
};

// Emit de Cobertura
const onCoberturaSelecionada = (coberturas: CoberturaResumoResultSelect[]) => {
  console.log('Coberturas selecionadas', coberturas)
  cobeturasSelecionadas.value = coberturas;
};

// Emit de Lesão
const onLesaoSelecionada = (lesao: LesaoResumoResult) => {
  console.log('Lesões selecionadas', lesao)
  lesaoSelecionada.value = lesao;
  lesaoDataId.value = lesao.id;
  console.log('Lesao recebida', lesaoSelecionada.value)
  console.log('Lesões Id', lesao.id)
  console.log('Lesões preenchido Id', lesaoDataId.value)
};

const route = useRoute();
const router = useRouter();
const isEditing = ref(false);

// Função de resetar os campos
const handleReset = () => {
  // Id de Curativo
  if(!isEditing){
    idItem.value = 0;
  }
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
        const curativoData = await getCurativoById(id);
        preencherDadosTela(curativoData);
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
      var curativoUpdate = getUpdateCurativo();
      await updateCurativo(curativoUpdate);    
      
      if(!curativoUpdate){
        throw new Error("Curativo não foi atualizado."); 
      }
    }
    else{
      var novoCurativo = getRegisterCurativo();
      novoCurativo.Fotos = await convertFilesToBase64();
      console.log(novoCurativo)
      var curativoCriado = await createCurativo(novoCurativo);

      if(!curativoCriado){
        throw new Error("Curativo não foi criado."); 
      }

      idItem.value = curativoCriado;      
    }

    navigateToDetalhes(idItem.value);
    
  } catch (error) {
      alert("Erro ao registrar/atualizar curativo");
      console.error('Erro ao registrar/atualizar curativo:', error);
  }
};

function navigateToDetalhes(item: number | null | undefined) {
      router.push({ path: `/curativos/detalhes`, query: { item } }).catch(err => console.error(err));
} 

function camposEstaoPreenchidos() {
  return (
    pacienteDataId.value > 0 && 
    lesaoDataId.value > 0 && 
    cobeturasSelecionadas.value.length > 0 && 
    altura.value.trim() !== '' && 
    largura.value.trim() !== '' && 
    profundidade.value.trim() !== '' && 
    situacaoSelected.value !== undefined 
  );
}


function preencherDadosTela(curativo: CurativoDto) {
    if (curativo.paciente) {
        pacienteSelecionado.value = converterPaciente(curativo.paciente, '');
        pacienteDataId.value = curativo.paciente.id;
    }

    if (curativo.lesao) {
        lesaoSelecionada.value = converterLesao(curativo.lesao, curativo.paciente.nome);
        lesaoDataId.value = curativo.lesao.id;
        lesaoEditValue.value = curativo.lesao.detalhes;
    }

    if (curativo.evolucao) {
        altura.value = curativo.evolucao.altura.toString();
        largura.value = curativo.evolucao.largura.toString();
        profundidade.value = curativo.evolucao.profundidade.toString();
    }

    if (curativo.coberturas) {
        cobeturasSelecionadas.value = converterCoberturas(curativo.coberturas);
        coberturasSelecionadasEdit.value = converterCoberturas(curativo.coberturas);
    }

    orientacoes.value = curativo.orientacoes || '';
    detalhes.value = curativo.detalhes || '';

    if (curativo.lesao.situacao) {
        situacaoSelected.value = SituacaoLesaoDisplayNames[curativo.lesao.situacao];
    }
}

function converterPaciente(curativoPaciente: PacienteCurativoDto, telefone: string): PacienteResumoResult {
    return {
        id: curativoPaciente.id,
        nome: curativoPaciente.nome,
        sexo: curativoPaciente.sexo,
        dataNascimento: curativoPaciente.dataNascimento,
        cpf: curativoPaciente.cpf,
        telefone: telefone 
    };
}

function converterLesao(curativoLesao: LesaoCurativoDto, pacienteNome: string): LesaoResumoResult {
    return {
        id: curativoLesao.id,
        detalhes: curativoLesao.detalhes,
        paciente: pacienteNome, 
        regiao: curativoLesao.regiao,
        ladoRegiao: curativoLesao.ladoRegiao,
        situacao: curativoLesao.situacao,
    };
}

function converterCoberturas(coberturas: CoberturaResumoResult[]): CoberturaResumoResultSelect[] {
    return coberturas.map(cobertura => ({
        id: cobertura.id,
        nome: cobertura.nome,
        descricao: cobertura.descricao, 
        selected: true, 
    }));
}


function getRegisterCurativo(): RegisterCurativoRequest {
    const novoRegistro: RegisterCurativoRequest = {
        PacienteId: pacienteDataId.value ? pacienteDataId.value : 0, 
        LesaoId: lesaoDataId.value ? lesaoDataId.value : 0,
        CoberturasIds: cobeturasSelecionadas.value.map(cobertura => cobertura.id), // Mapeia para os IDs das coberturas selecionadas
        Observacoes: detalhes.value || '', // Campo opcional
        Orientacoes: orientacoes.value || '', // Campo opcional
        Altura: parseFloat(altura.value) || 0, 
        Largura: parseFloat(largura.value) || 0,
        Profundidade: parseFloat(profundidade.value) || 0,
        SituacaoLesao: situacaoSelected.value ? getSelectedSituacaoLesao(situacaoSelected.value) : SituacaoLesao.None,
        Fotos: []
    };
    return novoRegistro;
}

function getUpdateCurativo(): UpdateCurativoRequest {
  const updateRegistro: UpdateCurativoRequest = {
    id: idItem.value,
    pacienteId: pacienteDataId.value ? pacienteDataId.value : 0, 
    lesaoId: lesaoDataId.value ? lesaoDataId.value : 0, 
    coberturasIds: cobeturasSelecionadas.value.map(cobertura => cobertura.id), 
    observacoes: detalhes.value || '', 
    orientacoes: orientacoes.value || '', 
    altura: parseFloat(altura.value) || 0,
    largura: parseFloat(largura.value) || 0,
    profundidade: parseFloat(profundidade.value) || 0,
    situacao: situacaoSelected.value ? getSelectedSituacaoLesao(situacaoSelected.value) : SituacaoLesao.None,
  };

  return updateRegistro;
}

// Função para converter todas as fotos para Base64
const convertFilesToBase64 = (): Promise<string[]> => {
  const promises = fotos.value.map((foto) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(foto);
    });
  });
  return Promise.all(promises);
};

</script>

