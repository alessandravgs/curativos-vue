import axios from 'axios';
import { RegisterPacienteRequest, Alergia, Comorbidade, PacienteResumoResult, Paciente, UpdatePacienteRequest } from '@/types/paciente';
import { PaginacaoResult } from '@/types/geral';
import { Sexo } from '@/types/enums';
import { useRouter } from 'vue-router';
import { createApiClient } from '@/services/axios';

export const createPaciente = async (data: RegisterPacienteRequest): Promise<Paciente | null> => {
  try {
    const router = useRouter();
    const apiClient = createApiClient(router); 
      const response = await apiClient.post<Paciente>('/paciente/register', data);
      console.log('Paciente criado com sucesso:', response.data);
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Erro ao criar paciente:', error.response?.data || error.message);
      } else {
          console.error('Erro inesperado:', error);
      }
      return null;
  }
};

export const updatePaciente = async (data: UpdatePacienteRequest): Promise<Paciente | null> => {
  try {
    const router = useRouter();
    const apiClient = createApiClient(router); 
      const response = await apiClient.post<Paciente>('/paciente/update', data);
      console.log('Paciente atualizado com sucesso:', response.data);
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Erro ao criar paciente:', error.response?.data || error.message);
      } else {
          console.error('Erro inesperado:', error);
      }
      return null;
  }
};


export const fetchAlergias = async (): Promise<Alergia[]> => {
  try {
    const router = useRouter();
    const apiClient = createApiClient(router); 
    const response = await apiClient.get<Alergia[]>('/paciente/alergias');
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao consultar alergias:', error.response?.data || error.message);
    } else {
      console.error('Erro inesperado:', error);
    }
    return [];
  }
};

export const fetchComorbidades = async (): Promise<Comorbidade[]> => {
  try {
    const router = useRouter();
    const apiClient = createApiClient(router); 
    const response = await apiClient.get<Comorbidade[]>('/paciente/comorbidades');
    console.log("fecth")
    console.log(response.data)
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao consultar comorbidades:', error.response?.data || error.message);
    } else {
      console.error('Erro inesperado:', error);
    }
    return [];
  }
};

export const getPacientesPaginado = async (pageNumber = 1, pageSize = 10): Promise<PaginacaoResult<PacienteResumoResult>> => {
  try {
    const router = useRouter();
    const apiClient = createApiClient(router); 
    const response = await apiClient.get<PaginacaoResult<PacienteResumoResult>>
    ("/paciente/paginado", { params: { pageNumber, pageSize } });

    return response.data; 
  } 
  catch (error) 
  {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao consultar comorbidades:', error.response?.data || error.message);
    } 
    else {
      console.error('Erro inesperado:', error);
    }
    return {
      totalItems: 0,      
      pageSize: 0,  
      pageNumber: 1,    
      items: []         
    };
  }
};

export const getPacientesSearchPaginado = async (parametro: string, pageNumber = 1, pageSize = 10): Promise<PaginacaoResult<PacienteResumoResult>> => {
  try {
    const router = useRouter();
    const apiClient = createApiClient(router); 
      const response = await apiClient.get<PaginacaoResult<PacienteResumoResult>>
      ("/paciente/search", { params: { parametro, pageNumber, pageSize } });

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao consultar comorbidades:', error.response?.data || error.message);
    } 
    else {
      console.error('Erro inesperado:', error);
    }
    return {
      totalItems: 0,      
      pageSize: 0,  
      pageNumber: 1,    
      items: []         
    };
  }
};

export const getPacienteById = async (parametro: number): Promise<Paciente> => {
  try {
    const router = useRouter();
    const apiClient = createApiClient(router); 
      const response = await apiClient.get<Paciente>
      ("/paciente/id", { params: { parametro } });

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao consultar paciente:', error.response?.data || error.message);
    } 
    else {
      console.error('Erro inesperado:', error);
    }
    return {
      id: 0, 
      nome: '',
      cpf: '',
      dataNascimento: new Date(), 
      telefone: '',
      sexo: Sexo.Feminino,
      email: '',
      alergias: [],
      comorbidades: [],
    };
  }
};