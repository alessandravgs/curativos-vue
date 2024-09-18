<template>
  <v-container  style="max-width: 1200px; margin: 0 auto;">
    <v-responsive>
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2 ">
            <h1>Cadastrar Paciente</h1>
          </v-sheet>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <form @submit.prevent="submit">
          <v-text-field
              v-model="name.value.value"
              :counter="10"
              :error-messages="name.errorMessage.value"
              label="Nome Paciente"
          ></v-text-field>
      
          <v-text-field
              v-model="phone.value.value"
              :counter="7"
              :error-messages="phone.errorMessage.value"
              label="Telefone"
          ></v-text-field>
      
          <v-text-field
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              label="E-mail"
          ></v-text-field>
      
          <v-select
              v-model="select.value.value"
              :error-messages="select.errorMessage.value"
              :items="items"
              label="Sexo"
          ></v-select>
      
          <v-checkbox
              v-model="checkbox.value.value"
              :error-messages="checkbox.errorMessage.value"
              label="Option"
              type="checkbox"
              value="1"
          ></v-checkbox>
      
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
  
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        name (value) {
          if (value?.length >= 2) return true
  
          return 'Name needs to be at least 2 characters.'
        },
        phone (value) {
          if (/^[0-9-]{7,}$/.test(value)) return true
  
          return 'Phone number needs to be at least 7 digits.'
        },
        email (value) {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
  
          return 'Must be a valid e-mail.'
        },
        select (value) {
          if (value) return true
  
          return 'Select an item.'
        },
        checkbox (value) {
          if (value === '1') return true
  
          return 'Must be checked.'
        },
      },
    })
    const name = useField('name')
    const phone = useField('phone')
    const email = useField('email')
    const select = useField('select')
    const checkbox = useField('checkbox')
  
    const items = ref([
      'Feminino',
      'Masculino',
    ])
  
    const submit = handleSubmit(values => {
      alert(JSON.stringify(values, null, 2))
    })
  </script>

  <style scoped>
    :root {
      --cabecalhos: Paytone One, sans-serif;
    }

     .cabecalho-lg {
      color: var(--verde-medio, #3D6D4A);
      display: block;
      margin-bottom: 1.5rem;
      font-family: var(--cabecalhos);
      font-size: 2.8em;
      line-height: 120%; /* 4.0275em */
    }
  </style>