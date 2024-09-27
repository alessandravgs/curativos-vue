<template>
  <v-container style="max-width: 1200px; margin: 0 auto;">
      <!-- Título -->
      <v-row>
          <v-col>
              <h1 class="text-indigo-darken-3">Curativo</h1>
          </v-col>

          <v-spacer></v-spacer>

          <!-- Botão Editar -->
          <v-col class="text-right">
              <v-btn  
                  class="mx-1"
                  color="indigo-darken-3"
                  prepend-icon="mdi mdi-plus"
                  variant="outlined"
                  @click="navigateToNovoCurativo()"
              >
                  Novo
              </v-btn>

              <v-btn  
                  class="mx-1"
                  color="indigo-darken-3"
                  prepend-icon="mdi-pencil-outline"
                  @click="navigateToEdit(itemDetails?.id)"
              >
                  Editar
              </v-btn>
          </v-col>
      </v-row>

      <!-- Loader -->
      <v-row justify="center" v-if="loading">
          <v-col cols="auto">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-col>
      </v-row>

      <div v-else>
     
        <v-tabs v-model="tab" class="text-indigo-darken-3">
            <v-tab :value="0">Detalhes</v-tab>
            <v-tab :value="1">Imagens</v-tab>
        </v-tabs>

        <!-- Conteúdo das Abas -->
        <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="0">
                <!-- Detalhes do Pedido -->
                <v-row>
                    <v-col cols="12">
                        <v-card class="pa-3">
                            <h3 class="text-indigo-darken-3 mb-4">Paciente</h3>
                            <v-row>
                              <v-col cols="12" class="d-flex flex-column">
                                <div>
                                    <v-icon>mdi-account</v-icon> {{ itemDetails?.paciente.nome }}
                                </div>
                              </v-col>

                              <v-col cols="6" class="d-flex flex-column">
                                  <div class="mb-2">
                                      <v-icon>mdi-human-male-female</v-icon> {{ mostrarSexo(itemDetails?.paciente.sexo) }}
                                  </div>
                                  <div>
                                      <v-icon>mdi-cake-variant-outline</v-icon>
                                      {{ itemDetails?.paciente.dataNascimento ? calcularIdade(itemDetails.paciente.dataNascimento) : 'Idade não disponível' }}
                                  </div>
                              </v-col>

                              <v-col cols="6" class="d-flex flex-column">
                                  <div class="mb-2">
                                    <v-icon>mdi-card-account-details-outline</v-icon> {{ itemDetails?.paciente.cpf ? itemDetails?.paciente.cpf : 'Cpf não disponível' }}
                                  </div>
                                  <div>
                                      <v-icon>mdi-phone</v-icon> {{ itemDetails?.paciente.telefone ? itemDetails?.paciente.telefone : 'Celular do paciente não disponível' }}
                                  </div>
                              </v-col>
                            </v-row>

                            <v-divider class="mb-4 my-3"></v-divider>

                            <h3 class="text-indigo-darken-3 mb-4">Lesão</h3>
                            <v-row>
                                <v-col cols="6">
                                    <p><strong>Detalhes: </strong>{{itemDetails?.lesao.detalhes}}</p>
                                    <p><strong>Membro: </strong>{{itemDetails?.lesao.membro ? MembroDisplayNames[itemDetails?.lesao.membro] : 'Nenhuma'}}</p>
                                    <p><strong>Região: </strong>{{itemDetails?.lesao.regiao ? RegiaoDisplayNames[itemDetails?.lesao.regiao] : 'Nenhuma'}}</p> 
                                    <p><strong>Lado: </strong>{{itemDetails?.lesao.ladoRegiao ? LadoRegiaoDisplayNames[itemDetails?.lesao.ladoRegiao] : 'Nenhuma'}}</p>
                                </v-col>
                                <v-col cols="6">
                                    <p><strong>Situação: </strong> 
                                        <v-chip
                                            :color="situacao == 'Fechada' ? 'green' : 'red'"
                                            :text="situacao"
                                            class="text-uppercase"
                                            size="small"
                                            label
                                        ></v-chip>
                                    </p>
                                    <p><strong>Tipo Úlcera: </strong>{{itemDetails?.lesao.tipoUlcera ? TipoUlceraDisplayNames[itemDetails?.lesao.tipoUlcera] : 'Nenhuma'}}</p>
                                    <p>
                                      <strong>Características: </strong>
                                      <v-chip color="indigo-darken-3" label class="mr-3 mt-2"
                                        v-for="carac in caracteristicas"
                                        :key="carac">
                                            <v-icon icon="mdi-label" start></v-icon>
                                            {{carac}}
                                        </v-chip>
                                    </p>
                                </v-col>
                            </v-row>

                            <v-divider class="mb-4 my-3"></v-divider>

                            <v-row>
                                <v-col cols="6">
                                    <h3 class="text-indigo-darken-3 mb-4">Avaliação</h3>
                                    <p><strong>Altura: </strong> {{itemDetails?.evolucao.altura}}</p>
                                    <p><strong>Largura: </strong>{{itemDetails?.evolucao.largura}}</p>
                                    <p><strong>Profundidade: </strong> {{itemDetails?.evolucao.profundidade}}</p>
                                </v-col>
                                <v-col cols="6">
                                    <h3 class="text-indigo-darken-3 mb-4">Coberturas</h3>
                                    <v-chip color="light-blue-darken-4" label class="mr-3 mt-2"
                                        v-for="cobertura in coberturas"
                                        :key="cobertura">
                                        <v-icon icon="mdi-label" start></v-icon>
                                        {{cobertura}}
                                    </v-chip>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="6">
                                    <h3 class="text-indigo-darken-3 mb-4">Orientações</h3>
                                    <p>{{itemDetails?.orientacoes}}</p>
                                </v-col>
                                <v-col cols="6">
                                    <h3 class="text-indigo-darken-3 mb-4">Detalhes</h3>
                                    <p>{{itemDetails?.detalhes}}</p>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-tabs-window-item>

            <v-tabs-window-item :value="1">
                <v-container fluid>
                    <v-row>
                        <v-col
                            v-for="i in 6"
                            :key="i"
                            cols="12"
                            md="4"
                        >
                            <v-img
                                :lazy-src="`https://picsum.photos/10/6?image=${1 * 1 * 5 + 10}`"
                                :src="`https://picsum.photos/500/300?image=${1 * 1 * 5 + 10}`"
                                height="205"
                                cover
                            ></v-img>
                        </v-col>
                    </v-row>
                </v-container>
            </v-tabs-window-item>
        </v-tabs-window>
      </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CurativoDto, LesaoCurativoDto } from '@/types/curativo';
