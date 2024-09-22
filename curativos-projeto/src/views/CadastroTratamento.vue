<template>
    <v-container  style="max-width: 1200px; margin: 0 auto;">
      <v-responsive>
        <v-row no-gutters>
          <v-col>
            <v-sheet class="pa-2 ma-2 text-indigo-darken-3">
              <h1>Cadastrar Tratamento</h1>
            </v-sheet>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <form @submit.prevent="submit">
            <v-text-field
                v-model="name.value.value"
                :error-messages="name.errorMessage.value"
                label="Nome tratamento"
            ></v-text-field>
        
            <v-textarea
                v-model="descricao.value.value"
                :error-messages="descricao.errorMessage.value"
                label="Descrição"
            ></v-textarea>
               
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
                    Registrar
                </v-btn>
            </div>
        </form>       
      </v-responsive>
    </v-container>
    </template>
  
    <script setup>
      import { ref } from 'vue'
      import { useField, useForm } from 'vee-validate'
      import { tratamentosService } from '../services/tratamentoService.ts';
    
      const { handleSubmit, handleReset } = useForm({
        validationSchema: {
          name (value) {
            if (value?.length >= 2) return true
    
            return 'O nome deve ter ao menos 2 caracteres.'
          },
          descricao (value) {
            if (value?.length >= 5) return true
    
            return 'Deve ser preenchida a descrição.'
          },
        },
      })
      const name = useField('name')
      const descricao = useField('descricao')

      const submit = handleSubmit(async (values) => {
            try {
                const response = await tratamentosService.createTratamento({
                nome: values.name,
                descricao: values.descricao,
                });
                alert('Tratamento registrado com sucesso: ' + JSON.stringify(response));
                handleReset();
            } catch (error) {
                console.error('Erro ao registrar tratamento:', error);
                alert('Erro ao registrar tratamento: ' + (error.response?.data?.message || error.message));
            }
        });
    </script>
  
