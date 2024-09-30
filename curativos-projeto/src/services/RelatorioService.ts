import { criarLesaoCurativoRelatorio } from './../types/relatorios';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { createApiClient } from '@/services/axios';
import { criarPacienteCurativoRelatorio, criarProfissionalCurativoRelatorio, LesaoCurativoRelatorio, PacienteCurativoRelatorio, ProfissionalCurativoRelatorio } from '@/types/relatorios';

export const getRelatorioPacienteTotal = async (idPaciente: number): Promise<PacienteCurativoRelatorio> => {
    try {
        const router = useRouter();
        const apiClient = createApiClient(router); 
        const response = await apiClient.get<PacienteCurativoRelatorio>
        ("/relatorio/total/paciente", { params: { idPaciente } });
  
      return response.data;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao consultar relatório total de pacientes:', error.response?.data || error.message);
      } 
      else {
        console.error('Erro inesperado:', error);
      }
      return criarPacienteCurativoRelatorio();
    }
};

export const getRelatorioPacientePeriodo = async (idPaciente: number, dataInicial: Date, dataFinal: Date): Promise<PacienteCurativoRelatorio> => {
    try {
        const router = useRouter();
        const apiClient = createApiClient(router); 
        const response = await apiClient.get<PacienteCurativoRelatorio>
        ("/relatorio/periodo/paciente", { params: { idPaciente, dataInicial, dataFinal } });
  
      return response.data;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao consultar relatório total de pacientes:', error.response?.data || error.message);
      } 
      else {
        console.error('Erro inesperado:', error);
      }
      return criarPacienteCurativoRelatorio();
    }
};

export const getRelatorioProfissionalPeriodo = async (dataInicial: Date, dataFinal: Date): Promise<ProfissionalCurativoRelatorio> => {
    try {
        const router = useRouter();
        const apiClient = createApiClient(router); 
        const response = await apiClient.get<ProfissionalCurativoRelatorio>
        ("/relatorio/periodo/profissional", { params: { dataInicial, dataFinal } });
  
      return response.data;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao consultar relatório de profissional:', error.response?.data || error.message);
      } 
      else {
        console.error('Erro inesperado:', error);
      }
      return criarProfissionalCurativoRelatorio();
    }
};

export const getRelatorioLesao = async (lesaoId: number): Promise<LesaoCurativoRelatorio> => {
    try {
        const router = useRouter();
        const apiClient = createApiClient(router); 
        const response = await apiClient.get<LesaoCurativoRelatorio>
        ("/relatorio/lesao", { params: { lesaoId } });
  
      return response.data;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao consultar relatório de lesão:', error.response?.data || error.message);
      } 
      else {
        console.error('Erro inesperado:', error);
      }
      return criarLesaoCurativoRelatorio();
    }
};