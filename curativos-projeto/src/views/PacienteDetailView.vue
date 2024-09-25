<template>
    <v-container style="max-width: 1200px; margin: 0 auto;">
      <v-row>
            <!-- Título -->
            <v-col>
                <h1 class="text-indigo-darken-3">Paciente</h1>
            </v-col>

            <v-spacer></v-spacer>

            <!-- Botão Editar -->
            <v-col class="text-right">
                <v-btn  
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
            <v-col>
                <h3 class="text-indigo-darken-3">Detalhes</h3>
            </v-col>
        </v-row>

      <v-row>
        <!-- Nome -->
        <v-col cols="6">
          <v-row>
            <v-col>
              <p class="text-body-2 font-weight-bold">Nome</p>
              <p>{{ itemDetails?.nome }}</p>
            </v-col>
          </v-row>
        </v-col>

        <!-- Cpf -->
        <v-col cols="6">
          <v-row>
            <v-col>
              <p class="text-body-2 font-weight-bold">Cpf</p>
              <p>{{ itemDetails?.cpf }}</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <!-- Data nascimento -->
        <v-col cols="6">
            <v-row>
                <v-col>
                    <p class="text-body-2 font-weight-bold">Data de Nascimento</p>
                    <p>{{ mostrarData(itemDetails?.dataNascimento) }}</p>
                </v-col>
            </v-row>
        </v-col>
        
        <!-- Sexo -->
        <v-col cols="6">
            <v-row>
            <v-col>
                <p class="text-body-2 font-weight-bold">Sexo</p>
                <p>{{ mostrarSexo(itemDetails?.sexo) }}</p>
            </v-col>
            </v-row>
        </v-col>

      </v-row>
     
      <v-row>
        <!-- Email -->
        <v-col cols="6">
          <v-row>
            <v-col>
              <p class="text-body-2 font-weight-bold">Email</p>
              <p>{{ itemDetails?.email }}</p>
            </v-col>
          </v-row>
        </v-col>

        <!-- Telefone -->
        <v-col cols="6">
            <v-row>
            <v-col>
                <p class="text-body-2 font-weight-bold">Telefone</p>
                <p>{{ itemDetails?.telefone }}</p>
            </v-col>
            </v-row>
        </v-col>
      </v-row>

      <v-divider class="mb-2 mt-2"></v-divider>

      <v-row>
            <v-col>
                <h3 class="text-indigo-darken-3">Alergias e Comorbidades</h3>
            </v-col>
        </v-row>

        <v-row>
        <!-- Email -->
        <v-col cols="6">
          <v-row>
            <v-col>
              <p class="text-body-2 font-weight-bold">Alergias</p>
              <p v-for="carac in itemDetails?.alergias"
              :key="carac.id">
                {{ carac.nome }}
              </p>

            </v-col>
          </v-row>
        </v-col>

        <!-- Telefone -->
        <v-col cols="6">
            <v-row>
            <v-col>
                <p class="text-body-2 font-weight-bold">Comorbidades</p>
                <p v-for="carac in itemDetails?.comorbidades"
                :key="carac.id">
                  {{ carac.nome }}
                </p>
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
    import { Paciente } from '@/types/paciente';
    import { getPacienteById } from '@/services/PacienteService';

    const idItem = ref(0);
    const route = useRoute();
    const router = useRouter();
    const itemDetails = ref<Paciente | null>(null);

    function navigateToEdit(id: number | undefined | null) {
        router.push({ path: `/tratamentos/novo`, query: { id }}).catch(err => console.error(err));
    } 

    const mostrarData = (dataInput: Date | undefined): string => {
      if(!dataInput) return '';
      const nascimento = typeof dataInput === 'string' ? new Date(dataInput) : dataInput;
      const data = nascimento.toLocaleDateString();
      return data;
    };

    const mostrarSexo = (sexoInput: number | undefined): string => {
      if(sexoInput === undefined) return '';
      const data = sexoInput === 0 ? 'Feminino' : 'Masculino';
      return data;
    };

    onMounted(async () => {
      const id = Number(route.query.item);
      idItem.value = id;

      if (id) {
          itemDetails.value = await getPacienteById(id);
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
  