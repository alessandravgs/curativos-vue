import { createDefaultProfissionalDto, ProfissionalDto, RegisterProfissionalRequest } from '@/types/profissional';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { createApiClient } from '@/services/axios';

export const createProfissional = async (data: RegisterProfissionalRequest): Promise<boolean> => {
    try {
        const router = useRouter();
        const apiClient = createApiClient(router); 
        const response = await apiClient.post<boolean>('/profissional/register', data, 
        {
            skipAuth: true, 
        });
        console.log('Profissional criado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro ao criar Profissional:', error.response?.data || error.message);
        } else {
            console.error('Erro inesperado:', error);
        }
        return false;
    }
};

export const getProfissionalById = async (): Promise<ProfissionalDto> => {
    try {
        const router = useRouter();
        const apiClient = createApiClient(router); 
        const response = await apiClient.get<ProfissionalDto>
        ("/profissional/dados");
  
      return response.data;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao consultar profissional:', error.response?.data || error.message);
      } 
      else {
        console.error('Erro inesperado:', error);
      }
      return createDefaultProfissionalDto();
    }
};

export const updateProfissional = async (data: ProfissionalDto): Promise<ProfissionalDto | null> => {
    try {
        const router = useRouter();
        const apiClient = createApiClient(router); 
        const response = await apiClient.post<ProfissionalDto>('/profissional/update', data);
        console.log('Profissional atualizado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro ao criar Profissional:', error.response?.data || error.message);
        } else {
            console.error('Erro inesperado:', error);
        }
        return null;
    }
  };
