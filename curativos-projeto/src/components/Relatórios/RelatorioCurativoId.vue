<!-- src/components/RelatorioCurativo.vue -->
<template>
  <div id="relatorio">
    <h1>Relatório de Curativo</h1>

    <div class="section">
        <h2>Paciente</h2>
        <p><strong>Nome:</strong> {{ itemDetails?.paciente.nome }}</p>
        <p><strong>Sexo:</strong> {{ mostrarSexo(itemDetails?.paciente.sexo) }}</p>
        <p><strong>Idade:</strong> {{ itemDetails?.paciente.dataNascimento ? calcularIdade(itemDetails.paciente.dataNascimento) : 'Idade não disponível' }}</p>
        <p><strong>Telefone:</strong> {{ itemDetails?.paciente.telefone }}</p>
        <p><strong>Cpf:</strong> {{ itemDetails?.paciente.cpf }}</p>
    </div>

    <div class="section">
        <h2>Lesão</h2>
        <p><strong>Detalhes:</strong> {{ itemDetails?.lesao.detalhes }}</p>
        <p><strong>Membro:</strong> {{ itemDetails?.lesao.membro ? MembroDisplayNames[itemDetails?.lesao.membro] : 'Nenhuma' }}</p>
        <p><strong>Região:</strong> {{ itemDetails?.lesao.regiao ? RegiaoDisplayNames[itemDetails?.lesao.regiao] : 'Nenhuma' }}</p>
        <p><strong>Lado:</strong> {{ itemDetails?.lesao.ladoRegiao ? LadoRegiaoDisplayNames[itemDetails?.lesao.ladoRegiao] : 'Nenhuma' }}</p>
        <p><strong>Situação:</strong> {{ situacao }}</p>
        <p><strong>Características:</strong></p>
        <ul>
            <li v-for="cobertura in caracteristicas" :key="cobertura">{{ cobertura }}</li>
        </ul>
    </div>

    <div class="section">
        <h2>Coberturas</h2>
        <ul>
            <li v-for="cobertura in coberturas" :key="cobertura">{{ cobertura }}</li>
        </ul>
    </div>

    <div class="section">
        <h2>Avaliação</h2>
        <p><strong>Altura:</strong> {{ itemDetails?.evolucao.altura }} cm</p>
        <p><strong>Largura:</strong> {{ itemDetails?.evolucao.largura }} cm</p>
        <p><strong>Profundidade:</strong> {{ itemDetails?.evolucao.profundidade }} cm</p>
    </div>

    <div class="section">
        <h2>Detalhes</h2>
        <p><strong>Detalhes:</strong> {{ itemDetails?.detalhes }}</p>
    </div>

    <div class="section">
        <h2>Orientações</h2>
        <p><strong>Orientações:</strong> {{ itemDetails?.orientacoes }}</p>
    </div>

    <div class="section">
        <h2>Fotos</h2>
        <div class="fotos">
            <div v-for="(foto, index) in fotosBase64" :key="index" class="foto-item">
                <img :src="foto" alt="Foto do curativo">
            </div>
        </div>
    </div>
</div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CurativoDto, createDefaultCurativo } from '@/types/curativo';
import { RegiaoDisplayNames } from '@/enums/Regiao';
import { MembroDisplayNames } from '@/enums/Membro';
import { LadoRegiaoDisplayNames } from '@/enums/LadoRegiao';

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
  return sexoInput === 0 ? 'Feminino' : 'Masculino';
};


const itemDetails = ref<CurativoDto>(createDefaultCurativo());
const coberturas = ref([]);
const situacao = ref('');
const fotosBase64 = ref([]);
const caracteristicas = ref([]);

onMounted(() => {
  itemDetails.value = JSON.parse(localStorage.getItem('curativoDetalhes') || '{}');
  coberturas.value = JSON.parse(localStorage.getItem('relatorioCoberturas') || '[]');
  situacao.value = localStorage.getItem('relatorioSituacao') || '';
  fotosBase64.value = JSON.parse(localStorage.getItem('relatorioFotosBase64') || '[]');
  caracteristicas.value = JSON.parse(localStorage.getItem('relatorioCaracteristicas') ||'[]');
});
</script>

<style lang="postcss" scoped>
body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f9;
    margin: 0;
    padding: 20px;
}

#relatorio {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #4a4a4a;
    font-size: 28px;
    margin-bottom: 20px;
    border-bottom: 2px solid #d9d9d9;
    padding-bottom: 10px;
}

h2 {
    font-size: 20px;
    color: #333;
    margin-top: 0;
}

p {
    color: #555;
    margin: 8px 0;
}

ul {
    padding-left: 20px;
    color: #555;
}

.section {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    background-color: #fafafa;
}

.fotos {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.foto-item {
    flex: 1 1 150px;
}

img {
    width: 150px;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    #relatorio {
        padding: 15px;
    }

    .foto-item {
        flex: 1 1 100%;
    }
}

</style>
