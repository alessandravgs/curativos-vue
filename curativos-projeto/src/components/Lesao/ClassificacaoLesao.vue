<template>
    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="6" sm="6" >
              <v-switch
                color="indigo-darken-3"
                label="Cirurgica"
                value="Cirurgica"
                hide-details
              ></v-switch>
              <v-switch
                color="indigo-darken-3"
                label="Infectada"
                value="Infectada"
                hide-details
              ></v-switch>

              <v-switch
                color="indigo-darken-3"
                label="Deiscência Cirurgica"
                value="DeiscenciaCirurgica"
                hide-details
              ></v-switch>

              <v-switch
                color="indigo-darken-3"
                label="Hanseniase"
                value="Hanseniase"
                hide-details
              ></v-switch>

            </v-col>

            <v-col cols="12" md="6" sm="6" >
                <v-switch
                color="indigo-darken-3"
                label="Miiase"
                value="Miiase"
                hide-details
              ></v-switch>
              <v-switch
                color="indigo-darken-3"
                label="Amputação"
                value="Amputacao"
                hide-details
              ></v-switch>

              <v-switch
                color="indigo-darken-3"
                label="Desbridamento"
                value="Desbridamento"
                hide-details
              ></v-switch>

              <v-switch
                color="indigo-darken-3"
                label="Traumática"
                value="Traumatica"
                hide-details
              ></v-switch>
            </v-col>
            
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </template>
  
