<template>
    <v-container style="max-width: 1200px; margin: 0 auto;">
        <v-row>
            <!-- Título -->
            <v-col>
                <h1 class="text-indigo-darken-3">Lesão</h1>
            </v-col>

            <v-spacer></v-spacer>

            <!-- Botão Editar -->
            <v-col class="text-right">
              <v-btn  
                    class="mx-1"
                    color="indigo-darken-3"
                    prepend-icon="mdi mdi-plus"
                    variant="outlined"
                    @click="navigateToNovaLesao()"
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
        
      <v-card class="pa-4">
      <v-row>
        <!-- Nome -->
        <v-col cols="12">
            <h3 class="text-indigo-darken-3 mb-4">Paciente</h3>
            <v-row>
                <v-col cols="4">
                <v-icon>mdi-account</v-icon> {{ itemDetails?.paciente.nome }}
                </v-col>
                <v-col cols="2">
                <v-icon>mdi mdi-human-male-female</v-icon> {{mostrarSexo(itemDetails?.paciente.sexo)}}
                </v-col>
                <v-col cols="2">
                <v-icon>mdi mdi-cake-variant-outline</v-icon> {{ itemDetails?.paciente.dataNascimento ? calcularIdade(itemDetails.paciente.dataNascimento) : 'Idade não disponível' }}
                </v-col>
                <v-col cols="3">
                <v-icon>mdi-card-account-details-outline</v-icon> {{ itemDetails?.paciente.cpf ? itemDetails?.paciente.cpf : 'Cpf não disponível' }}
                </v-col>
            </v-row>

            <v-divider class="mb-4 my-3"></v-divider>
            <h3 class="text-indigo-darken-3 mb-4">Dados da Lesão</h3>

            <v-row>
                <v-col>
                    <p class="text-body-2 font-weight-medium">Detalhes</p>
                    <p>{{itemDetails?.detalhes}}</p>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="4">
                    <p class="text-body-2 font-weight-medium">Membro</p>
                    <p>{{itemDetails?.membro ? MembroDisplayNames[itemDetails?.membro] : 'Nenhuma'}}</p>
                </v-col>
                <v-col cols="4">
                    <p class="text-body-2 font-weight-medium">Região</p>
                    <p>{{itemDetails?.regiao ? RegiaoDisplayNames[itemDetails?.regiao] : 'Nenhuma'}}</p>
                </v-col>
                <v-col cols="4">
                    <p class="text-body-2 font-weight-medium">Situação</p>
                    <v-chip
                    :color="situacao == 'Fechada' ? 'green' : 'red'"
                    :text="situacao"
                    class="text-uppercase"
                    size="small"
                    label
                    ></v-chip>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="4">
                    <p class="text-body-2 font-weight-medium">Tipo de Úlcera</p>
                    <p>{{itemDetails?.tipoUlcera ? TipoUlceraDisplayNames[itemDetails?.tipoUlcera] : 'Nenhuma'}}</p>
                </v-col>
                <v-col cols="8">
                    <p class="text-body-2 font-weight-medium">Características</p>
                    <v-chip color="indigo-darken-3" label class="mr-3 mt-2"
                    v-for="carac in caracteristicas"
                    :key="carac">
                        <v-icon icon="mdi-label" start></v-icon>
                        {{carac}}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>       
      </v-row>
    </v-card>
      
    </v-container>
  </template>

  
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { LesaoDto } from '@/types/lesao';
    import { getLesaoById } from '@/services/LesaoService';
    import { MembroDisplayNames } from '@/enums/Membro';
    import { RegiaoDisplayNames } from '@/enums/Regiao';
    import { SituacaoLesaoDisplayNames} from '@/enums/SituacaoLesao';
    import { TipoUlceraDisplayNames } from '@/enums/TipoUlcera';

    const idItem = ref(0);
    const route = useRoute();
    const router = useRouter();
    const itemDetails = ref<LesaoDto | null>(null);
    const situacao = ref('');
    const caracteristicas = ref<string[]>([]);

    function navigateToEdit(item: number | undefined | null) {
        router.push({ path: `/lesoes/novo`, query: { item }}).catch(err => console.error(err));
    } 

    function navigateToNovaLesao() {
        router.push({ path: '/lesoes/novo' }).catch(err => console.error(err));
    }

    const mostrarSexo = (sexoInput: number | undefined): string => {
      if(sexoInput === undefined) return '';
      const data = sexoInput === 0 ? 'Feminino' : 'Masculino';
      return data;
    };

    const calcularIdade = (dataNascimento: Date): string => {
        
        const nascimento = typeof dataNascimento === 'string' ? new Date(dataNascimento) : dataNascimento;

        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        // Ajusta a idade se ainda não tiver feito aniversário este ano
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
        }

        return `${idade} anos`;
    };

    const obterNomesDasCondicoes = (lesao: LesaoDto): string[] => {
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
          itemDetails.value = await getLesaoById(id);
          situacao.value = itemDetails?.value.situacao ? SituacaoLesaoDisplayNames[itemDetails?.value.situacao] : 'Nenhuma';
          caracteristicas.value = obterNomesDasCondicoes(itemDetails.value);
      } else {
          console.error('ID não encontrado na query');
      }
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
  