import { getCurativoById } from '@/services/CurativoService';
import { RegiaoDisplayNames } from '@/enums/Regiao';
import { SituacaoLesaoDisplayNames } from '@/enums/SituacaoLesao';
import { MembroDisplayNames } from '@/enums/Membro';
import { TipoUlceraDisplayNames } from '@/enums/TipoUlcera';
import { LadoRegiaoDisplayNames } from '@/enums/LadoRegiao';

const tab = ref(0);
const idItem = ref(0);
const route = useRoute();
const router = useRouter();
const itemDetails = ref<CurativoDto | null>(null);
const coberturas = ref<string[]>([]);
const situacao = ref('');
const loading = ref(true); 
const caracteristicas = ref<string[]>([]);

function navigateToEdit(item: number | undefined | null) {
  router.push({ path: `/curativos/novo`, query: { item }}).catch(err => console.error(err));
} 

function navigateToNovoCurativo() {
  router.push({ path: '/curativos/novo' }).catch(err => console.error(err));
}

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
  if(sexoInput === undefined) return '';
  return sexoInput === 0 ? 'Feminino' : 'Masculino';
};

const obterNomesDasCondicoes = (lesao: LesaoCurativoDto): string[] => {
    const nomes: string[] = [];

    if (lesao.cirurgica) nomes.push('Cirúrgica');
    if (lesao.infectada) nomes.push('Infectada');
    if (lesao.deiscenciaCirurgica) nomes.push('Deiscência Cirúrgica');
    if (lesao.hanseniase) nomes.push('Hanseníase');
    if (lesao.miiase) nomes.push('Miiase');
    if (lesao.amputacao) nomes.push('Amputação');
    if (lesao.desbridamento) nomes.push('Desbridamento');
    if (lesao.traumatica) nomes.push('Traumática');

    return nomes;
};

onMounted(async () => {
  const id = Number(route.query.item);
  idItem.value = id;

  if (id) {
      itemDetails.value = await getCurativoById(id);
      coberturas.value = itemDetails.value.coberturas.map(cobertura => cobertura.nome);
      situacao.value = itemDetails?.value.lesao.situacao ? SituacaoLesaoDisplayNames[itemDetails?.value.lesao.situacao] : 'Nenhuma';
      caracteristicas.value = obterNomesDasCondicoes(itemDetails.value.lesao);
  } else {
      console.error('ID não encontrado na query');
  }

  loading.value = false; 
});
</script>

<style scoped>
h3 {
  margin-top: 20px;
}

p {
  margin-bottom: 8px;
}
</style>
