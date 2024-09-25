import axios from 'axios';
import { RegisterPacienteRequest, Alergia, Comorbidade, PacienteResumoResult, Paciente, UpdatePacienteRequest } from '@/types/paciente';
import { PaginacaoResult } from '@/types/geral';
import { Sexo } from '@/types/enums';

export const createPaciente = async (data: RegisterPacienteRequest): Promise<Paciente | null> => {
  try {
      const response = await axios.post<Paciente>('https://localhost:7164/paciente/register', data);
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
      const response = await axios.post<Paciente>('https://localhost:7164/paciente/update', data);
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
    const response = await axios.get<Alergia[]>('https://localhost:7164/paciente/alergias');
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
    const response = await axios.get<Comorbidade[]>('https://localhost:7164/paciente/comorbidades');
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
    const response = await axios.get<PaginacaoResult<PacienteResumoResult>>
    ("https://localhost:7164/paciente/paginado", { params: { pageNumber, pageSize } });

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

      const response = await axios.get<PaginacaoResult<PacienteResumoResult>>
      ("https://localhost:7164/paciente/search", { params: { parametro, pageNumber, pageSize } });

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

      const response = await axios.get<Paciente>
      ("https://localhost:7164/paciente/id", { params: { parametro } });

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