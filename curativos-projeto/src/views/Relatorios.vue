<template>

  <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2 ">
            <h1 class="cabecalho-lg">Relatórios</h1>
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
        <v-text-field
          label="Selecione o paciente"
          variant="outlined"
          single-line
        ></v-text-field>

        <!-- Adicionar uma margem superior para o espaçamento -->
        <v-row justify="end" class="mt-4">
          <v-col cols="auto" class="pa-2">
            <v-btn
              class="text-none mb-4"
              color="indigo-darken-3"
              size="x-large"
              variant="flat"
              block
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
        <v-text-field
          label="Selecione o paciente"
          variant="outlined"
          single-line
          class="mb-4"
        ></v-text-field>

        <!-- Espaçamento uniforme para os campos de data -->
        <v-row>
          <v-col cols="12" md="6" class="pa-2">
            <v-text-field
              v-model="dateInicio"
              label="Data Inicio"
              type="date"
              :min="minDate"
              :max="maxDate"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="pa-2">
            <v-text-field
              v-model="dateFim"
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
              v-model="dateInicio"
              label="Data Inicio"
              type="date"
              :min="minDate"
              :max="maxDate"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="pa-2">
            <v-text-field
              v-model="dateFim"
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
        <v-text-field
          label="Selecione a lesão"
          variant="outlined"
          single-line
        ></v-text-field>

        <!-- Adicionar uma margem superior para o espaçamento -->
        <v-row justify="end" class="mt-4">
          <v-col cols="auto" class="pa-2">
            <v-btn
              class="text-none mb-4"
              color="indigo-darken-3"
              size="x-large"
              variant="flat"
              block
            >
              Gerar Relatório
            </v-btn>
          </v-col>         
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
    
  </v-expansion-panels>

</template>


<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10), // Data inicial (ano-mês-dia)
      minDate: '2020-01-01', // Data mínima
      maxDate: '2030-12-31', // Data máxima
    };
  },
};
</script>
<!-- <template>
    <div>
   
      <v-expansion-panels class="my-4" variant="popout">
        <v-expansion-panel
          text="Gerar relatório de todos os curativos de um paciente"
          title="Relatório de curativos totais por paciente"
        ></v-expansion-panel>

        <v-card
    class="mx-auto"
    elevation="1"
    max-width="500"
  >
    <v-card-text>
      <div class="text-subtitle-2 font-weight-black mb-1">Selecione o paciente</div>

      <v-text-field
        label="Enter value here"
        variant="outlined"
        single-line
      ></v-text-field>

      <v-btn
        class="text-none mb-4"
        color="indigo-darken-3"
        size="x-large"
        variant="flat"
        block
      >
        Gerar Relatório
      </v-btn>

      <v-btn
        class="text-none"
        color="grey-lighten-3"
        size="x-large"
        variant="flat"
        block
      >
        Cancel
      </v-btn>
    </v-card-text>
  </v-card>

      </v-expansion-panels>
    </div>
  </template> -->